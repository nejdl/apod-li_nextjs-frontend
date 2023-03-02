export const groupEventsByYear = ( posts ) => {

    // sort posts alphabetically by name
    posts.sort((a, b) => (new Date(b.date) - new Date(a.date)))

    let data = posts.reduce((r, e) => {
        
        let year = new Date(e.date).getFullYear();
        
        // if there is no property in accumulator with this letter create it
        if (!r[year]) r[year] = { year, record: [e] }
        
        // if there is push current element to children array for that letter
        else r[year].record.push(e);
        
        // return accumulator
        return r;
        }, {});
    
    let result = Object.values(data);

    return result;

}

export const groupReferenceByYear = ( posts ) => {

  // latinize letters to deal with umlaute etc.
    const latinize = require('latinize');

    // sort posts alphabetically by name
    posts.sort((a, b) => latinize(a.reference).localeCompare(latinize(b.reference), 'es', { sensitivity: 'base' }))

    let data = posts.reduce((r, e) => {
        
        let year = e.year;
        
        // if there is no property in accumulator with this letter create it
        if (!r[year]) r[year] = { year, record: [e] }
        
        // if there is push current element to children array for that letter
        else r[year].record.push(e);
        
        // return accumulator
        return r;
        }, {});
    
    let result = Object.values(data);

    return result;

}

export const groupCategories = ( posts, category ) => {

    const publicationCategories = groupCategoriesForPublication(posts, category);
    const publicationsInPublicationGroupCategories = groupCategoriesForPublicationsInPublicationGroup(posts, category);
    // Merges both arrays and gets unique items
    let allPublicationCategories = [...publicationCategories];

    // go through categories of publication group items
    for(let i = 0; i < publicationsInPublicationGroupCategories.length; i++){
        const publicationsInPublicationGroupCategory = publicationsInPublicationGroupCategories[i].category;
        const publicationsInPublicationGroupFirstNameCategory = publicationsInPublicationGroupCategories[i].firstNameCategory;
        
        // check which cateogries already exist in publicationCategories
        let existingPublicationCategory = Object.keys(publicationCategories)
            .filter(existingPublicationCategories => publicationCategories[existingPublicationCategories].category === publicationsInPublicationGroupCategory)
            .map(existingPublicationCategories => publicationCategories[existingPublicationCategories]);
            
        // if the category name doesn't exist in publicationCategories yet
        if(existingPublicationCategory.length === 0){
            // add to allPublicationCategories
            allPublicationCategories = [...allPublicationCategories, publicationsInPublicationGroupCategories[i]]
        // if the name category exists but the firstNameCategory doesn't exist in publicationCategories yet (for authors with same last name)
        } else {
            // check which firstname cateogries already exist in publicationCategories
            let existingPublicationFirstNameCategory = Object.keys(publicationCategories)
                .filter(existingPublicationCategories => publicationCategories[existingPublicationCategories].firstNameCategory === publicationsInPublicationGroupFirstNameCategory)
                .map(existingPublicationCategories => publicationCategories[existingPublicationCategories]);
            if(existingPublicationFirstNameCategory.length === 0){
                // add to allPublicationCategories
                allPublicationCategories = [...allPublicationCategories, publicationsInPublicationGroupCategories[i]]
            }
        }
    }


    return allPublicationCategories;
}

const groupCategoriesForPublication = ( posts, category ) => {
        let data = posts.reduce((allCategories, post) => {

        let categories = post[category];

            if (categories === null){

                // return accumulator
                return allCategories;

            } else if (categories.length === 0){
                
                // return accumulator
                return allCategories;

            } else {
                // for year filters
                if (typeof(categories) === 'number'){
       
                        let category = post.year;
                    
                        if (post.visibility) {
                            // if there is no property in accumulator with this category create it
                            if (!allCategories[category]) {
                                // allCategories[category] = category
                                allCategories[category] = { category, isSelected: false, isActive: true }
                            }
                        }

                    // return accumulator
                    return allCategories;               

                } else {
                    categories.map(({ name, firstName }) => {

                        let category = name;

                        // for author filters
                        let firstNameCategory = firstName;
                    
                        if (post.visibility) {
                            // if there is no property in accumulator with this category create it
                            if (!allCategories[category]) {
                                // allCategories[category] = category
                                
                                // for author filters
                                if (firstName){
                                    allCategories[category] = { category, isSelected: false, isActive: true, firstNameCategory: firstName }
                                } else {
                                    allCategories[category] = { category, isSelected: false, isActive: true }
                                }
                            }
                            
                        }

                    });
                    
                    // return accumulator
                    return allCategories;

                }

            }

    }, {});
    
    let allCategories = Object.values(data);

    return allCategories;
}

const groupCategoriesForPublicationsInPublicationGroup = ( posts, category ) => {
        let data = posts.reduce((allCategories, post) => {

        const publicationGroup = post['publication_group'];

        // check if post has publications in publication group
        if(publicationGroup === null){

                // return accumulator
                return allCategories;

        } else if (publicationGroup.length === 0){

                // return accumulator
                return allCategories;

        // if post has publications in publication group
        } else {

            // for each publication in publication group
            for(let i = 0; i < publicationGroup.length; i++){
                const publicationGroupItem = publicationGroup[i];

                let categories = publicationGroupItem[category];

                if (categories === null){

                    // // return accumulator
                    // return allCategories;

                } else if (categories.length === 0){
                    
                    // // return accumulator
                    // return allCategories;

                } else {
                    // for year filters
                    if (typeof(categories) === 'number'){
        
                            let category = publicationGroupItem.year;
                        
                            if (post.visibility) {
                                // if there is no property in accumulator with this category create it
                                if (!allCategories[category]) {
                                    // allCategories[category] = category
                                    allCategories[category] = { category, isSelected: false, isActive: true }
                                }
                            }

                        // // return accumulator
                        // return allCategories;               

                    } else {
                        categories.map(({ name, firstName }) => {

                            let category = name;

                            // for author filters
                            let firstNameCategory = firstName;
                        
                            if (post.visibility) {
                                // if there is no property in accumulator with this category create it
                                if (!allCategories[category]) {
                                    // allCategories[category] = category
                                    
                                    // for author filters
                                    if (firstName){
                                        allCategories[category] = { category, isSelected: false, isActive: true, firstNameCategory: firstName }
                                    } else {
                                        allCategories[category] = { category, isSelected: false, isActive: true }
                                    }
                                }
                            }

                        });
                        
                        // // return accumulator
                        // return allCategories;

                    }

                }
            }

            // return accumulator
            return allCategories;

        }

    }, {});
    
    let allCategories = Object.values(data);

    return allCategories;
}