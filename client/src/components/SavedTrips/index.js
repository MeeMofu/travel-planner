import React,{useState,useEffect} from 'react';
import {QUERY_ME} from '../../utils/queries';
import {useQuery} from '@apollo/react-hooks';
import CreateTrip from '../CreateTrip';



const SavedTrips= () =>{
    const {loading, data} = useQuery(QUERY_ME);
    const [userData, setUserData]=useState({});
    useEffect(()=>{
        // Check if data is avaliable
        if (data) {
            const {me}=data;
            setUserData({...userData, ...me});
        } 
    },[data]);

    useEffect(()=>{
        console.log(userData);
    })

    return (
        <>
              <CreateTrip userData={userData} setUserData={setUserData}/>
        
        </>
    )
}


export default SavedTrips