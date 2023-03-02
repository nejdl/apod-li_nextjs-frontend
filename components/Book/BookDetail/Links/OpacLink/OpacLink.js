import { backendurl } from '../../../../../api/backendurl';
import { getValidUrl } from '../../../../../utils/getValidUrl.js';
import { useEffect } from 'react';

const OpacLink = ({ link }) => {
    
    const hasProperty = ( property ) => {
        if (property !== undefined && property !== null && property !== ''){
            return true;
        } else {
            return false;
        }
    }
    
    return (
        <>
            {hasProperty(link.url) 
            ? <div> 
                    <a href={getValidUrl(link.url)}>
                        <div className='BookDetail_Links_title'>
                            {hasProperty(link.title) 
                                ? link.title
                                : link.url
                            }
                        </div>
                    </a>
                    {hasProperty(link.availability) 
                        && <div className='BookDetail_Links_availability'>
                                {link.availability}
                            </div>
                    }
                </div>
            : <div className='BookDetail_OpacLink'> 
                    {hasProperty(link.title)
                        && <div className='BookDetail_Links_title'>
                                {link.title}
                            </div>
                    }
                    {hasProperty(link.availability) 
                        && <div className='BookDetail_Links_availability'>
                                {link.availability}
                            </div>
                    }
                </div>
            }
        </>
    )
}

export default OpacLink; 