import React, { useEffect, useState } from "react";
import "./home.scss";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CountryList from "../../components/CountryList/Countrylist";
import { gql, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import client from "../../client";

const LIST_COUNTRIES = gql`
  {
    countries {
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

const Home = () => {
  // const [countrySearch, setCountrySearch] = useState('');
  // const [countries, setCountries] = useState();
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });


  return (
    <div className="home">
      <NavBar />
      {loading || error ? (
        <div className="home__progress">
          <CircularProgress />
        </div>
      ) : (
        <CountryList data={data} />
      )}
      <Footer />
    </div>
  );
};

export default Home;