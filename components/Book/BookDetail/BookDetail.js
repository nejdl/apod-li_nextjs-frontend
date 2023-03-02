import Title from '../../Blocks/Title/Title';
import Text from '../../Blocks/Text/Text';
import Description from './Description/Description';
import Header from './MetaData/Header';
import Format from './MetaData/Format/Format';
import PublicationGroup from './PublicationGroup/PublicationGroup';
import Links from './Links/Links';
import OpacLinks from './Links/OpacLinks';
import Bibliography from './Bibliography/Bibliography';
import RelatedPublications from './Related/RelatedPublications';
import FurtherVolumesInPublicationSeries from './Related/FurtherVolumesInPublicationSeries';
import BorderBottom from '../../Blocks/Border/BorderBottom';

const BookDetail = ({
  content,
  relatedPublicationsData,
  publicationSeriesData,
  publicationsInPublicationSeries,
}) => {
  const title = content.title;
  const titleFormatted = content.title_formatted;
  const subtitle = content.subtitle;
  const visibility = content.visibility;
  const id = content.id;

  // Publication Series
  const publicationSeries = content.publication_series;

  // PublicationGroupItem
  const publicationGroupItems = content.publication_group;

  const redirectToRoot = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const hasLinks = () => {
    return true;
  };
  const hasBibliography = () => {
    return true;
  };

  // if (content.description !== null){
  //     return true;
  // } else {
  //     return false;
  // }

  const visibilityHiddenText = {
    text: 'This book is currently being edited or does not exist. You will be automatically redirected to the library. ',
  };

  return (
    <div className="bookDetail">
      <div className="blur greyTransparent">
        {!visibility ? (
          <div>
            {redirectToRoot()}
            <Title
              title={title}
              titleFormatted={titleFormatted}
              subtitle={subtitle}
            />
            <Text content={visibilityHiddenText} />
          </div>
        ) : (
          <>
            <Title
              title={title}
              titleFormatted={titleFormatted}
              subtitle={subtitle}
            />
            <Header content={content} />
            <Description title="Description" content={content} />
            <Format content={content} />
            {/* LINKS */}
            <div className="BookDetail_Footer">
              <Links content={content} />
              <OpacLinks content={content} />
            </div>
            {/* PUBLICATION GROUP ITEMS */}
            {publicationGroupItems.map((publicationGroupItem) => (
              <PublicationGroup
                key={publicationGroupItem.id}
                content={publicationGroupItem}
              />
            ))}
            {/* BIBLIOGRAPHY */}
            <div className="BookDetail_Footer">
              <Bibliography content={content} />
            </div>
          </>
        )}
        <BorderBottom />
      </div>
      {visibility && (
        <>
          {publicationSeries.map((singlePublicationSeries) => (
            <FurtherVolumesInPublicationSeries
              key={singlePublicationSeries.id}
              title="Further volumes of this publication"
              thisId={id}
              publicationSeries={singlePublicationSeries}
              publicationSeriesData={publicationSeriesData}
              publicationsInPublicationSeries={publicationsInPublicationSeries}
            />
          ))}
          <RelatedPublications
            title="Related publication"
            content={content}
            relatedPublicationsData={relatedPublicationsData}
          />
        </>
      )}
    </div>
  );
};

export default BookDetail;
