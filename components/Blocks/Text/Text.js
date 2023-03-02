import ReactMarkdown from 'react-markdown'

const Text = ({content, type}) => {
    let text = null;

    if (content.hasOwnProperty('text')){
        text = content.text;
    } 
    if (content.hasOwnProperty('reference')){
        text = content.reference;
    }
    if (content.hasOwnProperty('description')){
        text = content.description;
    }
    if (content.hasOwnProperty('visibilityHiddenText')){
        text = content.visibilityHiddenText;
    }
    
    // only display text block, if text is not null
    if(text){
        return (
            <div className='block_text'>
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        )
    } else {
        return null;
    }
};

export default Text;