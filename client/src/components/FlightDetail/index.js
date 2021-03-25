import React, {useState} from 'react';
import {Accordion, Icon, Button,Popup} from 'semantic-ui-react';
import SingleTrip from './SingleTrip';
import {durationFormater} from '../../utils/helpers';



const FlightDetail = ({flightResult, activeIndex, setActiveIndex})=>{
    const airlines = require('airline-codes');
    const {id, itineraries, price: {grandTotal, currency} = {},validatingAirlineCodes} = flightResult;

        // Temporary popup
        const [open, setOpen] = useState(false)
    
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

                    {' '}{grandTotal}{' '}{currency}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === id}>
                {/* Departure and returning */}
                <h3>Departure: </h3> {durationFormater(itineraries[0].duration)}{' '}
                {itineraries[0].segments.length === 1?'Nonstop':`${itineraries[0].segments.length-1} stop`}{' '}
                <SingleTrip itinerary={itineraries[0]}/>
                {/* Return trip if there's more than 1 intinerary */}
                {itineraries[1]?(
                    <>
                        <h3>Return: </h3> {durationFormater(itineraries[1].duration)}{' '}
                        {itineraries[1].segments.length === 1?'Nonstop':`${itineraries[1].segments.length-1} stop`}{' '}
                        <SingleTrip itinerary={itineraries[1]}/>
                    </>
                ):''}
                <Popup
                    content='Will be added later'
                    on='click'
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    position='top left'
                    trigger={<Button content={'Save'}/>}
                />
            </Accordion.Content>
        </>
    );

}


export default FlightDetail;