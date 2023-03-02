import Head from 'next/head';
import { useState, useEffect } from 'react';
import { getDataOfPosts } from '../api/api';
import Masonry from 'react-masonry-css';
import useMedia from 'use-media';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryDesktop,
  mediaQueryLargeDesktop,
} from '../styles/variables';
// import ReactGA from 'react-ga';

import {
  libraryMenuItem,
  newsElementApiSlug,
  menuOrderSlug,
} from '../components/Navigation/MenuItems';
import { transformMenuItemToSlug } from '../components/Navigation/MenuItems';
import { transformMenuItemToApiSlug } from '../components/Navigation/MenuItems';

import { groupCategories } from '../components/Filter/FilterLogic/FilterLogic';
import {
  authorsCategory,
  platformsCategory,
  yearsCategory,
  genresCategory,
  subjectsCategory,
  metaSubjectsCategory,
  methodsCategory,
  editionCharacteristicsCategory,
} from '../components/Filter/FilterLogic/Categories';
// import { shuffle } from '../utils/shuffle';

import HtmlHead from '../components/HtmlHead/HtmlHead';
import NavigationBar from '../components/Navigation/NavigationBar/NavigationBar';
import BookPreview from '../components/Book/BookPreview/BookPreview';
import NewsElement from '../components/NewsElement/NewsElement';
import Filter from '../components/Filter/Filter';
import { searchFilterPosts } from '../components/Filter/Search/SearchLogic';

let pageTitle = libraryMenuItem;
let socialMediaSharingTitle = 'APOD.LI';
const pageSlug = transformMenuItemToSlug(pageTitle);
const apiSlug = transformMenuItemToApiSlug(pageTitle);

export const getStaticProps = async () => {
  // get data of slugs of posts, news Element & pages
  const postsData = await getDataOfPosts(apiSlug);
  const newsElement = await getDataOfPosts(newsElementApiSlug);

  // get data of menu order (single type)
  const menuOrder = await getDataOfPosts(menuOrderSlug);

  return {
    props: {
      postsData,
      newsElement,
      menuOrder,
    },
  };
};

const LibraryPage = ({ postsData, newsElement, menuOrder }) => {
  // useEffect(() => {
  //   ReactGA.initialize('XX');
  //   ReactGA.pageview(pageSlug);
  // }, [])

  // fix scrollbar-width problem in firefox / windows
  useEffect(() => {
    // create the measurement node
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'scrollbar-measure';
    scrollDiv.style.overflowY = 'scroll';
    document.body.appendChild(scrollDiv);

    // Get the scrollbar width
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

    // Delete the DIV
    document.body.removeChild(scrollDiv);

    // set the scrollbar width
    document.documentElement.style.setProperty(
      '--scrollbarWidth',
      scrollbarWidth + 'px'
    );
    // console.log('overflow ' + scrollbarWidth);
  }, []);

  // // randomize posts
  // shuffle(postsData);

  // update filtered posts
  const [filteredPosts, setFilteredPosts] = useState(postsData);

  // FILTER OPTION ARRAY
  // create filterOptionsArray
  let allAuthorCategories = groupCategories(postsData, authorsCategory);
  let allPlatformsCategories = groupCategories(postsData, platformsCategory);
  let allYearCategories = groupCategories(postsData, yearsCategory);
  let allGenresCategories = groupCategories(postsData, genresCategory);
  let allSubjectsCategories = groupCategories(postsData, subjectsCategory);
  let allMetaSubjectsCategories = groupCategories(
    postsData,
    metaSubjectsCategory
  );
  let allMethodsCategories = groupCategories(postsData, methodsCategory);
  let allEditionCharacteristicsCategories = groupCategories(
    postsData,
    editionCharacteristicsCategory
  );

  let filterOptionArray = {};
  filterOptionArray[authorsCategory] = allAuthorCategories;
  filterOptionArray[platformsCategory] = allPlatformsCategories;
  filterOptionArray[yearsCategory] = allYearCategories;
  filterOptionArray[genresCategory] = allGenresCategories;
  filterOptionArray[subjectsCategory] = allSubjectsCategories;
  filterOptionArray[metaSubjectsCategory] = allMetaSubjectsCategories;
  filterOptionArray[methodsCategory] = allMethodsCategories;
  filterOptionArray[editionCharacteristicsCategory] =
    allEditionCharacteristicsCategories;

  // set filter options
  const [filterOptions, setFilterOptions] = useState(filterOptionArray);
  const [clearFilters, setClearFilters] = useState(false);

  // update search filtered posts
  const [searchTerm, setSearchTerm] = useState('');
  const searchFilteredPosts = searchFilterPosts(filteredPosts, searchTerm);

  // filter out the visible posts only
  // let visibleFilteredPosts = filteredPosts.filter(post => post.visibility === true);
  let visibleFilteredPosts = searchFilteredPosts.filter(
    (post) => post.visibility === true
  );

  // // sort posts by updated_at parameter
  // let visibleFilteredPostsSortedByUpdate = visibleFilteredPosts.sort((a, b) => (a.updated_at < b.updated_at) ? 1 : -1)

  const isMediaQueryMobile = useMedia(mediaQueryMobile);
  const isMediaQueryTablet = useMedia(mediaQueryTablet);
  const isMediaQueryDesktop = useMedia(mediaQueryDesktop);
  const isMediaQueryLargeDesktop = useMedia(mediaQueryLargeDesktop);

  let breakpointCols = 0;

  if (isMediaQueryMobile) {
    breakpointCols = 1;
  } else if (isMediaQueryTablet) {
    breakpointCols = 2;
  } else if (isMediaQueryDesktop) {
    breakpointCols = 3;
  } else if (isMediaQueryLargeDesktop) {
    breakpointCols = 4;
  }

  useEffect(() => {
    showSessionStorage();
  }, []);

  const openSelectedCategories = (filterOptionsSessionStorageData) => {
    // go through categories and check if there is an active option
    // FIX ME: use object entries instead of a fixed array for the categories
    const categoriesArray = [
      authorsCategory,
      platformsCategory,
      yearsCategory,
      genresCategory,
      subjectsCategory,
      methodsCategory,
      editionCharacteristicsCategory,
    ];
    for (let i = 0; i < categoriesArray.length; i++) {
      const filterOptionCategory = categoriesArray[i];
      const activeFilterOptionsOfCategory = filterOptionsSessionStorageData[
        filterOptionCategory
      ].filter((filterOption) => filterOption.isSelected === true);
      if (activeFilterOptionsOfCategory.length > 0) {
        openFilterCategory(filterOptionCategory);
      }
    }
  };

  const openFilterCategory = (filterOptionCategory) => {
    setTimeout(() => {
      const filterCategoryAccordion = document.getElementById(
        `filterAccordion-${filterOptionCategory}`
      );
      const accordionToggleArrow = filterCategoryAccordion.querySelectorAll(
        '.accordion_toggleArrow'
      )[0];
      const accordionText =
        filterCategoryAccordion.querySelectorAll('.accordionText')[0];
      accordionToggleArrow.classList.add('open');
      accordionText.classList.remove('hidden');
    }, 0);
  };

  // set posts / filters / search term from session storage
  // (which is set after filter initialization)
  const showSessionStorage = () => {
    let filteredPostsSessionStorageData = JSON.parse(
      sessionStorage.getItem('filteredPosts')
    );
    let searchTermSessionStorageData = JSON.parse(
      sessionStorage.getItem('searchTerm')
    );
    let filterOptionsSessionStorageData = JSON.parse(
      sessionStorage.getItem('filterOptions')
    );

    // // ramdomize posts if there is no session storage yet
    // // (as posts shouldn't shuffle when going back and forth between pages while filtering)
    // if (filteredPostsSessionStorageData === null){
    //   let visibleFilteredPostsRandomized = shuffle(filteredPosts);
    // }

    if (filteredPostsSessionStorageData !== null) {
      setFilteredPosts(filteredPostsSessionStorageData);
    }

    if (searchTermSessionStorageData !== null) {
      setSearchTerm(searchTermSessionStorageData);
    }

    if (filterOptionsSessionStorageData !== null) {
      setClearFilters(true);
      setFilterOptions(filterOptionsSessionStorageData);
      openSelectedCategories(filterOptionsSessionStorageData);
    }
  };

  const clearSessionStorage = () => {
    sessionStorage.clear();
  };

  const setSessionStorage = () => {
    // FIX ME: quotaExceededError
    // change session storage to cache or make filtered posts smaller
    // sessionStorage.setItem('filteredPosts', JSON.stringify(filteredPosts));
    // sessionStorage.setItem('searchTerm', JSON.stringify(searchTerm));
    // sessionStorage.setItem('filterOptions', JSON.stringify(filterOptions));
  };

  return (
    <div className='siteBody'>
      <HtmlHead pageTitle={socialMediaSharingTitle} />

      <NavigationBar menuOrder={menuOrder} />

      <NewsElement newsElement={newsElement} />

      <div className='mainSection'>
        {breakpointCols === 0 && (
          <div className='lds-circle'>
            <div></div>
          </div>
        )}

        {breakpointCols !== 0 && (
          <div className='leftSide'>
            <Filter
              postsData={postsData}
              filteredPosts={filteredPosts}
              setFilteredPosts={setFilteredPosts}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchFilteredPosts={searchFilteredPosts}
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              clearFilters={clearFilters}
              setClearFilters={setClearFilters}
              setSessionStorage={setSessionStorage}
            />
          </div>
        )}

        <div className='rightSide'>
          {breakpointCols !== 0 && (
            <Masonry
              breakpointCols={breakpointCols}
              className='masonry-grid'
              columnClassName='masonry-grid_column'
            >
              {/* {filteredPosts.map(( postData ) => ( */}
              {/* {visibleFilteredPostShuffled.map(( postData ) => ( */}
              {visibleFilteredPosts.map((postData) => (
                <BookPreview
                  key={postData.id}
                  content={postData}
                  setSessionStorageOnClick={setSessionStorage}
                />
              ))}
            </Masonry>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
