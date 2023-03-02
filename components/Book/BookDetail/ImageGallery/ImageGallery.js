import { useState } from 'react';
import { backendurl } from '../../../../api/backendurl';

import { useSwipeable } from 'react-swipeable';
import { nanoid } from 'nanoid';

import LightBox from './LightBox/LightBox';

const ImageGallery = ({ images }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSlideRight(),
    onSwipedRight: () => handleSlideLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // IMAGES
  // image array for slider
  const imageArray = [];
  // image url array for lightbox
  const imageUrlArray = [];
  images.image.map((singleImage) => {
    let originalImageUrl = singleImage.url;
    let mediumImageUrl = originalImageUrl;

    // use medium resized image (width 750px) in image slider (max 600px)
    const formats = singleImage.formats;
    if (formats !== undefined && formats !== null) {
      const mediumFormat = formats.medium;
      if (mediumFormat !== undefined && mediumFormat !== null) {
        mediumImageUrl = mediumFormat.url;
      }
    }

    // image array for slider
    imageArray.push(
      <div>
        {/* open lightbox button */}
        <button className='lightboxButton'></button>

        <img
          className='imageSlide'
          src={backendurl + mediumImageUrl}
          // src={backendurl + originalImageUrl}
          alt={singleImage.alttext}
        />
      </div>
    );
    // image url array for lightbox
    imageUrlArray.push(backendurl + originalImageUrl);
  });

  // SUBTITLES
  const subtitleArray = [];
  let hasSubtitle = false;
  images.image.map((singleImage) => {
    if (singleImage.caption) {
      hasSubtitle = true;
      subtitleArray.push(singleImage.caption);
    } else {
      subtitleArray.push(' ');
      // subtitleArray.push(null);
    }
  });

  // SLIDER
  // index for slider
  const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0

  const [showLightBox, setShowLightBox] = useState(false);
  const openLightBox = () => {
    // handleSlideRight();
    setShowLightBox(true);
  };

  // set index for slider on click
  // click right
  const handleSlideRight = () => {
    setIndex((index + 1) % imageArray.length); // increases index by 1
  };
  // click left
  const handleSlideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(imageArray.length - 1); // returns last index of images array if index is less than 0
    } else {
      setIndex(nextIndex);
    }
  };

  // dots for slider
  const dots = [];
  if (imageArray.length > 1) {
    for (let i = 0; i < imageArray.length; i++) {
      dots.push(
        <div
          key={nanoid()}
          className={i === index ? 'imageSliderDot selected' : 'imageSliderDot'}
        ></div>
      );
    }
  }

  return (
    <div>
      {
        showLightBox && (
          <LightBox
            images={imageUrlArray}
            subtitleArray={subtitleArray}
            dots={dots}
            index={index}
            setIndex={setIndex}
            setShowLightBox={setShowLightBox}
          />
        )
        // && <LightBox
        //         imageArray={imageArray}
        //         dots={dots}
        //         index={index}
        //         handleSlideLeft={handleSlideLeft}
        //         handlers={handlers}
        //         openLightBox={openLightBox}
        //         handleSlideRight={handleSlideRight}
        //         subtitleArray={subtitleArray}
        //         showLightBox={showLightBox}
        //         setShowLightBox={setShowLightBox} />
      }

      {/* show if more than 0 img */}
      {imageArray.length > 0 && (
        <div className='imageSliderContainer'>
          {/* button left / show if more than 1 imgs */}
          {imageArray.length > 1 && (
            <button
              className='imageSliderButtonLeft'
              onClick={handleSlideLeft}
            ></button>
          )}

          {/* image slider */}
          <div className='imageSlider' {...handlers} onClick={openLightBox}>
            {imageArray[index]}
          </div>

          {/* dots */}
          <div className='imageSliderDotContainer'>{dots}</div>

          {/* button right / show if more than 1 imgs */}
          {imageArray.length > 1 && (
            <button
              className='imageSliderButtonRight'
              onClick={handleSlideRight}
            ></button>
          )}
        </div>
      )}

      {/* subtitle */}
      {subtitleArray.length > 0 && hasSubtitle && (
        <div className='BookDetail_image-subtitle'>{subtitleArray[index]}</div>
      )}
    </div>
  );
};

export default ImageGallery;
