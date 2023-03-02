import Masonry from 'react-masonry-css'
// import useMedia from 'use-media';
// import {mediaQuerySticky} from '../../styles/variables';

import { useState, useEffect } from 'react';
import { groupCategories } from './FilterLogic/FilterLogic';
import { authorsCategory, platformsCategory, yearsCategory, genresCategory, subjectsCategory, metaSubjectsCategory, methodsCategory, editionCharacteristicsCategory } from './FilterLogic/Categories';

import FilterByCategory from './FilterByCategory/FilterByCategory';
import Search from './Search/Search';

import BorderTop from '../Blocks/Border/BorderTop';

const Filter = ({ postsData, filteredPosts, setFilteredPosts, searchTerm, setSearchTerm, searchFilteredPosts, filterOptions, setFilterOptions, clearFilters, setClearFilters, setSessionStorage }) => {

    useEffect(() => {
        // remember search term
        setSessionStorage();
    }, [filterOptions])

    // FILTER OPTION ARRAY
    // create filterOptionsArray
    let allAuthorCategories = groupCategories(postsData, authorsCategory)
    let allPlatformsCategories = groupCategories(postsData, platformsCategory)
    let allYearCategories = groupCategories(postsData, yearsCategory)
    let allGenresCategories = groupCategories(postsData, genresCategory)
    let allSubjectsCategories = groupCategories(postsData, subjectsCategory)
    let allMetaSubjectsCategories = groupCategories(postsData, metaSubjectsCategory)
    let allMethodsCategories = groupCategories(postsData, methodsCategory)
    let allEditionCharacteristicsCategories = groupCategories(postsData, editionCharacteristicsCategory)

    let filterOptionArray = {};
    filterOptionArray[authorsCategory] = allAuthorCategories;
    filterOptionArray[platformsCategory] = allPlatformsCategories;
    filterOptionArray[yearsCategory] = allYearCategories;
    filterOptionArray[genresCategory] = allGenresCategories;
    filterOptionArray[subjectsCategory] = allSubjectsCategories;
    filterOptionArray[metaSubjectsCategory] = allMetaSubjectsCategories;
    filterOptionArray[methodsCategory] = allMethodsCategories;
    filterOptionArray[editionCharacteristicsCategory] = allEditionCharacteristicsCategories;
    
    // set filterOptionArray as state
    // const [filterOptions, setFilterOptions] = useState(filterOptionArray)
    // const [clearFilters, setClearFilters] = useState(false)

    const selectFilterOption = (filterOptionName, filterCategory) => {
      const filterOptionsCategory = filterOptions[filterCategory];
      const updatedFilterOptionsCategory = filterOptionsCategory.map((filterOption) => {
        if (filterOption.category === filterOptionName.category){
          filterOption.isSelected = !filterOption.isSelected;
        }
        return filterOption;
      });

      const newFilterOptions = {
          [filterCategory]: updatedFilterOptionsCategory,
          ...filterOptions
      };

      setFilterOptions(newFilterOptions);
      filterPosts();
      // checkFilterDivHeight();
    }

    const clearFilterOptions = () => {
      setFilterOptions(filterOptionArray);
      setFilteredPosts(postsData);
      // hide clear filters X
      setClearFilters(false);
      // FIX THIS
      setSearchTerm('');
    };

    // FILTER POSTS / function for filtering publication groups in posts
    // check publication group items for filterCategoryName
    // (only if the filter was not found in publication already)
    const checkPublicationGroupItemForFilteredItem = (post, filterCategoryName, filter) => {
      // variable to check if post has filtered item
      let publicationGroupItemsHaveFilteredItem = false;

      // check if post has publication group items
      if(post.publication_group.length !== 0){
        const publicationGroup = post.publication_group;
        // check publication group items for filtered item
        for(let i = 0; i < publicationGroup.length; i++){
          const publicationGroupItem = publicationGroup[i];

          // for numerical filter categories
          if (typeof(publicationGroupItem[filterCategoryName]) === 'number' || publicationGroupItem[filterCategoryName] === null){
            if(publicationGroupItem[filterCategoryName] === filter[filterCategoryName]){
              publicationGroupItemsHaveFilteredItem = true;
            } 
          // for array filter categories
          } else {
            publicationGroupItem[filterCategoryName].map((filteredCategoryItemInPublicationGroupItem) => {
              if(filteredCategoryItemInPublicationGroupItem.name === filter[filterCategoryName]){
                publicationGroupItemsHaveFilteredItem = true;
              } 
            })
          }
        }
      }
      
      return publicationGroupItemsHaveFilteredItem;
    };

    // FILTER POSTS
    const filterPosts = () => {
      // make array out of selected filters
      const filters = []
      const filterOptionCategories = Object.keys(filterOptions);
      filterOptionCategories.map((filterOptionCategory) => {
        filterOptions[filterOptionCategory].map((filterOption) => {
          if (filterOption.isSelected){
            let array = {}
            array[filterOptionCategory] = filterOption.category
            filters.push(array)
          }
        })
      })

      // filter posts by 
      let filteringPosts = [];
      let dataToFilter = postsData;
      filters.map((filter) => {
        const filterCategoryName = Object.keys(filter)[0]

        if(filteringPosts.length > 0){
          dataToFilter = filteringPosts;
        }

        dataToFilter.map((post) => {

          // variable to check if post has filtered item
          let postHasFilteredItem = false;

          // for numerical filter categories
          if (typeof(post[filterCategoryName]) === 'number' || post[filterCategoryName] === null){
            // check publication for filtered item
            if(post[filterCategoryName] === filter[filterCategoryName]){
              // create isFilteredProperty 
              if (isNaN(post['isFiltered'])){
                post['isFiltered'] = 0;
              } 
              // add to isFiltered value and push to filteredPosts
              post['isFiltered'] = post['isFiltered'] + 1;
              postHasFilteredItem = true;
              if (post['isFiltered'] <= 1){
                filteringPosts.push(post);
              }
            } 

          // for array filter categories
          } else {
            post[filterCategoryName].map((filteredCategoryItemInPost) => {
              // check publication for filtered item
              if(filteredCategoryItemInPost.name === filter[filterCategoryName]){
                // create isFilteredProperty 
                if (isNaN(post['isFiltered'])){
                  post['isFiltered'] = 0;
                }
                // add to isFiltered value and push to filteredPosts
                post['isFiltered'] = post['isFiltered'] + 1;
                postHasFilteredItem = true;
                if (post['isFiltered'] <= 1){
                  filteringPosts.push(post);
                }
              }
            })
          }

          // check publication group items for filtered item
          // (only if the filter was not found in publication already)
          if(!postHasFilteredItem){
            if(checkPublicationGroupItemForFilteredItem(post, filterCategoryName, filter)){
              // create isFilteredProperty 
              if (isNaN(post['isFiltered'])){
                post['isFiltered'] = 0;
              }
              // add to isFiltered value and push to filteredPosts
              post['isFiltered'] = post['isFiltered'] + 1;
              postHasFilteredItem = true;
              if (post['isFiltered'] <= 1){
                filteringPosts.push(post);
              }
            }
          }
          
        })
      });

      const multiFilteredPosts = [];

      filteringPosts.map((filteredPost) => {
        if (filteredPost.isFiltered >= filters.length){
          // console.log(filteredPost.isFiltered, filters.length);
        }
        if (filteredPost.isFiltered === filters.length){
          if(filteredPost.isSearched >= 1){
            // console.log(filteredPost.isSearched);
            multiFilteredPosts.push(filteredPost);
          }
        }
        filteredPost.isFiltered = 0;
      })

      // console.log(multiFilteredPosts);
      setFilteredPosts(multiFilteredPosts);
      // show clear filters X
      setClearFilters(true);

      // reset filtered posts if no filters selected 
      if(filteringPosts.length === 0){
        setFilteredPosts(postsData);
        // hide clear filters X
        setClearFilters(false);
      }

      if (multiFilteredPosts.length === 0){
        clearFilterOptions();
      } else {
        setAllFilterOptionsToInactive(authorsCategory);
        setActiveFilterOption(multiFilteredPosts, authorsCategory);
        setAllFilterOptionsToInactive(platformsCategory);
        setActiveFilterOption(multiFilteredPosts, platformsCategory);
        setAllFilterOptionsToInactive(yearsCategory);
        setActiveFilterOption(multiFilteredPosts, yearsCategory);
        setAllFilterOptionsToInactive(genresCategory);
        setActiveFilterOption(multiFilteredPosts, genresCategory);
        setAllFilterOptionsToInactive(subjectsCategory);
        setActiveFilterOption(multiFilteredPosts, subjectsCategory);
        setAllFilterOptionsToInactive(metaSubjectsCategory);
        setActiveFilterOption(multiFilteredPosts, metaSubjectsCategory);
        setAllFilterOptionsToInactive(methodsCategory);
        setActiveFilterOption(multiFilteredPosts, methodsCategory);
        setAllFilterOptionsToInactive(editionCharacteristicsCategory);
        setActiveFilterOption(multiFilteredPosts, editionCharacteristicsCategory);
      }

    }
    
    const setAllFilterOptionsToInactive = (filterCategory) => {
      const filterOptionsCategory = filterOptions[filterCategory];
      const updatedFilterOptionsCategory = filterOptionsCategory.map((filterOption) => {
            filterOption.isActive = false;
            return filterOption;
        });

      const newFilterOptions = {
          [filterCategory]: updatedFilterOptionsCategory,
          ...filterOptions
      };

      setFilterOptions(newFilterOptions);
    }

    const setActiveFilterOption = (multiFilteredPosts, filterCategory) => {
      const activeFilterOptionsOfCategory = groupCategories(multiFilteredPosts, filterCategory);

      const filterOptionsCategory = filterOptions[filterCategory];
      const updatedFilterOptionsCategory = filterOptionsCategory.map((filterOption) => {
        activeFilterOptionsOfCategory.map((filterOptionName) => {
          if (filterOption.category === filterOptionName.category){
            filterOption.isActive = true;
          }
            return filterOption;
          });
        });

      const newFilterOptions = {
          [filterCategory]: updatedFilterOptionsCategory,
          ...filterOptions
      };

      setFilterOptions(newFilterOptions);
    }

    // for search
    const setActiveFilterOptions = () => {
        setAllFilterOptionsToInactive(authorsCategory);
        setActiveFilterOption(searchFilteredPosts, authorsCategory);
        setAllFilterOptionsToInactive(platformsCategory);
        setActiveFilterOption(searchFilteredPosts, platformsCategory);
        setAllFilterOptionsToInactive(yearsCategory);
        setActiveFilterOption(searchFilteredPosts, yearsCategory);
        setAllFilterOptionsToInactive(genresCategory);
        setActiveFilterOption(searchFilteredPosts, genresCategory);
        setAllFilterOptionsToInactive(subjectsCategory);
        setActiveFilterOption(searchFilteredPosts, subjectsCategory);
        setAllFilterOptionsToInactive(metaSubjectsCategory);
        setActiveFilterOption(searchFilteredPosts, metaSubjectsCategory);
        setAllFilterOptionsToInactive(methodsCategory);
        setActiveFilterOption(searchFilteredPosts, methodsCategory);
        setAllFilterOptionsToInactive(editionCharacteristicsCategory);
        setActiveFilterOption(searchFilteredPosts, editionCharacteristicsCategory);
    }


    // const isMediaQuerySticky = useMedia(mediaQuerySticky)
    // let isSticky = true;
    //   if (isMediaQuerySticky) {
    //     isSticky = false;
    //   } else {
    //     isSticky = true;
    //   }

    // const checkFilterDivHeight = () => {
    //   const filterDiv = document.getElementsByClassName('filter')[0];
    //   const filterDivHeight = filterDiv.offsetHeight;
    //   const viewportHeight = window.innerHeight;
    //   const filterOffsetToTop = parseInt(getComputedStyle(document.getElementsByClassName('filter')[0]).getPropertyValue('top'), 10);
  
    //   if ((filterDivHeight + filterOffsetToTop) > viewportHeight){
    //     console.log('filterDiv is larger')
    //     filterDiv.classList.remove('sticky');
    //   } else {
    //     console.log('filterDiv is smoler')
    //     filterDiv.classList.add('sticky');
    //   }

    // };

    /* enable click-through for menu while still being able to scroll */
    useEffect(() => {
      const isHover = e => e.parentElement.querySelector(':hover') === e;    

      const filterLines = document.getElementById('filterLines');
      const filter = document.getElementsByClassName('filter')[0];

      document.addEventListener('mousemove', function checkHover() {
        const hovered = isHover(filterLines);
        if (hovered !== checkHover.hovered) {

          if (hovered){
            filter.style.pointerEvents = 'auto';
          } else {
            filter.style.pointerEvents = 'none';
          }

          checkHover.hovered = hovered;
        }
      });
    }, [])

    // /* fix bug with alignment of leftSide / rightSide */
    // useEffect(() => {
    //   const filter = document.getElementsByClassName('filter')[0];
    //   const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    //   // console.log(isSafari);

    //   if (isSafari){
    //     filter.style.paddingTop = 'calc(var(--navBarHeight) + (var(--fontSizeHeader)*var(--lineHeightS))*2 + var(--gapXS))';
    //     // filter.style.paddingTop = 'calc(48px + (var(--fontSizeHeader)*var(--lineHeightS))*2 + var(--gapS))';
    //     // filter.style.paddingTop = 'calc(48.5px + (var(--fontSizeHeader)*var(--lineHeightS))*2 + var(--gapS))';
    //   }

    // }, [])

    // useEffect(() => {
    //   // filterPosts();
    //   setActiveFilterOptions();
    // }, [searchTerm])

    return (
        <div className='filter'>
            <div id='filterLines'>
              {/* SEARCH */}
              <Search 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchFilteredPosts={searchFilteredPosts}
                filterPosts={filterPosts}
                setActiveFilterOptions={setActiveFilterOptions}
                setSessionStorage={setSessionStorage}
                />
              {/* FILTER */}
              <div className='border filterLine'>
                <div>
                  FILTER 
                </div>
                <div className={clearFilters ? 'closingX' : 'closingX hidden'}
                  onClick={clearFilterOptions}>
                </div>
              </div>
              <FilterByCategory
                  filterTitle='Author' 
                  availableFilterOptions={filterOptions}
                  filterCategory={authorsCategory}
                  selectFilterOption={selectFilterOption} />
              <Masonry
                breakpointCols={2}
                className="filter_masonry-grid"
                columnClassName="filter_masonry-grid_column">
                <FilterByCategory
                    filterTitle='Platform' 
                    availableFilterOptions={filterOptions}
                    filterCategory={platformsCategory}
                    selectFilterOption={selectFilterOption} />
                <FilterByCategory
                    filterTitle='Year' 
                    availableFilterOptions={filterOptions}
                    filterCategory={yearsCategory}
                    selectFilterOption={selectFilterOption}
                    yearsCategory={yearsCategory} />
                <FilterByCategory
                    availableFilterOptions={filterOptions}
                    filterCategory={editionCharacteristicsCategory}
                    // firstLineOfMultiLineFilterTitle='Edition'
                    // filterTitle='Characteristics'
                    filterTitle='Edition Characteristics'
                    selectFilterOption={selectFilterOption} />
                <FilterByCategory
                    availableFilterOptions={filterOptions}
                    filterCategory={genresCategory}
                    filterTitle='Genres' 
                    selectFilterOption={selectFilterOption} />
                <FilterByCategory
                    availableFilterOptions={filterOptions}
                    filterCategory={subjectsCategory}
                    filterTitle='Subjects' 
                    selectFilterOption={selectFilterOption} />
                {/* <FilterByCategory
                    availableFilterOptions={filterOptions}
                    filterCategory={metaSubjectsCategory}
                    filterTitle='Meta Subjects' 
                    selectFilterOption={selectFilterOption} /> */}
                <FilterByCategory
                    availableFilterOptions={filterOptions}
                    filterCategory={methodsCategory}
                    filterTitle='Methods' 
                    selectFilterOption={selectFilterOption} />
              </Masonry>
            </div>
        </div>        
    )
}

export default Filter;