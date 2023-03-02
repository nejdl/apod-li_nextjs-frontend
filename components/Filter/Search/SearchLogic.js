import latinize from 'latinize';

// check if post has property
const hasProperty = (post, property) => {
    if((post[property] !== null)
        && (post[property] !== undefined)) {
            if ((post[property].length > 0)){
                return true;
            } else if(typeof(post[property]) == 'number'){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
}

// filter posts by property
export const filterPostsByProperty = (filteredPost, property, searchTerm) => {
    if (hasProperty(filteredPost, property)){
        if (isNaN(filteredPost['isSearched'])){
            filteredPost['isSearched'] = 0;
        }
        
        let isFiltered = false;
        if (latinize(filteredPost[property].toString().toLowerCase()).includes(latinize(searchTerm.toLowerCase()))){
            isFiltered++;
        }

        if (isFiltered > 0){
            filteredPost['isSearched'] = filteredPost['isSearched'] + 1;
            return true;
        } else {
            filteredPost['isSearched'] = 0;
            return false;
        }
    } else {
        filteredPost['isSearched'] = 0;
        return false;
    }
}

// filter posts by property
const filterPostsByMultipleProperty = (filteredPost, property, subProperty, searchTerm) => {
    if (hasProperty(filteredPost, property)){
            if (isNaN(filteredPost['isSearched'])){
                filteredPost['isSearched'] = 0;
            }

            let isFiltered = false;
            for (let i = 0; i < filteredPost[property].length; i++){
                if(hasProperty(filteredPost[property][i], subProperty)){
                    if (latinize(filteredPost[property][i][subProperty].toString().toLowerCase()).includes(latinize(searchTerm.toLowerCase()))){
                        isFiltered++;
                    }
                }
            }

            if (isFiltered > 0){
                filteredPost['isSearched'] = filteredPost['isSearched'] + 1;
                return true;
            }

    } else {
        filteredPost['isSearched'] = 0;
        return false;
    }
}

// filter posts by two combined properties
const filterPostsByMultipleCombinedProperties = (filteredPost, property, subProperty1, subProperty2, searchTerm) => {
    if (hasProperty(filteredPost, property)){
            if (isNaN(filteredPost['isSearched'])){
                filteredPost['isSearched'] = 0;
            }

            let isFiltered = false;
            for (let i = 0; i < filteredPost[property].length; i++){
                const combinedProperties = filteredPost[property][i][subProperty1] + ' ' + filteredPost[property][i][subProperty2];
                if (latinize(combinedProperties.toString().toLowerCase()).includes(latinize(searchTerm.toLowerCase()))){
                    isFiltered++;
                }
            }

            if (isFiltered > 0){
                filteredPost['isSearched'] = filteredPost['isSearched'] + 1;
                return true;
            }

    } else {
        filteredPost['isSearched'] = 0;
        return false;
    }
}

// filter posts by property
const filterPostsByMultiplePropertyDeeperLayer = (filteredPost, property, subProperty, propertyOfSubProperty, searchTerm) => {
    if (hasProperty(filteredPost, property)){
            if (isNaN(filteredPost['isSearched'])){
                filteredPost['isSearched'] = 0;
            }

            let isFiltered = false;
            for (let i = 0; i < filteredPost[property].length; i++){
                if(hasProperty(filteredPost[property][i], subProperty)){

                    for (let j = 0; j < filteredPost[property][i][subProperty].length; j++){
                        if(hasProperty(filteredPost[property][i][subProperty][j], propertyOfSubProperty)){
                            if (latinize(filteredPost[property][i][subProperty][j][propertyOfSubProperty].toLowerCase()).includes(latinize(searchTerm.toLowerCase()))){
                                isFiltered++;
                            }
                        }
                    }

                }
            }

            if (isFiltered > 0){
                filteredPost['isSearched'] = filteredPost['isSearched'] + 1;
                return true;
            }

    } else {
        filteredPost['isSearched'] = 0;
        return false;
    }
}

const filterPosts = (filteredPosts, searchTerm) => {
    return filteredPosts.filter((filteredPost) => (
            filterPostsByMultipleProperty(filteredPost, 'artist_groups', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'authors', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'authors', 'firstName', searchTerm)
            || filterPostsByMultipleCombinedProperties(filteredPost, 'authors', 'firstName', 'name', searchTerm)
            || filterPostsByMultipleCombinedProperties(filteredPost, 'authors', 'name', 'firstName', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'availabilities', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'bibliographical_references', 'reference', searchTerm)
            || filterPostsByProperty(filteredPost, 'description', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'edition_characteristics', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'formats', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'genres', 'name', searchTerm)
            || filterPostsByProperty(filteredPost, 'isbn', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'locations', 'city', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'locations', 'country', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'locations', 'location', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'materialities', 'name', searchTerm)
            // || filterPostsByMultipleProperty(filteredPost, 'meta_subjects', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'methods', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'platforms', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'publication_series', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'publishers', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'subjects', 'name', searchTerm)
            || filterPostsByProperty(filteredPost, 'subtitle', searchTerm)
            || filterPostsByProperty(filteredPost, 'title', searchTerm)
            || filterPostsByProperty(filteredPost, 'volumes', searchTerm)
            || filterPostsByProperty(filteredPost, 'year', searchTerm)
            // PUBLICATION GROUP
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'artist_groups', 'name', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'authors', 'name', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'authors', 'firstName', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'availabilities', 'name', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'bibliographical_references', 'reference', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'publication_group', 'description', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'edition_characteristics', 'name', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'formats', 'name', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'genres', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'publication_group', 'isbn', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'locations', 'city', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'locations', 'country', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'locations', 'location', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'materialities', 'name', searchTerm)
            // || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'meta_subjects', 'name', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'methods', 'name', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'platforms', 'name', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'publishers', 'name', searchTerm)
            || filterPostsByMultiplePropertyDeeperLayer(filteredPost, 'publication_group', 'subjects', 'name', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'publication_group', 'subtitle', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'publication_group', 'title', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'publication_group', 'volumes', searchTerm)
            || filterPostsByMultipleProperty(filteredPost, 'publication_group', 'year', searchTerm)
        ));
}

// get array of single words in search string
const splitSearchTerm = (searchTerm) => {
    let searchTerms = searchTerm.split(' ').filter(w => w !== '');
    return searchTerms;
}

// intersect filtered posts and search filtered posts arrays 
const intersect = (a, b) => {
    let setA = new Set(a);
    let setB = new Set(b);
    let intersection = new Set([...setA].filter(x => setB.has(x)));
    return Array.from(intersection);
}

export const searchFilterPosts = (filteredPosts, searchTerm) => {
    
    // get array of single words in search string
    const searchTerms = splitSearchTerm(searchTerm);

    let searchFilteredPosts = filteredPosts;

    // if no search term is entered
    if(searchTerms.length === 0){
        let searchFilteredPosts = filterPosts(filteredPosts, searchTerm);
    }
    
    // search for each word and get the intersecting posts
    for (let i = 0; i < searchTerms.length; i++){
        let thisSearchFilteredPosts = filterPosts(filteredPosts, searchTerms[i]);
        let newSearchFilteredPosts = intersect(searchFilteredPosts, thisSearchFilteredPosts);
        searchFilteredPosts = newSearchFilteredPosts;
    }
    
    return searchFilteredPosts;
} 
