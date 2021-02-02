import React from 'react';
import {Accordion, Icon} from 'semantic-ui-react';
import SingleTrip from './SingleTrip';
import {durationFormater} from '../../utils/helpers';



const FlightDetail = ({flightResult, activeIndex, setActiveIndex})=>{
    const airlines = require('airline-codes');
    const {id, itineraries, price: {grandTotal, currency},validatingAirlineCodes} = flightResult;
    
    // const {aircraft: {code}, departure, arrival, duration: flightDuration, id} = flights
    const handleClick = (e,{index}) =>{
        const newIndex = (activeIndex === index)? -1 : index;
        setActiveIndex(newIndex);
    }

    return (
        <>
            <Accordion.Title active = {activeIndex === id} index={id} onClick={handleClick}>
                <Icon name='dropdown' />
                {/* Header information */}
                    {validatingAirlineCodes.map((code, i) => {
                        const airline = airlines.findWhere({iata: code}).get('name');
                        return (i === validatingAirlineCodes.length-1)?airline : `${airline}, `
                    })}

                    {grandTotal} {currency}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === id}>
                {/* Departure and returning */}
                <h3>Departure:</h3> {durationFormater(itineraries[0].duration)}
                {itineraries[0].segments.length === 1?'Nonstop':`${itineraries[0].segments.length-1} stop`}
                <SingleTrip itinerary={itineraries[0]}/>
                {/* Return trip if there's more than 1 intinerary */}
                {itineraries[1]?(
                    <>
                        <h3>Return:</h3> {durationFormater(itineraries[1].duration)}
                        {itineraries[1].segments.length === 1?'Nonstop':`${itineraries[1].segments.length-1} stop`}
                        <SingleTrip itinerary={itineraries[1]}/>
                    </>
                ):''}
            </Accordion.Content>
        </>
        // <div className="card">
        //     <div className="card-header row">
        //         {grandTotal} {currency}
        //     </div>
        // </div>
    );

}


export default FlightDetail;