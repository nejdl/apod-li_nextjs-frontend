import { backendurl } from '../../../api/backendurl';
import BorderTop from '../Border/BorderTop';

const Image = ({ content }) => {
  let imageUrl = backendurl + content.image.url;

  // use medium resized image (width 750px) as image
  const formats = content.image.formats;
  if (formats !== undefined && formats !== null) {
    const mediumFormat = formats.medium;
    if (mediumFormat !== undefined && mediumFormat !== null) {
      const mediumImageUrl = backendurl + mediumFormat.url;
      imageUrl = mediumImageUrl;
    }
  }

  const imageAltText = content.alttext;
  const imageSurtitle = content.surtitle;

  return (
    <div className='block_image'>
      <BorderTop />
      {imageSurtitle && (
        <div className='block_image_surtitle'>{imageSurtitle}</div>
      )}
      <img src={imageUrl} alt={imageAltText} />
    </div>
  );
};

export default Image;
