import React, {useState} from 'react';
import { Form, Button, Message } from 'semantic-ui-react'
import AirportSearch from '../CustomFields/AiportSearch';
import DateInput from '../CustomFields/DateInput';
import NumberInput from '../CustomFields/NumberInput';

const HotelSearchForm = ({amadeus, setSearchResult, setOpen})=>{
    const [searchData, setSearchData] = useState({radius:'20' ,currencyCode:'USD'});
    // The object that'll hold all the query parameter. Preset to at most 20km away from airport
    const [isLoading, setLoading]=useState(false);
    // State to display if the form is loading

    const [error,setError]=useState(false);
    const [noResult,setNoResult]=useState(false);
    // States to let user knows if there's any error

    const handleSubmit = ()=>{
        // if (searchData.originLocationCode && searchData.destinationLocationCode && searchData.departureDate && searchData.adults){
        //     setLoading(true);
        //     amadeus.shopping.flightOffersSearch.get(searchData)
        //         .then(({data}) => {
        //             console.log(data);
        //             // clean up duplicate price options, as the API has sorted the cheapest with shortest travel time option first
        //             // duplicate option is redundant
        //             const cleanedData = data.filter((option, index)=>(
        //                 index === 0 || ((index>0) && ((option.price.grandTotal!==data[index-1].price.grandTotal)||(option.validatingAirlineCodes[0]!==data[index-1].validatingAirlineCodes[0])))
        //             ));
        //             setLoading(false);
                    
        //             if (cleanedData.length) {
        //                 setSearchResult(cleanedData);
        //                 setOpen(false)
        //             }
        //             else setNoResult(true)
        //         }).catch((responseError) => {
        //             setLoading(false);
        //             setError(true);
        //         });
        // }
        console.log(searchData);
    }

    return (
        <>
            <Form loading={isLoading} >
                <AirportSearch type={'Arrival'} name ={'cityCode'} 
                    searchData={searchData} setSearchData={setSearchData}
                    amadeus={amadeus}/>
                <Form.Group widths='equal'>
                    <DateInput type={'Check in'} name = {'checkInDate'}
                    searchData={searchData} setSearchData={setSearchData}
                    isRequired/>
                    <DateInput type={'Check out'} name = {'checkOutDate'}
                    searchData={searchData} setSearchData={setSearchData}
                    isRequired/>
                </Form.Group>
                <Form.Group widths='equal'>
                    {/* <NumberInput type={'Maximum distance from airport (miles)'} name = {'radius'}
                    searchData={searchData} setSearchData={setSearchData}
                    isRequired/> */}
                    <NumberInput type={'Number of guests'} name = {'adults'}
                    searchData={searchData} setSearchData={setSearchData}
                    isRequired/>
                    <NumberInput type={'Number of rooms'} name = {'roomQuantity'}
                    searchData={searchData} setSearchData={setSearchData}
                    isRequired/>
                </Form.Group>
                {/* <Form.Group widths='equal'> */}
                    
                {error?(<Message negative header='Bad Request' content='Please check your request'/>):(<></>)}
                {noResult?(<Message negative header='No matches' content="There's no hotel offer that matches your criteria"/>):(<></>)}
                <Form.Field control={Button} color = {'blue'} onClick={handleSubmit}>Submit</Form.Field>
            </Form>
            
        </>
    )
}

export default HotelSearchForm;