import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {REMOVE_HOTEL} from '../../utils/mutations';
import {Accordion, Icon, Button} from 'semantic-ui-react';

const HotelMin = ({savedDetail, activeIndex, setActiveIndex, id, tripsData, setUserData, tripID})=>{

    const {_id, name,startDate,endDate,cost,rooms} = savedDetail;
    const [removeHotel] = useMutation(REMOVE_HOTEL);


    const handleClick = (e,{index}) =>{
        const newIndex = (activeIndex === index)? -1 : index;
        setActiveIndex(newIndex);
    }

    const handleDelete= async()=>{
        const response = await removeHotel({
            variables: {deleteField:{
                DeleteId: _id,
                TripId: tripID
            }}
        })
        // const updatedTrips = tripsData.map(trip => {
        //     // look in each trips for the matching trip ID
        //     if (trip._id === tripID){
        //         const updatedHotels = trip.hotels.filter(hotel => hotel._id !== _id );
        //         trip = {...trip,  hotels: updatedHotels};
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
                    {startDate}{' - '}{endDate} {cost}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === id}>
                <div>{name} </div>
                <div>{rooms} {rooms>1?' rooms':'room'}</div>
                
                <Button circular icon='trash' onClick={handleDelete}/>

            </Accordion.Content>
        </>
    );

}


export default HotelMin;