import Lightbox from "react-image-lightbox";
import useMedia from 'use-media';
import {mediaQueryMobile, mediaQueryTablet, mediaQueryDesktop, mediaQueryLargeDesktop} from '../../../../../styles/variables';

const LightBox = ({images, subtitleArray, index, setIndex, setShowLightBox, dots}) => {

    const returnCssVariable = (cssVariable) => {
        const thisVariable = getComputedStyle(document.documentElement).getPropertyValue('--' + cssVariable);
        // console.log(thisVariable)
        return 50;
        // return getComputedStyle(document.documentElement).getPropertyValue('--' + cssVariable); 
    }

    const isMediaQueryMobile = useMedia(mediaQueryMobile);
    // const isMediaQueryTablet = useMedia(mediaQueryTablet);
    
    return (
        <Lightbox
            clickOutsideToClose={!isMediaQueryMobile}
            wrapperClassName='blur greyTransparent'
            // image padding corresponds to about var(--iconHeightExtraLarge) + var(--gapM)
            imagePadding={50}
            imageCaption={subtitleArray[index]}
            mainSrc={images[index]}
            nextSrc={images.length > 1
                ? images[(index + 1) % images.length]
                : null
            }
            prevSrc={images.length > 1
                ? images[(index + images.length - 1) % images.length]
                : null
            }
            onCloseRequest={() => setShowLightBox(false)}
            onMovePrevRequest={() =>
                setIndex(
                (index + images.length - 1) % images.length
                )
            }
            onMoveNextRequest={() =>
                setIndex((index + 1) % images.length)
            }
            // dots 
            toolbarButtons={[
                <div className='imageSliderDotContainer lightBoxDotContainer'>
                    {dots}
                </div>
            ]}
        />
    )
}

export default LightBox;