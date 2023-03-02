import { useEffect } from 'react';
import { nanoid } from 'nanoid';

import Accordion from '../../../../Blocks/Accordion/Accordion';
import Text from '../../../../Blocks/Text/Text';


const MetaData = ({firstLineOfMultiLineTitle, title, content, info, isbn}) => {
    let contentDiv = null;

    // if there is an ISBN number passed on
    if(isbn){
        // check if ISBN is not undefined etc.
        if (isbn !== null 
            && isbn !== undefined 
            && isbn !== '' 
            && isbn !== ' '){
                let filteredContent = [];
                let filteredContentWithIsbn = [];
                
                // filter out edition characteristic items 
                // with the names ISBN, ISSN or DOI
                filteredContent = content.filter((contentItem) => {
                    if(!contentItem.name.includes('ISBN') 
                        && !contentItem.name.includes('Isbn') 
                        && !contentItem.name.includes('isbn') 
                        && !contentItem.name.includes('ISSN') 
                        && !contentItem.name.includes('Issn') 
                        && !contentItem.name.includes('issn') 
                        && !contentItem.name.includes('DOI')
                        && !contentItem.name.includes('Doi') 
                        && !contentItem.name.includes('doi')){
                            return contentItem;
                    }
                })

                // AFTERWARDS add ISBN to edition characteristics array, if available
                filteredContentWithIsbn = [ ...filteredContent, {name: isbn}]
                content = filteredContentWithIsbn;
        }
    }
    
    const getFullContentItemName = (contentItem) => {
        // get firstName if content item is author
        if(contentItem.firstName){
            return contentItem.firstName + ' ' + contentItem.name
        }  else {
            return contentItem.name;
        }
    }

    // format location
    const getFullLocation = (contentItem) => {
        let thisLocation = <div>
                {contentItem.location
                && <div className='BookDetail_MetaData_Location'>
                        {contentItem.location}
                    </div>
                }
                {contentItem.city
                && <div className='BookDetail_MetaData_Location'>
                        {contentItem.city}
                    </div>
                }
                {contentItem.country
                && <div className='BookDetail_MetaData_Location'>
                        {contentItem.country}
                    </div>
                }
            </div>;

        return thisLocation;
    }

    const hasDescription = (contentItem) => {
        if (contentItem.description === null || contentItem.description === undefined || contentItem.description === '' || contentItem.description === ' ') {
            return true;
        } else {
            return false;
        }
    }

    if (content !== null){
        // if meta data is year (content.length === undefined)
        // or if meta data is isbn (typeof content === 'string')
        if(content.length === undefined || typeof content === 'string'){
            contentDiv = <div>
                    {content}
                </div>;
        } else {
            contentDiv = <div>
                {content.map((contentItem) => (
                    <div key={nanoid()} >
                        {hasDescription(contentItem)
                        ?  <div>
                                {contentItem.hasOwnProperty('name')
                                // all other meta data
                                ? getFullContentItemName(contentItem)
                                // location meta data
                                : getFullLocation(contentItem)
                                }
                                
                            </div>
                        : <Accordion
                            title={getFullContentItemName(contentItem)}>
                            <Text content={contentItem} />
                        </Accordion>
                        }
                    </div>
                ))}
            </div>
        }
    } 

    if (contentDiv === null || contentDiv.props.children.length === 0){
        return null;
    } else {
        return (
            <div>
                {<div className='metaData_title'>
                            {/* to style multi-line title, e.g. for Edition Characteristics */}
                            {firstLineOfMultiLineTitle
                            && <div>
                                    {firstLineOfMultiLineTitle}
                                </div>
                            }
                            {title}
                        </div>
                }
                <div className='metaData_content'>
                    {contentDiv}
                </div>
            </div>
        )
    }
};

export default MetaData;