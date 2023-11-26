const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type User {
        id: ID!
        email: String!
        password: String!
        spotifyAccountLink: String
    }

    type Query {
        user(id: ID!): User
        users: [User]
    }

    type Mutation {
        createUser(email: String!, password: String!, spotifyAccountLink: String): User
    }
`);

module.exports = schema;