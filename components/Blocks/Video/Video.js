import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

import { backendurl } from '../../../api/backendurl';
import BorderTop from '../Border/BorderTop';

const Video = ({ content }) => {
  const videoSurtitle = content.surtitle;
  const videoUrl = backendurl + content.video.url;
  const videoSrc = {
    type: 'video',
    title: 'videoSurtitle',
    sources: [
      {
        src: videoUrl,
        provider: 'html5',
      },
    ],
  };

  return (
    <div className='block_video'>
      <BorderTop />
      {videoSurtitle && (
        <div className='block_video_surtitle'>{videoSurtitle}</div>
      )}
      <Plyr source={videoSrc} />
    </div>
  );
};

export default Video;
