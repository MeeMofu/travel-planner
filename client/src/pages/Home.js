import React, {useState, useEffect} from "react";
import Amadeus from 'amadeus';
import SearchList from '../components/SearchList';
require('dotenv').config();

const amadeus = new Amadeus({
    clientId: process.env.REACT_APP_AMADEUS_CLIENT_ID,
    clientSecret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET
  });



const Home = () =>{

    const [searchResult, setSearchResult] = useState([]);

    useEffect(()=>{
        amadeus.shopping.flightOffersSearch.get({
            originLocationCode: 'SYD',
            destinationLocationCode: 'BKK',
            departureDate: '2021-08-01',
            returnDate:'2021-08-14',
            adults: '1',
            children: '2',
            travelClass: 'BUSINESS',
            nonStop: false,
            currencyCode: 'USD'
        })
        .then(({data}) => {
            // console.log(data);
            setSearchResult(data);
            // const {id: tripId,itineraries,price: {grandTotal, currency},type} = data[0];
            // const {duration: totalDuration, segments: flights} =itineraries[0];
            // const {aircraft: {code}, departure, arrival, duration: flightDuration, id} = flights[0];
            // console.log(tripId);
            // console.log(totalDuration);
            // console.log (flights);
            // console.log (code);
            // console.log (departure);
            // console.log (arrival);
            // console.log (flightDuration);
            // console.log (id);
            // console.log (grandTotal);
            // console.log (currency);
            // console.log (type);
            
        }).catch((responseError) => {
            console.log(responseError);
        });
    },[])

    return (
        <SearchList searchResult={searchResult} amadeus={amadeus}/>
    )
}

export default Home;