export const libraryMenuItem = 'Library';
export const libraryMenuItemSlug = '';
export const libraryMenuItemApiSlug = 'publications';
export const pagesMenuItemSlug = '';
export const pagesMenuItemApiSlug = 'pages';
export const errorPageMenuItem = '404';
export const errorPageMenuItemSlug = '404';
export const menuOrderSlug = 'menu';
export const newsElementApiSlug = 'news-element';
export const publicationSeriesApiSlug = 'publication-series';

export const transformSlugToMenuItem = (menuItemSlug) => {
    switch (menuItemSlug){
        case libraryMenuItemSlug:
            return libraryMenuItem;
        case errorPageMenuItemSlug:
            return errorPageMenuItem;
        default: 
            return null;
    }
}

export const transformMenuItemToSlug = (menuItem) => {
    switch (menuItem){
        case libraryMenuItem:
            return libraryMenuItemSlug;
        case errorPageMenuItem:
            return errorPageMenuItemSlug;
        default: 
            return null;
    }
}

export const transformMenuItemToApiSlug = (menuItem) => {
    switch (menuItem){
        case libraryMenuItem:
            return libraryMenuItemApiSlug;
        default: 
            return null;
    }
}
