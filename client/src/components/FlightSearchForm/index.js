import React, {useState, useEffect} from 'react';
import { Form, Input, TextArea, Button, Select, Icon } from 'semantic-ui-react'
import AirportSearch from './AiportSearch';

const FlightSearchForm = ({amadeus,setVisible})=>{
    const [isloading, setLoading] = useState(false);    // enable/disable the loading icon
    const [searchData, setSearchData] = useState({}); // the object that will be query to the API

    useEffect(() => {
        console.log (searchData);
    },[searchData])

    return (
        <>
            <Form loading={isloading}>
                <AirportSearch type={'Origin'} name ={'originLocationCode'} 
                    searchData={searchData} setSearchData={setSearchData}
                    amadeus={amadeus}/>
                <AirportSearch type={'Destination'} name ={'destinationLocationCode'} 
                    searchData={searchData} setSearchData={setSearchData}
                    amadeus={amadeus}/>
            </Form>
        </>
    )
}

export default FlightSearchForm;