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
        setActiveIndex(-1);
    }

    return (
        <>
            <Accordion.Title active = {activeIndex === id} index={id} onClick={handleClick} className={"p-0"}>
            <div className={"card-header py-2"}>
                <div className={"d-flex justify-content-between m-0"}>
                    <h3 className={"m-0 pt-1"}>{name}, {cost} USD</h3>
                    <div>
                        <Button circular icon='trash' onClick={handleDelete}  size='mini'/>
                    </div>
                </div>
            </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === id}>
                <p>Check-in date: {startDate.slice(0,-9)}</p>
                <p>Check-out date: {endDate.slice(0,-9)}</p>
                
                <p>{rooms} {rooms>1?' rooms':'room'}</p>
            </Accordion.Content>
        </>
    );

}


export default HotelMin;