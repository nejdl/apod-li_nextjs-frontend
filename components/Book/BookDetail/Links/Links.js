import { nanoid } from 'nanoid';

import Link from './Link/Link';
import BorderTop from '../../../Blocks/Border/BorderTop';

const Links = ({content, isPublicationGroup}) => {

    // get everything but the opac links
    let contentLinks = content.Links;
    const filterOutOpacLinks = (link) => {
        return link.__component !== "links.opac-link"
    }
    let links = [];
    // make sure links are not undefined before filtering (as in publication group item)
    if (contentLinks !== undefined){
        links = contentLinks.filter(filterOutOpacLinks);
    // if links are from a publication group item
    // add them to link array with corresponding component property
    } else if (isPublicationGroup){
        const publicationGroupRelatedLinks = content.related_link;
        publicationGroupRelatedLinks.map((publicationGroupRelatedLink) => {
            publicationGroupRelatedLink.__component = 'links.related-links';
            links.push(publicationGroupRelatedLink)
        })

        const publicationGroupEbookLinks = content.ebook;
        publicationGroupEbookLinks.map((publicationGroupEbookLink) => {
            publicationGroupEbookLink.__component = 'links.ebook';
            links.push(publicationGroupEbookLink)
        })
    
        const publicationGroupPlatformParatexts = content.platform_paratext;
        publicationGroupPlatformParatexts.map((publicationGroupPlatformParatext) => {
            publicationGroupPlatformParatext.__component = 'links.platform-paratext';
            links.push(publicationGroupPlatformParatext)
        })

    }

    // check if there are any links
    let hasLinks = false;
    if(links.length > 0){
        hasLinks = true;
    }

    return (
        hasLinks
        && <div className='BookDetail_Links_container'>
                <BorderTop />
                <div className='BookDetail_subtitle'>
                    Links
                </div>
                <div className='BookDetail_Links'>
                    {links.map((link) => (
                            <div key={nanoid()} >
                                <Link 
                                    link={link} />
                            </div>
                        ))
                    }
                </div>
            </div>
    )
};

export default Links;
