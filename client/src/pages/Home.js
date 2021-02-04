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
    // useEffect(()=>{
    //     amadeus.shopping.flightOffersSearch.get({
    //         originLocationCode: 'SYD',
    //         destinationLocationCode: 'BKK',
    //         departureDate: '2021-08-01',
    //         returnDate:'2021-08-10',
    //         adults: '1',
    //         travelClass: 'ECONOMY',
    //         nonStop: false,
    //         currencyCode: 'USD'
    //     })
    //     .then(({data}) => {
    //         // console.log(data);
    //         // clean up duplicate price options, as the API has sorted the cheapest with shortest travel time option first
    //         // duplicate option is redundant
    //         const cleanedData = data.filter((option, index)=>(
    //             index === 0 || ((index>0) && ((option.price.grandTotal!==data[index-1].price.grandTotal)||(option.validatingAirlineCodes[0]!==data[index-1].validatingAirlineCodes[0])))
    //         ));

    //         setSearchResult(cleanedData);
            
    //     }).catch((responseError) => {
    //         console.log(responseError);
    //     });
    // },[])
    
    return (
      <>
        {/* <Modal onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open} style={inlineStyle.modal}
          trigger={<Button>Search a Hotel</Button> }>
              <Modal.Content>
              </Modal.Content>

        </Modal> */}
          <FlightSearchForm amadeus={amadeus} setSearchResult={setSearchResult}/>

        

          {isVisible?(<SearchList searchResult={searchResult} amadeus={amadeus}/>):(<></>)}
        </>
    )
}

export default Home;