import React, {useState} from 'react';
import {Form} from 'semantic-ui-react';

const airports = require('airport-codes');

const AirportSearch = ({type, name, amadeus, searchData, setSearchData})=>{
    // type is for setting the name of the form, "Origin", "Destination" are 2 types
    // name is the key term in searchData, which will then be saved to be sent to API
    // searchData is the object to query to amadeus
    const [options, setOptions] = useState([{}]);
    const [isDisable, setDisable] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // term to query to amadeus
    const [error,setError] = useState(false);

    const handleChange =(e,{value})=>{
        setSearchTerm(value);
        setError(false);
        if (value) setDisable(false);
        if (!value) setDisable(true);
        setOptions([{}]);
    }
    const handleSearch = ()=>{
        if (searchTerm) {
            // setLoading(true);
            amadeus.referenceData.locations.get({
                keyword : searchTerm,
                subType : 'AIRPORT'
            }).then(({data})=>{
                if (data.length){
                    console.log(data)
                    setError(false);
                    try {
                        // Try to if it can map the result
                        const resultOptions = data.map((option)=>{
                            return {key: option.id, 
                                text: `${airports.findWhere({ iata: option.iataCode }).get('name')} (${option.iataCode})`,
                                value: option.iataCode
                            }
                        });  
                        setOptions(resultOptions);
                    } catch (error) {
                        // If the search result can't be found, let user know
                        setError({ content: 'No airport found with this search term' })
                        
                    }
                }
                else {
                    setOptions([{}]);
                    setError({ content: 'No result found' });
                    setSearchData({...searchData, [name]: false});
                    // The data is set to false fo that it can be check easily
                }
            }).catch((responseError) => {
                console.log(responseError);
            });
        }else setError({ content: 'Please enter a location' });
    }
    const saveOption = (e,{value})=>{
        // Save the option to the search data
        setSearchData({...searchData, [name]: value});
    }
    return (
        <Form.Group widths='equal'>
            <Form.Input 
                fluid 
                label={`${type} location`} 
                value={searchTerm}
                placeholder='Search airport'
                onChange={handleChange}
                onBlur={handleSearch}
                error={error}
                required
            />
            <Form.Select
                fluid
                label={`${type} airport`}
                options={options}
                placeholder='Please select an option'
                disabled={isDisable}
                onChange={saveOption}
                required
            />
        </Form.Group>
            
    );
}

export default AirportSearch;