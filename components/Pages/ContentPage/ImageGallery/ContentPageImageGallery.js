import { nanoid } from 'nanoid';

import ImageGallery from '../../../Book/BookDetail/ImageGallery/ImageGallery';
import BorderTop from '../../../Blocks/Border/BorderTop';

const ContentPageImageGallery = ({ imageGalleries }) => {
  const hasImageGalleries = () => {
    if (imageGalleries) {
      if (imageGalleries.length > 0) {
        return true;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      {hasImageGalleries() && (
        <>
          <BorderTop />
          <div className='BookDetail_images'>
            {imageGalleries.map((imageGallery) => (
              <ImageGallery key={nanoid()} images={imageGallery} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ContentPageImageGallery;
