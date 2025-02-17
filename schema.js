const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    city: String!
    website: String!
    zipCode: String!
    phone: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      city: String!
      website: String!
      zipCode: String!
      phone: String!
    ): User
  }
`;

module.exports = typeDefs;
