import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button"
import './countrycard.scss';

/**
 * Country Card Component
 * Component to show each Card Country with Emoji, name, continent
 * @param {country} param0 data to show the country info in the card
* @returns Card info with the following data {emoji, name, continent}
 */
const CountryCard = ({ country }: any) => {
    let navigate = useNavigate();
    const redirectionToCountry = () => {
        let path = `/country/${country.code}`;
        navigate(path);
    }

    return (
        <>
            <div className="country-card" >
                <div className="country-card__wrapper">
                    <span className="emoji" role="img" aria-label={country.name}>{country.emoji}</span>
                    <h2 className="country-card__name">{country.name}</h2>
                    <h2 className="country-card__continent">{country.continent.name}</h2>
                    <div className="country-card__action">
                        <Button className="btn btn__primary" color="primary" onClick={redirectionToCountry}> Info </Button>
                    </div>
                </div>
            </div>
        </>

    )
}


export default CountryCard;
