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

const FurtherVolumesInPublicationSeries = ({
  title,
  thisId,
  publicationSeries,
  publicationSeriesData,
  publicationsInPublicationSeries,
}) => {
  const thisPublicationSeriesData = publicationSeriesData.find(
    (x) => x.name === publicationSeries.name
  );
  const publicationsInThisPublicationSeries =
    thisPublicationSeriesData.publications;
  const publicationsInThisPublicationSeriesWithoutCurrentPublication =
    publicationsInThisPublicationSeries.filter((x) => x.id !== thisId);

  const visiblePublicationsInThisPublicationSeries =
    publicationsInThisPublicationSeriesWithoutCurrentPublication.filter(
      (publication) => publication.visibility === true
    );

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

  if (visiblePublicationsInThisPublicationSeries.length > 0) {
    return (
      <div>
        <div className="related filterLine border">{title}</div>
        <div>
          <Masonry
            breakpointCols={breakpointCols}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {visiblePublicationsInThisPublicationSeries.map(
              (publicationInThisPublicationSeries) => (
                <BookPreview
                  key={publicationInThisPublicationSeries.id}
                  content={publicationsInPublicationSeries.find(
                    (x) => x.id === publicationInThisPublicationSeries.id
                  )}
                />
              )
            )}
          </Masonry>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default FurtherVolumesInPublicationSeries;
