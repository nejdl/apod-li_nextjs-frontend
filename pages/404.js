import { useEffect } from 'react';
import { getDataOfPosts } from '../api/api';
import { menuOrderSlug } from '../components/Navigation/MenuItems';

// import ReactGA from 'react-ga';

import { setScrollBarWidth } from '../utils/setScrollBarWidth';

import ContentPage from '../components/Pages/ContentPage/ContentPage';

let pageTitle = '404';
let className = 'errorPage';

export const getStaticProps = async ({ params }) => {
  // get data of menu order (single type)
  const menuOrder = await getDataOfPosts(menuOrderSlug);

  return {
    props: {
      menuOrder,
    },
  };
};

const ErrorPage = ({ menuOrder }) => {
  // useEffect(() => {
  //   ReactGA.initialize('XX');
  //   ReactGA.pageview(pageSlug);
  // }, [])

  // fix scrollbar-width problem in firefox / windows
  useEffect(() => {
    setScrollBarWidth();
  }, []);

  let errorText = {
    visibilityHiddenText:
      'This page does not seem to exist. You are being redirected to the library.',
  };

  const redirectToRoot = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <div className='siteBody'>
      {redirectToRoot()}

      <ContentPage
        pageTitle={pageTitle}
        subtitle={'Page not found'}
        className={className}
        visibility={false}
        visibilityHiddenText={errorText}
        content={[]}
        menuOrder={menuOrder}
        isErrorPage={true}
      />
    </div>
  );
};

export default ErrorPage;
