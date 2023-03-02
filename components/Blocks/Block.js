import PropTypes from 'prop-types';

import TextWithTitle from './Text/TextWithTitle';
import Text from './Text/Text';
import Image from './Image/Image';
import Images from './Image/Images';
import Event from './Event/Event';
import Accordion from './Accordion/Accordion';
import Reference from './Reference/Reference';
import Video from './Video/Video';
import Videos from './Video/Videos';

const Block = ({blockType, content, eventsAreGrouped}) => {
    switch (blockType) {
        case 'text-blocks.text-with-title':
            return <TextWithTitle content={content} />;
        case 'text-blocks.text':
            return <Text content={content} />;
        case 'text-blocks.image':
            return <Image content={content} />;
        case 'text-blocks.event':
            return <Event content={content} eventsAreGrouped={eventsAreGrouped} />;
        case 'text-blocks.accordion':
            return <Accordion title={content.title} >
                <Text 
                    content={content} />
                <Videos 
                    content={content} />
                <Images 
                    content={content} />
            </Accordion>;
        case 'text-blocks.reference':
            return <Reference content={content} />;
        case 'text-blocks.video':
            return <Video content={content} />;
        default: 
            return <p>no blocktype matched</p>;
    }
}

export default Block; 

Block.propTypes = {
    blockType: PropTypes.oneOf(['text-blocks.text-with-title', 'text-blocks.text', 'text-blocks.image', 'text-blocks.event', 'text-blocks.accordion', 'text-blocks.reference', 'text-blocks.video']),
}