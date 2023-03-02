import 'lazysizes';

import { backendurl } from '../../../../api/backendurl';

const Coverimage = ({ content }) => {
  let img = null;

  let classNames = 'BookPreview_noCoverimage';

  if (content !== null) {
    const altText = content.alternativeText;
    let url = content.url;

    // use small resized image (width 500px) on front page (max 300px)
    const formats = content.formats;
    if (formats !== undefined && formats !== null) {
      const smallFormat = formats.small;
      if (smallFormat !== undefined && smallFormat !== null) {
        const smallFormatUrl = smallFormat.url;
        url = smallFormatUrl;
      }
    }

    classNames = 'BookPreview_coverimage';

    img = (
      <img
        className='lazyload'
        // src={backendurl + url}
        data-src={backendurl + url}
        alt={altText}
      />
    );
  }

  return <div className={classNames}>{img}</div>;
};

export default Coverimage;
