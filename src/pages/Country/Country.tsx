import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import client from "../../client";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import "./country.scss";

/**
 * GraphQl Search Query to load Country from Query param
 *
 */

const SEARCH_COUNTRY = gql`
  query SEARCH_COUNTRY($codeSearch: String!) {
    countries(filter: { code: { eq: $codeSearch } }) {
      name
      code
      emoji
      currency
      capital
      languages {
        code
        name
      }
      continent {
        code
        name
      }
    }
  }
`;

/**
 * Country Component
 * Component to show a card With all of info of Country Selected
 * @param {data} param0 Info of country selected
 * @returns Card component with the info
 */
const Country = () => {
    const { code } = useParams() as any;
    const [codeSearch, setCodeSearch] = useState();
    const { data, loading, error } = useQuery(SEARCH_COUNTRY, {
        client,
        variables: { codeSearch }
    });

    const navigate = useNavigate();

    useEffect(() => {
        setCodeSearch(code);
    }, [code]);

    return (
        <div className="country-page">
            <div className="country-page__go-back">
                <Button
                    onClick={() => navigate("/")}
                    className="btn btn__text"
                    size="small"
                    variant="text"
                >
                    <ArrowBackIosIcon />
                    Go back
                </Button>
            </div>
            {loading || error  || !data ? (
                <div className="country-page__progress">
                    <CircularProgress />
                </div>
            ) : (
                <div className="country-page__details">
                    <div className="country-page__details-left">
                        <span
                            className="emoji"
                            role="img"
                            
                        >
                            {data.countries[0].emoji}
                        </span>

                        <h2 className="country-card__name">{data.countries[0].name}</h2>
                    </div>
                    <div className="country-page__details-right">
                        <div className="country-page__details-right-list">
                            <h2>Currency: </h2>{" "}
                            <h2 className="right">{data.countries[0].currency}</h2>
                        </div>
                        <div className="country-page__details-right-list">
                            <h2>Continent: </h2>{" "}
                            <h2 className="right">{data.countries[0].continent.name}</h2>
                        </div>
                        <div className="country-page__details-right-list">
                            <h2>Languages: </h2>{" "}
                            <h2 className="right">{data.countries[0].languages[0].name}</h2>
                        </div>
                        <div className="country-page__details-right-list">
                            <h2>Capital:</h2>
                            <h2 className="right">{data.countries[0].capital}</h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Country;
