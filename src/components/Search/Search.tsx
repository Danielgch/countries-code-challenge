import React from 'react'
import Input from '@material-ui/core/Input';
import SearchIcon from '@mui/icons-material/Search';
import './search.scss'

const Search = () => {
    return (
        <div className='search-box'>
            <div className="search-box__wrapper">
                <Input placeholder="Search" disableUnderline={true} />
                <SearchIcon />
            </div>

        </div>
    )
}

export default Search;