import React, {useState, useEffect} from "react";
import Amadeus from 'amadeus';
import SearchList from '../components/SearchList';
import FlightSearchForm from '../components/FlightSearch';
import HotelSearchForm from '../components/HotelSearch';
require('dotenv').config();

const amadeus = new Amadeus({
    clientId: process.env.REACT_APP_AMADEUS_CLIENT_ID,
    clientSecret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET
  });



const Home = () =>{

    const [searchResult, setSearchResult] = useState([]);
    const [isVisible, setVisible] = useState(false);
    useEffect(()=>{
      (searchResult.length)? setVisible(true): setVisible(false)
    },[searchResult]);
    
    return (
      <>
        <nav className="navbar navbar-dark bg-dark d-flex justify-content-between align-items-end">
          <h1 className="p-2 text-light m-0">Trip Planner</h1>
          <button className=" text-light btn btn-dark" onClick={()=>{console.log('logged out')}} >Logout</button>
        </nav>
        <div className="container">
          <div style={{marginTop : '80px'}} className={'jumbotron text-center'}>
            <h1 className={"display-4"}>Trip Planner <span role={"img"} aria-label={"Memo"}>✈️</span></h1>
            <h4 className={"mt-4"}>Plan your future trips now!</h4>
            
          </div>
        </div>
        {/* <FlightSearchForm amadeus={amadeus} setSearchResult={setSearchResult}/>
        <HotelSearchForm amadeus={amadeus} setSearchResult={setSearchResult}/>

        {isVisible?(<SearchList searchResult={searchResult} amadeus={amadeus}/>):(<></>)} */}
      </>
    )
}

export default Home;