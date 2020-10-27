import React, { useState } from 'react';

const Search = ( {onSearchValue} ) => {

    const [value, setValue] = useState('');
    
    const onSearch = (e) => {
        e.preventDefault();
        const currentActive = document.querySelector('.container-current-active');
        if (currentActive) {
            currentActive.classList.remove('active');    
        }
        
        onSearchValue(value);
        setValue('');
    }

    return (
        <div>
            <form>
                <input type='text' placeholder='Search city' value={value} onChange={e => setValue(e.target.value)} />
                <button onClick={onSearch}>Search</button>
            </form>
            
        </div>
    );
};

export default Search;