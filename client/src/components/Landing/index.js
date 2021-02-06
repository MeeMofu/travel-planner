import React from 'react';
import Login from './Login';
import Signup from './Signup';


const Landing = () => {
    return (<>
        <div className="container">
          <div style={{marginTop : '80px'}} className={'jumbotron text-center'}>
            <h1 className={"display-4"}>Trip Planner <span role={"img"} aria-label={"Memo"}>✈️</span></h1>
            <h4 className={"mt-4 pb-4"}>Plan your future trips now!</h4>
            <Login />
            <Signup />
          </div>
        </div>
    </>)
}

export default Landing;