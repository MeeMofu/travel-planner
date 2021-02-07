import React, {useState, useEffect} from "react";
import Amadeus from 'amadeus';
import SearchList from '../components/SearchList';
import FlightSearchForm from '../components/FlightSearch';
import HotelSearchForm from '../components/HotelSearch';
import Landing from '../components/Landing';
import Auth from '../utils/auth';

require('dotenv').config();





const Home = () =>{

    const [searchResult, setSearchResult] = useState([]);
    const [isVisible, setVisible] = useState(false);
    
    useEffect(()=>{
      (searchResult.length)? setVisible(true): setVisible(false)
    },[searchResult]);

    const amadeus = new Amadeus({
      clientId: process.env.REACT_APP_AMADEUS_CLIENT_ID,
      clientSecret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET
    });

    // useEffect(()=>{
    //   console.log(process.env.REACT_APP_AMADEUS_CLIENT_ID);
    //   console.log(process.env.REACT_APP_AMADEUS_CLIENT_SECRET);
    // },[]);
    
    return (
      <>
        
        {!Auth.loggedIn() && <Landing />}
        {Auth.loggedIn() && (
          <>
            <FlightSearchForm amadeus={amadeus} setSearchResult={setSearchResult}/>
            <HotelSearchForm amadeus={amadeus} setSearchResult={setSearchResult}/>
          </>
        )}
        {/* <FlightSearchForm amadeus={amadeus} setSearchResult={setSearchResult}/>
        <HotelSearchForm amadeus={amadeus} setSearchResult={setSearchResult}/>

        {isVisible?(<SearchList searchResult={searchResult} amadeus={amadeus}/>):(<></>)} */}
      </>
    )
}

export default Home;