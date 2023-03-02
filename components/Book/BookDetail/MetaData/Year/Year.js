import MetaData from '../MetaData/MetaData';

const Year = ({ title, year, yearNonNumerical}) => {

    // show non-numerical year when filled in
    let yearToShow = year;
    if(yearNonNumerical && (yearNonNumerical !== '') && (yearNonNumerical !== ' ')){
        yearToShow = yearNonNumerical;
    }
    
    return(
        <MetaData 
            title={title}
            content={yearToShow} />
    )
}

export default Year;