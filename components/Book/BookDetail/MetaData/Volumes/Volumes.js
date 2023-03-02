import MetaData from '../MetaData/MetaData';

const Volumes = ({ volumes, volumesNonNumerical}) => {

    const formatVolumes = () => {
        if (volumes !== 0 
            && volumes !== null){
                let volumeArray = []
                volumeArray = [{name: volumes + ' vols.'}]
                return volumeArray;
        } else {
            return null;
        }
    }

    // show non-numerical volumes when filled in
    let volumesToShow = formatVolumes(volumes);
    if(volumesNonNumerical && (volumesNonNumerical !== '') && (volumesNonNumerical !== ' ')){
        volumesToShow = volumesNonNumerical;
    }
    
    return(
        <MetaData 
            content={volumesToShow} />
    )

}

export default Volumes;