import React, { useState, useEffect } from 'react';
import {Pagination, Accordion} from 'semantic-ui-react';
import FlightDetail from '../FlightDetail';
import HotelDetail from '../HotelDetail';

const DisplayList = ({contentList}) =>{
    const [searchOffset,setOffset] = useState(0);
    const [activeButton,setActive] = useState(1);
    const [activeIndex,setActiveIndex] = useState(-1);
    
    const defaultList = contentList.slice(0,5);
    const [toBeDisplayed,setToBeDisplayed] = useState(defaultList);

    useEffect(()=>{
        setToBeDisplayed(contentList.slice(searchOffset,searchOffset+5));
    },[searchOffset]);
    useEffect(()=>{
        setOffset(0);
    },[contentList])

    // useEffect(()=>{
    //     console.log(toBeDisplayed);

    // },[toBeDisplayed]);

    const handlePageClick = (e, {activePage})=>{
        setActive(activePage);
        setOffset((activePage-1)*5);
    }

    return (
        <div className="DisplayList">
            <div className={"py-3"} >
                <Accordion fluid styled>
            {toBeDisplayed.map((content, index) =>{
                // I've tried switch statement, however, it doesn't seems to detect if the contentList has changed, as in when the contentList is updated, switch statement doesn't update the content
                // This is important as this display list is reused to display flight & hotel offer that'll be change whenever the user makes a new search
                if (content.type === "flight-offer")
                    return (
                        <FlightDetail flightResult={content} key={`${content.type}_${content.id}`} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                    )
                else if ((content.type === "hotel-offers"))
                    return (
                        <HotelDetail id={index} hotelResult={content} key={`${content.type}_${content.hotel.hotelId}`} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                    )
                else
                    return <div />
            })}
        </Accordion>
            </div>
        
        {(contentList.length>5)?(
            <Pagination
                activePage={activeButton}
                onPageChange={handlePageClick}
                totalPages={Math.ceil(contentList.length/5)}
            />)
            :
            (<></>)
        }
        
       
    </div>
    );
}

export default DisplayList;