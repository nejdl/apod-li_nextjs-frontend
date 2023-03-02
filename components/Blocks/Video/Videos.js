import Video from './Video';

const Videos = ({ content }) => {
    const videos = content.videos;

    if(videos){
        // only return something, if there are videos
        if(videos.length > 0){
            return(
                <>
                    {videos.map(( video, index ) => (
                        <Video 
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

export default Videos;