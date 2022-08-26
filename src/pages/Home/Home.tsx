import React, { useEffect, useState } from 'react';
import './home.scss'
import NavBar from '../../components/NavBar/NavBar';
import CountryList from '../../components/CountryList/Countrylist';
import { gql, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import client from '../../client';

const LIST_COUNTRIES = gql`
  {
    countries{
      name
      code
      emoji
      currency
      capital
      languages{
        code
        name
      }
      continent{
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

  // useEffect(() => {
  //   setCountries(data);
  // }, [data])



  return (
    <div className="home">
      <NavBar />
      {(loading || error) ?
        <div className="home__progress">
          <CircularProgress />
        </div>
        : <CountryList data={data} />
      }
    </div>
  )
}


export default Home;