import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {REMOVE_FLIGHT} from '../../utils/mutations';
import {Accordion, Icon, Button} from 'semantic-ui-react';

const FlightMin = ({savedDetail, activeIndex, setActiveIndex, id, tripsData, setUserData, tripID})=>{

    const {_id,airline,departure,return: returning,duration,cost,people} = savedDetail;
    const [removeFlight] = useMutation(REMOVE_FLIGHT);

    const handleClick = (e,{index}) =>{
        const newIndex = (activeIndex === index)? -1 : index;
        setActiveIndex(newIndex);
    }

    const handleDelete= async()=>{
        await removeFlight({
            variables: {id:_id}
        })
        const updatedTrips = tripsData.map(trip => {
            // look in each trips for the matching trip ID
            if (trip._id === tripID){
                const updatedFlights = trip.flights.filter(flight => flight._id !== _id );
                // Find the removed flight to get the cost
                let newCost = trip.totalCost;
                const removed =  trip.flights.filter(flight => flight._id === _id );
                
                if (removed) newCost -= removed[0].cost;
                trip = {...trip, totalCost: newCost, flights: updatedFlights};
            }        
            return trip
        })
        
        setUserData({...tripsData, trips:updatedTrips});
    }

    return (
        <>
            <Accordion.Title active = {activeIndex === id} index={id} onClick={handleClick}>
                <Icon name='dropdown' />
                {/* Header information */}
                    {departure}{' - '}{returning} {cost}
                    <Button circular icon='trash' onClick={handleDelete}/>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === id}>
                <div>{airline} </div>
                <div>{people} {people>1?' peoples':'person'}</div>
                
                
            </Accordion.Content>
        </>
    );

}


export default FlightMin;