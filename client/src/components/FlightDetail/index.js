import React from 'react';
import {Accordion, Icon} from 'semantic-ui-react';
import {durationFormater} from '../../utils/helpers';
const airlines = require('airline-codes');
const airports = require('airport-codes');


const FlightDetail = ({flightResult, activeIndex, setActiveIndex})=>{
    const {id, itineraries, price: {grandTotal, currency},validatingAirlineCodes} = flightResult;
    const {segments: flights, duration} = itineraries[0];
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
                {flights.map(flight =>{
                    const {aircraft: {code}, departure, arrival, duration, id} = flight;
                    return(
                        <div key={`flight_${id}`}>
                            <p>{departure.at}{' '}{airports.findWhere({ iata: departure.iataCode }).get('name')}, {departure.terminal?`terminal: ${departure.terminal}`:''}</p>
                            <p> {durationFormater(duration)}</p>
                            <p>{arrival.at}{' '}{airports.findWhere({ iata: arrival.iataCode }).get('name')}{arrival.terminal?`, terminal: ${arrival.terminal}`:''}</p>
                            <p>Aircraft code: {code} </p>
                               
                            
                        </div>
                    )
                })}
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