const typeDefs = `
    type User {
        id: ID!
        email: String!
        password: String!
        spotifyAccountLink: String
        token: String
    }

    type Query {
        user(id: ID!): User
        users: [User]
        userExists(email: String!): User
        me: User
    }

    type Mutation {
        createUser(email: String!, password: String!, spotifyAccountLink: String): User
        loginUser(email: String!, password: String!): User
    }
`

module.exports = typeDefs;