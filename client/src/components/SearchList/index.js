import React, { useState, useEffect } from 'react';
import {Pagination, Accordion} from 'semantic-ui-react';
import FlightDetail from '../FlightDetail';
import HotelDetail from '../HotelDetail';

const SearchList = ({searchResult}) =>{
    const [searchOffset,setOffset] = useState(0);
    const [activeButton,setActive] = useState(1);
    const [activeIndex,setActiveIndex] = useState(-1);
    
    const defaultList = searchResult.slice(0,5);
    const [toBeDisplayed,setToBeDisplayed] = useState(defaultList);

    useEffect(()=>{
        setToBeDisplayed(searchResult.slice(searchOffset,searchOffset+5));
        
    },[searchOffset,searchResult]);

    // useEffect(()=>{
    //     console.log(toBeDisplayed);

    // },[toBeDisplayed]);

    const handlePageClick = (e, {activePage})=>{
        setActive(activePage);
        setOffset((activePage-1)*5);
    }

    return (<div className="searchList">
        <Accordion fluid styled>
            {toBeDisplayed.map((result, index) =>{
                if (result.type === "flight-offer")
                    return (
                        <FlightDetail flightResult={result} key={`${result.type}_${result.id}`} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                    )
                else if ((result.type === "hotel-offers"))
                    return (
                        <HotelDetail id={index} hotelResult={result} key={`${result.type}_${result.hotel.hotelId}`} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                    )
                else
                    return <div />
            })}
        </Accordion>
        {(searchResult.length>5)?(
            <Pagination
                activePage={activeButton}
                onPageChange={handlePageClick}
                totalPages={Math.ceil(searchResult.length/5)}
            />)
            :
            (<></>)
        }
        
       
    </div>
    );
}

export default SearchList;