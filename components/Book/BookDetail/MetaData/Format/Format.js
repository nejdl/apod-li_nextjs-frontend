import MetaData from '../MetaData/MetaData';
import BorderTop from '../../../../Blocks/Border/BorderTop';

const Format = ({content}) => {
    const materialities = content.materialities;
    const formats = content.formats;
    const editionCharacteristics = content.edition_characteristics;
    const pages = content.pages;

    let pagesArray = [];

    // format pages array
    if(pages !== null){
        pagesArray = [{
            name: pages + ' p.',
        }]
    }

    // spread all contents in one array
    const formatContent = [...materialities, ...formats, ...pagesArray];
    // const formatContent = [...materialities, ...formats, ...editionCharacteristics, ...pagesArray];

    let hasFormats = () => {
        if(formatContent.length > 0){
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='MetaData_Format_container'>
            {hasFormats()
            && <>
                <BorderTop />
                <div className='MetaData_Format'>
                    <MetaData 
                        title='Format'
                        content={formatContent} />
                    {/* <MetaData 
                        title='Materiality'
                        content={materialities} />
                    <MetaData 
                        title='Format'
                        content={formats} />
                    <MetaData 
                        title='Edition Characteristics'
                        content={editionCharacteristics} />
                    <MetaData 
                        title='Pages'
                        content={pages} /> */}
                </div>
                </>
            }
        </div>
    )
}

export default Format;
