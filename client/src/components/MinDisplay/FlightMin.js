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
            variables: {deleteField:{
                DeleteId: _id,
                TripId: tripID
            }}
        })
        // const updatedTrips = tripsData.map(trip => {
        //     // look in each trips for the matching trip ID
        //     if (trip._id === tripID){
        //         const updatedFlights = trip.flights.filter(flight => flight._id !== _id );
        //         trip = {...trip, flights: updatedFlights};
        //     }        
        //     return trip
        // })
        
        // setUserData({...tripsData, trips:updatedTrips});
    }

    return (
        <>
            <Accordion.Title active = {activeIndex === id} index={id} onClick={handleClick}>
                <Icon name='dropdown' />
                {/* Header information */}
                    <div>{airline} {cost}</div>
                    <Button circular icon='trash' onClick={handleDelete}/>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === id}>
                <p>Departing on: {departure}</p>
                <p>Returning on: {returning} </p>
                <p>Flight duration: duration</p>
                <div>{people} passenger{people>1?'s':''}</div>
                
                
            </Accordion.Content>
        </>
    );

}


export default FlightMin;