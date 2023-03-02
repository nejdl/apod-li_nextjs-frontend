import { backendurl } from '../../../api/backendurl';
// import BorderTop from '../Border/BorderTop';
import Image from './Image';

const Images = ({ content }) => {
    const images = content.images;

    if(images){
        // only return something, if there are images
        if(images.length > 0){
            return(
                <>
                    {images.map(( video, index ) => (
                        <Image 
                            key={index}
                            content={video} />
                    ))}
                </>
            )
        } else {
            return null;
        }
    } else {
        return null;
    }

}

export default Images;