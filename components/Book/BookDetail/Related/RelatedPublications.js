import Masonry from 'react-masonry-css';
import useMedia from 'use-media';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryDesktop,
  mediaQueryLargeDesktop,
} from '../../../../styles/variables';

import { nanoid } from 'nanoid';

import BookPreview from '../../BookPreview/BookPreview';

const RelatedPublications = ({ relatedPublicationsData, title }) => {
  // const RelatedPublications = ({ relatedPublicationsData, title, content }) => {
  // const relatedPublications = content.related_publications;
  // const visibleRelatedPublications = relatedPublications.filter(publication => publication.visibility === true);

  const isMediaQueryMobile = useMedia(mediaQueryMobile);
  const isMediaQueryTablet = useMedia(mediaQueryTablet);
  const isMediaQueryDesktop = useMedia(mediaQueryDesktop);
  const isMediaQueryLargeDesktop = useMedia(mediaQueryLargeDesktop);

  let breakpointCols = 3;
  if (isMediaQueryMobile) {
    breakpointCols = 1;
  } else if (isMediaQueryTablet) {
    breakpointCols = 2;
  } else if (isMediaQueryDesktop) {
    breakpointCols = 3;
  } else if (isMediaQueryLargeDesktop) {
    breakpointCols = 4;
  }

  const hasRelatedPublications = () => {
    if (relatedPublicationsData.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {hasRelatedPublications() && (
        <div className="related filterLine border">{title}</div>
      )}
      <div>
        <Masonry
          breakpointCols={breakpointCols}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {relatedPublicationsData.map((relatedPublication) => (
            <BookPreview
              key={relatedPublication.id}
              content={relatedPublication}
            />
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default RelatedPublications;
