const { gql } = require('apollo-server-express');

const typeDefs = gql`

  input TripInput {
    title: String!
    startDate: String!
    endDate: String!
    goal: String
  }

  type Flight {
    _id: ID
    airline: String
    departure: String
    return: String
    stops: Int
    duration: String
    cost: Int
    people: Int
  }

  type Hotel {
    _id: ID
    name: String
    startDate: String
    endDate: String
    cost: Int
    rooms: Int
  }

  type Trip {
    _id: ID
    title: String
    startDate: String
    endDate: String
    goal: String
    flights: [Flight]
    hotels: [Hotel]
    totalCost: Int
  }
  
  type User {
    _id: ID
    username: String
    email: String
    trips: [Trip]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me:User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    checkUsername(username: String!): Boolean
    checkEmail(email: String!): Boolean
    addTrip(tripData: TripInput!): User
  }
`;

module.exports = typeDefs;
