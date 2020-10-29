import React, { useState } from 'react';
import './Search.css';

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
            <form className='search-form'>
                <h1><a href='index.html'>Weather</a></h1>
                <input className='search-input' type='text' placeholder='Search city' value={value} onChange={e => setValue(e.target.value)} />
                <br />
                <button className='search-btn' onClick={onSearch}>Search</button>
            </form>
            
        </div>
    );
};

export default Search;