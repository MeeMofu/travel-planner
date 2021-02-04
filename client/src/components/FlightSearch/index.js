import React, {useState, useEffect} from 'react';
import { Form, Button, Message } from 'semantic-ui-react'
import AirportSearch from './AiportSearch';
import DateInput from './DateInput';
import PassengerInput from './PassengerInput';

const FlightSearchForm = ({amadeus, setSearchResult, setOpen})=>{
    const [searchData, setSearchData] = useState({currencyCode:'USD'});
    // The object that'll hold all the query parameter
    const [isLoading, setLoading]=useState(false);
    // State to display if the form is loading

    const [error,setError]=useState(false);
    const [noResult,setNoResult]=useState(false);
    // States to let user knows if there's any error

    const travelClass = [
        {key:'eco', text:'Economy', value:'ECONOMY'},
        {key:'pre', text:'Premium Economy', value:'PREMIUM_ECONOMY'},
        {key:'bus', text:'Business', value:'BUSINESS'},
        {key:'fir', text:'First class', value:'FIRST'},
    ]

    const saveOption = (e, {name, value, checked})=>{
        // Handle changes on both select boxes and radio
        // Value is avaliable on select boxes, checked on radio
        if (value) setSearchData({...searchData, [name]: value});
        if (typeof checked !== 'undefined') setSearchData({...searchData, [name]: checked});
    }

    
    const handleSubmit = ()=>{
        if (searchData.originLocationCode && searchData.destinationLocationCode && searchData.departureDate && searchData.adults){
            setLoading(true);
            amadeus.shopping.flightOffersSearch.get(searchData)
                .then(({data}) => {
                    console.log(data);
                    // clean up duplicate price options, as the API has sorted the cheapest with shortest travel time option first
                    // duplicate option is redundant
                    const cleanedData = data.filter((option, index)=>(
                        index === 0 || ((index>0) && ((option.price.grandTotal!==data[index-1].price.grandTotal)||(option.validatingAirlineCodes[0]!==data[index-1].validatingAirlineCodes[0])))
                    ));
                    setLoading(false);
                    
                    if (cleanedData.length) {
                        setSearchResult(cleanedData);
                        setOpen(false)
                    }
                    else setNoResult(true)
                }).catch((responseError) => {
                    setLoading(false);
                    setError(true);
                });
        }
    }

    return (
        <>
            <Form loading={isLoading} >
                <AirportSearch type={'Origin'} name ={'originLocationCode'} 
                    searchData={searchData} setSearchData={setSearchData}
                    amadeus={amadeus}/>
                <AirportSearch type={'Destination'} name ={'destinationLocationCode'} 
                    searchData={searchData} setSearchData={setSearchData}
                    amadeus={amadeus}/>
                <Form.Group widths='equal'>
                    <DateInput type={'Departure'} name = {'departureDate'}
                    searchData={searchData} setSearchData={setSearchData}
                    isRequired/>
                    <DateInput type={'Return'} name = {'returnDate'}
                    searchData={searchData} setSearchData={setSearchData}/>
                    <Form.Select
                        fluid
                        label={`Flight classes`}
                        options={travelClass}
                        name='travelClass'
                        placeholder='Please select an option'
                        onChange={saveOption}
                        required
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <PassengerInput type={'Adult'} name = {'adults'}
                    searchData={searchData} setSearchData={setSearchData}
                    isRequired/>
                    <PassengerInput type={'Children'} name = {'children'}
                    searchData={searchData} setSearchData={setSearchData}/>
                    <PassengerInput type={'Infants'} name = {'infants'}
                    searchData={searchData} setSearchData={setSearchData}/>
                </Form.Group>
                {/* <Form.Group widths='equal'> */}
                    
                    <Form.Checkbox 
                        name='nonStop' 
                        label={`Nonstop flight`}
                        onChange={saveOption}
                    />
                {error?(<Message negative header='Bad Request' content='Please check your request'/>):(<></>)}
                {noResult?(<Message negative header='No matches' content="There's no flights that matches your criteria"/>):(<></>)}
                <Form.Field control={Button} color = {'blue'} onClick={handleSubmit}>Submit</Form.Field>
            </Form>
            
        </>
    )
}

export default FlightSearchForm;