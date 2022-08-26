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

/**
 * I try to do the filter by some fields
 * and I only managed to do it by the code, I would like to know how to send it to other fields
 */

const FILTER_COUNTRIES = gql`
  query FILTER_COUNTRIES($search: String!) {
    countries(
      filter: {
        code: { eq: $search }
        # currency: {eq: $search}
        # continent: {eq: $search}
      }
    ) {
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
  const [dataCountries, setDataCountries] = useState([]);
  const [search, setSearch] = useState("");

  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });
  const {
    data: dataSearch,
    loading: loadingSearch,
    error: errorSearch
  } = useQuery(FILTER_COUNTRIES, {
    client,
    variables: { search }
  });

  useEffect(() => {
    if (search) {
      setDataCountries(dataSearch);
    } else {
      setDataCountries(data);
    }
  }, [search, data, dataSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const typing = e.target.value;
    setSearch(typing);
  };

  return (
    <div className="home">
      <NavBar handleChange={handleChange} search={search} />
      {loading || loadingSearch || error ? (
        <div className="home__progress">
          <CircularProgress />
        </div>
      ) : (
        <>
          <CountryList
            data={!dataCountries ? data : dataCountries}
            search={search}
          />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
