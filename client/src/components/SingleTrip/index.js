import React,{useState,useEffect} from 'react';
import moment from 'moment';
import FlightSearchForm from '../FlightSearch';
import HotelSearchForm from '../HotelSearch';
import DisplayList from '../DisplayList';
import {Divider,Popup, Button} from 'semantic-ui-react';

const SingleTrip = ({trip, amadeus}) => {
    
    const {_id,title,startDate,endDate,goal,totalCost} = trip;
    const [searchResult, setSearchResult] = useState([]);
    const [isVisible, setVisible] = useState(false);

    // Temporary popup
    const [open, setOpen] = useState(false)
    
    useEffect(()=>{
      (searchResult.length)? setVisible(true): setVisible(false)
    },[searchResult]);
    
    return (
        <>
        <div className={"card text-left my-4"}>
            <div className={"card-header"}>
                <div className={"d-flex justify-content-between m-0"}>
                    <h2>{title}</h2>
                    <div>
                    <Popup
                        content='Will be added later'
                        on='click'
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        position='bottom right'
                        trigger={<Button circular icon='trash'/>}
                    />
                    </div>
                </div>
                <div>{`${moment(startDate,"YYYY MM DD").format("ll")} to ${moment(endDate,"YYYY MM DD").format("ll")}`}</div>
            </div>
            <div className={"card-body"}>
                <div><span style={{fontWeight: 'bold'}}>Total Cost: </span> {totalCost}</div>
                {goal? <p className={"pt-2"}><span style={{fontWeight: 'bold'}}>Goals: </span>{goal}</p>:<></>}
                <Divider horizontal>+ Add to your trip</Divider>
                <div className={"text-center"}>
                    <FlightSearchForm amadeus={amadeus} setSearchResult={setSearchResult}/>
                    <HotelSearchForm amadeus={amadeus} setSearchResult={setSearchResult}/>
                </div>
                

                {isVisible?(<DisplayList contentList={searchResult} amadeus={amadeus}/>):(<></>)}
            </div>
        </div>
        
        </>
    )
}

export default SingleTrip