import { nanoid } from 'nanoid';

import Reference from'../../../Blocks/Reference/Reference';
import Text from'../../../Blocks/Text/Text';
import BorderTop from'../../../Blocks/Border/BorderTop';

const Bibliography = ({content}) => {
    const references = content.bibliographical_references;

    let hasBibliography = () => {
        if (references.length > 0){
            return true;
        } else {
            return false;
        }
    }

    return (
        hasBibliography()
        && <div className='BookDetail_Bibliography_container'>
            <BorderTop />
            <div className='BookDetail_subtitle'>
                Bibliography
            </div>
            {references.map((reference) => (
                <Text 
                    key={nanoid()}
                    content={reference} />
            ))}
            {/* <Reference 
                content={content} /> */}
        </div>
    )
}

export default Bibliography;