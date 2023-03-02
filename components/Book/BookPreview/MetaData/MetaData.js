const MetaData = ({ content, contentType }) => {

    const createMetaDataSingle = (content) => {
        if (content !== null){
            return (
                <div>
                    {content}
                </div>
            )
        } else {
            return null;
        }
    }

    const createMetaDataPlural = (content, contentType) => {
        // if (content !== undefined && content !== null){
            if (content.length !== 0){
                return(
                    <div>
                        {content.map(( contentElement ) => {
                            // const keys = Object.keys(contentElement);
                            // const contentTypeKey = keys[1]
                            // const contentTypeKey = keys[contentPropertyNumber]
                            // const contentProperty = contentElement[contentTypeKey];
                            const id = contentElement.id;
                            const createdAt = contentElement.created_at;
                            const contentProperty = contentElement.name;
                            const firstNameContentProperty = contentElement.firstName;
                            
                            return (
                                <div 
                                    key={id + createdAt} 
                                    className={`BookPreview_metaData_${contentType}`}>
                                    {/* show author first names if defined */}
                                    {firstNameContentProperty && firstNameContentProperty + ' '}
                                    {/* show content property */}
                                    {contentProperty}
                                </div>
                            )
                        })}
                    </div> 
                )
            // } 
        } else {
            return null;
        }

    }

    switch(contentType) {
        case 'authors':
            return createMetaDataPlural(content, contentType);
        case 'year':
            return createMetaDataSingle(content, contentType);
        case 'platforms':
            return createMetaDataPlural(content, contentType);
        case 'editionCharacteristics':
            return createMetaDataPlural(content, contentType);
        case 'isbn':
            return createMetaDataSingle(content, contentType);
        case 'genres':
            return createMetaDataPlural(content, contentType);
        case 'subjects':
            return createMetaDataPlural(content, contentType);
        case 'metaSubjects':
            return createMetaDataPlural(content, contentType);
        case 'methods':
            return createMetaDataPlural(content, contentType);
        default: 
            return <p>no metaData type matched</p>;
    }

}


export default MetaData;