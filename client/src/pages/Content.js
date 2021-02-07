import React from "react";
import Amadeus from 'amadeus';
import SavedTrips from '../components/SavedTrips';
import Landing from '../components/Landing';
import Auth from '../utils/auth';

require('dotenv').config();

const Home = () =>{
  const amadeus = new Amadeus({
    clientId: process.env.REACT_APP_AMADEUS_CLIENT_ID,
    clientSecret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET
  }); 
    return (
      <>
        
        {!Auth.loggedIn() && <Landing />}
        {Auth.loggedIn() && (
          <>
            <div className="container text-center mt-5">
              <SavedTrips amadeus={amadeus}/>

            </div>
          </>
        )}
      </>
    )
}

export default Home;