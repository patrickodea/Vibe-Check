// import necessary modules
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schemas/userSchema');
const root = require('./schemas/userResolvers');

const User = require('./models/User');

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/vibe-check');
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

//! change the schema to userSchema if other schemas are added
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
});