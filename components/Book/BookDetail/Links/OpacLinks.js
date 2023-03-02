import { nanoid } from 'nanoid';

import OpacLink from './OpacLink/OpacLink';
import BorderTop from '../../../Blocks/Border/BorderTop';

const OpacLinks = ({content, isPublicationGroup}) => {

    // get only the opac links
    const links = content.Links;
    const returnOpacLinks = (link) => {
        return link.__component === "links.opac-link"
    }
    let opacLinks = [];
    // make sure links are not undefined before filtering (as in publication group item)
    if (links !== undefined){
        opacLinks = links.filter(returnOpacLinks);
    // get opac links from a publication group item 
    } else  if (isPublicationGroup){
        opacLinks = content.OPAC_link
    } 

    // check if there are any opac links
    let hasOpacLinks = false;
    if(opacLinks.length > 0){
        hasOpacLinks = true;
    }

    return (
        hasOpacLinks
        && <div className='BookDetail_OpacLinks_container'>
                <BorderTop />
                <div className='BookDetail_subtitle'>
                    OPAC Links
                </div>
                <div className='BookDetail_Links'>
                    {opacLinks.map((opacLink) => (
                            <div key={nanoid()} >
                                <OpacLink 
                                    link={opacLink} />
                            </div>
                        ))
                    }
                </div>
            </div>
    )
};


export default OpacLinks;