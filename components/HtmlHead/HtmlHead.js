import Head from 'next/head';

import { backendurl } from '../../api/backendurl';

const HtmlHead = ({pageTitle, coverimage}) => {
    let coverimageUrl = "https://apod.li/assets/thumbnail-2.png";

    if (coverimage !== null && coverimage !== undefined){
        coverimageUrl = backendurl + coverimage.url;
    }

    return (
        <Head>  
            <title>{pageTitle}</title>

            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> */}
            <meta
                name="description"
                content="Library of Artistic Print on Demand"
            />
            <meta name="keywords" content="library, book, artist, print on demand, pod" />

            {/* FAVICONS  */}
            <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png" />
            <link rel="manifest" href="assets/favicon/site.webmanifest" />
            <link rel="mask-icon" href="assets/favicon/safari-pinned-tab.svg" color="#8b8bef" />
            <link rel="shortcut icon" href="assets/favicon/favicon.ico" />
            <meta name="msapplication-TileColor" content="#8b8bef" />
            <meta name="msapplication-config" content="assets/favicon/browserconfig.xml" />
            <meta name="theme-color" content="#ffffff" />
            
            {/* TWITTER & FB THUMBNAILS */}
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content="Library of Artistic Print on Demand" />
            <meta property="og:image" content={coverimageUrl} />
            <meta property="og:url" content="https://apod.li" />

            <meta name="twitter:card" content="summary_large_image" />
    
        </Head>
    )
}

export default HtmlHead;