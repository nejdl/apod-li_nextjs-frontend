import { useEffect } from 'react';
import { getIdsOfPosts, getSlugsOfPosts, getDataOfPosts } from '../api/api';

// import ReactGA from 'react-ga';
import { nanoid } from 'nanoid';

import {
  libraryMenuItem,
  publicationSeriesApiSlug,
  pagesMenuItemSlug,
  pagesMenuItemApiSlug,
  menuOrderSlug,
} from '../components/Navigation/MenuItems';
import { transformMenuItemToSlug } from '../components/Navigation/MenuItems';
import { transformMenuItemToApiSlug } from '../components/Navigation/MenuItems';
import { setScrollBarWidth } from '../utils/setScrollBarWidth';

import ContentPage from '../components/Pages/ContentPage/ContentPage';
import PublicationPage from '../components/Pages/PublicationPage/PublicationPage';

let pageTitle = null;
const menuItem = libraryMenuItem;
const pageSlug = transformMenuItemToSlug(menuItem);
const apiSlug = transformMenuItemToApiSlug(menuItem);

export const getStaticPaths = async () => {
  // get slugs of pulications and pages
  const publicationPaths = await getSlugsOfPosts(apiSlug);
  const pagesPaths = await getSlugsOfPosts(pagesMenuItemApiSlug);
  // merge both slug arrays into one paths array
  const paths = [...publicationPaths, ...pagesPaths];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  // get data of slugs of publications, publication series and pages
  const publicationsData = await getDataOfPosts(apiSlug);
  const pagesData = await getDataOfPosts(pagesMenuItemApiSlug);

  // return data of publication or page of current slug
  // either through finding the matching id in publicationsData
  let postData = publicationsData.find((x) => x.slug === params.id);
  // or in pagesData
  if (!postData) {
    postData = pagesData.find((x) => x.slug === params.id);
  }

  // publications in publication series
  const publicationSeriesData = await getDataOfPosts(publicationSeriesApiSlug);

  let publicationsInPublicationSeries = [];
  if (postData != null) {
    publicationSeriesData.map((publicationSerie) => {
      const publicationsInThisPublicationSeries = publicationSerie.publications;

      publicationsInThisPublicationSeries.map(
        (publicationInThisPublicationSerie) => {
          publicationsInPublicationSeries = [
            ...publicationsInPublicationSeries,
            publicationsData.find(
              (x) => x.id === publicationInThisPublicationSerie.id
            ),
          ];
        }
      );
    });
  }

  // get related publications
  let relatedPublicationsData = [];
  if (postData != null) {
    const relatedPublications = postData.related_publications;
    if (relatedPublications != null) {
      const visibleRelatedPublications = relatedPublications.filter(
        (publication) => publication.visibility === true
      );
      visibleRelatedPublications.map((relatedPublication) => {
        relatedPublicationsData = [
          ...relatedPublicationsData,
          publicationsData.find((x) => x.id === relatedPublication.id),
        ];
      });
    }
  }

  // get data of menu order (single type)
  const menuOrder = await getDataOfPosts(menuOrderSlug);

  return {
    props: {
      // publicationsData,
      relatedPublicationsData,
      publicationSeriesData,
      publicationsInPublicationSeries,
      pagesData,
      postData,
      menuOrder,
    },
  };
};

export const Page = ({
  relatedPublicationsData,
  publicationSeriesData,
  publicationsInPublicationSeries,
  pagesData,
  postData,
  menuOrder,
}) => {
  // console.log(postData);
  //   useEffect(() => {
  //     // Google Analytics
  //     ReactGA.initialize('');
  //     ReactGA.pageview(pageSlug + '/' + postData.slug);
  //   }, [])

  // fix scrollbar-width problem in firefox / windows
  useEffect(() => {
    setScrollBarWidth();
  }, []);

  // check if postData is of publications type or page type
  let isPage = pagesData.find((x) => x.slug === postData.slug);

  // if publication page
  if (!isPage) {
    return (
      <PublicationPage
        pageTitle={pageTitle}
        postData={postData}
        relatedPublicationsData={relatedPublicationsData}
        publicationSeriesData={publicationSeriesData}
        publicationsInPublicationSeries={publicationsInPublicationSeries}
        menuOrder={menuOrder}
      />
    );

    // if content page
  } else {
    return (
      <ContentPage
        pageTitle={postData.title}
        subtitle={postData.subtitle}
        className={postData.slug}
        visibility={postData.visibility}
        content={postData.content}
        imageGalleries={postData.images}
        menuOrder={menuOrder}
      />
    );
  }
};

export default Page;
