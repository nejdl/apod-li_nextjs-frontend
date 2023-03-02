import { useState, useEffect } from 'react';

// import { searchFilterPosts } from './SearchLogic';
import BorderTop from '../../Blocks/Border/BorderTop';

const Search = ({ searchTerm, setSearchTerm, searchFilteredPosts, filterPosts, setActiveFilterOptions, setSessionStorage }) => {

    useEffect(() => {
        setActiveFilterOptions();
        // remember search term
        setSessionStorage();
    }, [searchTerm]);

    return (
        <div className='search'>
            <div className='border filterLine'>
                <input 
                    type='text'
                    placeholder='SEARCH' 
                    onChange={(event) => setSearchTerm(event.target.value)}
                    // onInput={setActiveFilterOptions}
                    value={searchTerm}
                    />
                {/* {searchTerm} // 
                {searchFilteredPosts !== '' && searchFilteredPosts !== undefined 
                && searchFilteredPosts.map((searchFilteredPost) => {
                    if(searchFilteredPost.visibility){
                        return (
                            searchFilteredPost.title
                        )
                    }
                })} */}
            </div>
        </div>
    )
}

export default Search;