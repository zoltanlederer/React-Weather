import React, { useState } from 'react';

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
            <form onSubmit={onSearch}>
                <input type='text' value={value} onChange={e => setValue(e.target.value)} />
                <button>Search</button>   
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