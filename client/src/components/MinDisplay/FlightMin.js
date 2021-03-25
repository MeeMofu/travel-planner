import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {REMOVE_FLIGHT} from '../../utils/mutations';
import {Accordion, Button, CardContent} from 'semantic-ui-react';

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
    }

    return (
        <>
        {/* <div className={"card text-left p-0 " }>
            <div className={"card-header"}>
                <div className={"d-flex justify-content-between m-0"}>
                    <h3>{airline}</h3>
                    <div>
                        <Button circular icon='trash' onClick={handleDelete}/>
                    </div>
                </div>
            </div>
            <div className={"card-body"}>
                <p>Departing on: {departure}</p>
                <p>Returning on: {returning} </p>
                <p>Flight duration: {duration}</p>
                <div>{people} passenger{people>1?'s':''}</div>
            </div>
        </div> */}
        {/* <Card fluid>
            <Card.Content header className={"d-flex justify-content-between m-0"}>
                <h2>{airline} {cost}</h2>
                    <Button circular icon='trash' onClick={handleDelete}/>
            </Card.Content>
            <CardContent description>
                
            </CardContent>
        </Card> */}
            <Accordion.Title active = {activeIndex === id} index={id} onClick={handleClick} className={"p-0"}>
            <div className={"card-header py-2"}>
                <div className={"d-flex justify-content-between m-0"}>
                    <h3 className={"m-0 pt-1"}>{airline}, {cost} USD</h3>
                    <div>
                        <Button circular icon='trash' onClick={handleDelete}  size='mini'/>
                    </div>
                </div>
            </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === id}>
            <div className={"card-body p-0"}>
                <p>Departing on: {departure}</p>
                {(returning) && <p>Returning on: {returning} </p>} 
                <p>Flight duration: {duration}</p>
                <div>{people} passenger{people>1?'s':''}</div>
            </div>
                
                
            </Accordion.Content>
        </>
    );

}


export default FlightMin;