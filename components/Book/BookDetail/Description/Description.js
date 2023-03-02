import Text from '../../../Blocks/Text/Text';
import ImageGallery from '../ImageGallery/ImageGallery';
import BorderTop from '../../../Blocks/Border/BorderTop';

import { nanoid } from 'nanoid';

const Description = ({ title, content }) => {
  // Book Detail Image Gallery
  let imageGalleries = content.Images;

  // Publication Group Item
  if (imageGalleries === undefined) {
    imageGalleries = content.images;
  }

  let hasDescription = () => {
    if (content.description !== null) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {hasDescription() && (
        <>
          <BorderTop />
          <div className='BookDetail_subtitle'>{title}</div>
          <div>
            <Text content={content} />
          </div>
        </>
      )}

      {/* <BorderTop /> */}
      <div className='BookDetail_images'>
        {imageGalleries.map((imageGallery) => (
          <ImageGallery key={nanoid()} images={imageGallery} />
        ))}
      </div>
    </div>
  );
};

export default Description;
