import BorderTop from '../Border/BorderTop';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const Title = ({ title, titleFormatted, subtitle }) => {

    // show formatted title if filled in
    let titleToShow = title;
    if (titleFormatted && (titleFormatted !== '') && (titleFormatted !== ' ')){
        titleToShow = <ReactMarkdown rehypePlugins={[rehypeRaw]}>{titleFormatted}</ReactMarkdown>;
    }

    return (
        <div>
            <BorderTop />
            <div className='block_title' lang='nl'>
                {titleToShow}
            </div>
            <div className='block_subtitle'>
                {subtitle}
            </div>
        </div>
    )
};

export default Title;