import Head from 'next/head';
import Link from 'next/link';

import HtmlHead from '../../HtmlHead/HtmlHead';
import NavigationBar from '../../Navigation/NavigationBar/NavigationBar';

import BackButton from '../../Book/BookDetail/BackButton/BackButton';
import BookDetail from '../../Book/BookDetail/BookDetail';

const PublicationPage = ({
  pageTitle,
  postData,
  relatedPublicationsData,
  publicationSeriesData,
  publicationsInPublicationSeries,
  menuOrder,
}) => {
  return (
    <div className="siteBody subpage">
      <HtmlHead pageTitle={pageTitle} coverimage={postData.coverimage} />

      <NavigationBar menuOrder={menuOrder} isPublication={true} />

      <div className="mainSection bookPage">
        <div className="rightSide">
          <BookDetail
            content={postData}
            relatedPublicationsData={relatedPublicationsData}
            publicationSeriesData={publicationSeriesData}
            publicationsInPublicationSeries={publicationsInPublicationSeries}
          />
        </div>

        <div className="leftSide">
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default PublicationPage;
