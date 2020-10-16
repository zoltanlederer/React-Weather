import React, { useState } from 'react';
import './Search.css';

const Search = ( {onSearchValue} ) => {

    // search = 'Pecs';

    const [value, setValue] = useState('');
    const [coord, setCoord] = useState({});
    
    const onSearch = (e) => {
        e.preventDefault();
        onSearchValue(value);
    }

    return (
        <div>
            <form>
                <input type='text' value={value} onChange={e => setValue(e.target.value)} />
                <button className='search-btn' onClick={onSearch} onTouchStart={onSearch}>CLICK</button>   
            </form>
            
        </div>
    );
};

export default Search;


// const Search = ( {onSearchValue} ) => {

//     const [value, setValue] = useState('');

//     const onSearch = (e) => {
//         e.preventDefault();
//         onSearchValue(value, function());
//     }

//     return (
//         <div>
//             <form>
//                 <input type='text' value={value} onChange={e => setValue(e.target.value)} />
//                 <button onClick={onSearch}>CLICK</button>   
//             </form>
            
//         </div>
//     );
// };