import Text from './Text';
import BorderTop from '../Border/BorderTop';

const TextWithTitle = ({content}) => {
    const title = content.title;
    
    return (
        <div>
            <BorderTop />
            <div className='block_text_title'>{title}</div>
            <Text 
                content={content} />
        </div>
    )
};

export default TextWithTitle;