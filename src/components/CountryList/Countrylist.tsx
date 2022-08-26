import React, { useState, useEffect } from 'react'
import { Select, MenuItem } from '@material-ui/core';
import CountryCard from '../CountryCard/CountryCard';
import _ from "lodash";
import './countrylist.scss'



const Countrylist = (data: any) => {
    // sorted by asc default
    const [sortBy, setSortBy] = useState(Boolean('asc'));


    const [filteredCountries, setFilteredCountries] = useState([]);
    const { data: dataToSort } = data;
    const { countries } = dataToSort;



    useEffect(() => {
        const sortedData = _.orderBy(countries, ['name'], [sortBy]) as [];
        setFilteredCountries(sortedData);
    }, [sortBy, countries])

    const handleSorting = (e: any) => {
        setSortBy(e.target.value);
    }

    return (
        <div className="home__countries">
            {/* sorting */}
            <div className="country-list__sort">
                <p>Sorting</p>
                <Select labelId="sort-country-select-label"
                    id="sort-country"
                    disableUnderline={true}
                    defaultValue="asc"
                    onChange={handleSorting}>
                    <MenuItem value="asc">Asc</MenuItem>
                    <MenuItem value="desc">Desc</MenuItem>
                </Select>
            </div>
            {/* country lists */}
            <div className="country-list__cards">
                {filteredCountries.map((country: any) => (
                    <CountryCard country={country} key={country.code} />
                ))}
            </div>
           
        </div>
    )
}

export default Countrylist;