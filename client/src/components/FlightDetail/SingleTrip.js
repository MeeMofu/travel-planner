import React from 'react';
import {durationFormater} from '../../utils/helpers';
const airports = require('airport-codes');


const SingleTrip = ({itinerary})=>{
    const {segments: flights} = itinerary;
    console.log(itinerary);
    return (
        <>
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
        </>
    )
}

export default SingleTrip;