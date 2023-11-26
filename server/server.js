// import necessary modules
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
//todo import schema

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/vibe-check');
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

app.use('/graphql', graphqlHTTP({
    //todo add schema
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
});