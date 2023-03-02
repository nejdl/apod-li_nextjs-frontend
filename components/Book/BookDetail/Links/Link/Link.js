import { backendurl } from '../../../../../api/backendurl';
import { getValidUrl } from '../../../../../utils/getValidUrl.js';

const Link = ({ link }) => {

  const getComponentTypeName = (link, url) => {


        const componentType = link.__component;
        
        switch (componentType){
            case 'links.opac-link':
                return 'OPAC';
            case 'links.platform-paratext':
                return 'Platform Paratext';
            case 'links.ebook':
                return 'E-Book';
            case 'links.related-links':
                return url;
            default: 
                return 'Link';
        }
    }
    
    const hasProperty = ( property ) => {
        if (property !== undefined && property !== null && property !== ''){
            return true;
        } else {
            return false;
        }
    }

    const addHttp = (linkUrl) => {
        const prefixedLinkUrl = linkUrl;

        if (linkUrl){
            prefixedLinkUrl = 'http://' + linkUrl;
        } 
        return prefixedLinkUrl;
    }

    return (
        <>
            {hasProperty(link.url)
                && <a href={getValidUrl(link.url)}>
                    {hasProperty(link.title)
                        ? link.title
                        : getComponentTypeName(link, link.url)
                    }
                </a>
            }
            {hasProperty(link.file)
                && <a href={backendurl + link.file.url}>
                        {hasProperty(link.title)
                            ? link.title
                            : getComponentTypeName(link, link.url)
                        }
                    </a>
            }
            {hasProperty(link.screenshot)
                && <a href={backendurl + link.screenshot.url}>
                        {hasProperty(link.title)
                            ? link.title
                            : getComponentTypeName(link, link.url)
                        }
                    </a>
            }
        </>
    )
}

export default Link; 