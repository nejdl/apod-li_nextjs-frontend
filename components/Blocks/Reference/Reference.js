import Text from '../Text/Text';

const Reference = ({content}) => {
    const year = content.year;
    
    return (
        <div>
            {/* <div>{year}</div> */}
            <Text 
                content={content} />
        </div>
    )
};

export default Reference;