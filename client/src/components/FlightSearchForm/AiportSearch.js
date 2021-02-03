import React, {useState} from 'react';
import {Form} from 'semantic-ui-react';

const airports = require('airport-codes');

const AirportSearch = ({type, name, amadeus, searchData, setSearchData})=>{
    // type is for setting the name of the form, "Origin", "Destination" are 2 types
    // name is the key term in searchData, which will then be saved to be sent to API
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
                    setError(false);
                    const resultOptions = data.map((option)=>{
                        return {key: option.id, 
                            text: `${airports.findWhere({ iata: option.iataCode }).get('name')}, (${option.iataCode})`,
                            value: option.iataCode
                        }
                    });
                    setOptions(resultOptions);
                }
                else {
                    setOptions([{}]);
                    setError({ content: 'No result found' });
                }
            }).catch((responseError) => {
                console.log(responseError);
            });
        }else setError({ content: 'Please enter a location' });
    }
    const saveOption = (e,{value})=>{
        setSearchData({...searchData, [name]: value});
    }
    return (
        <Form.Group widths='equal'>
            <Form.Input 
                fluid 
                label={`${type} location`} 
                value={searchTerm}
                placeholder='Search location'
                onChange={handleChange}
                onBlur={handleSearch}
                error={error}
            />
            <Form.Select
                fluid
                label={`${type} airport`}
                options={options}
                placeholder='Please select an option'
                disabled={isDisable}
                onChange={saveOption}
            />
        </Form.Group>
            
    );
}

export default AirportSearch;