import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Auth from './utils/auth';

import Home from "./pages/Content";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Nav from "./components/Nav";
// import OrderHistory from "./pages/OrderHistory";


const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <nav className="navbar navbar-dark bg-dark d-flex justify-content-between align-items-end">
          <h1 className="p-2 text-light m-0">Trip Planner</h1>
          {Auth.loggedIn() && <button className=" text-light btn btn-dark" onClick={()=>{console.log('logged out')}} >Logout</button>}
          
      </nav>
      <Home/>
    </ApolloProvider>

  );
}

export default App;
