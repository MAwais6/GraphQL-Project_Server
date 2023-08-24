const express = require('express');
const colors = require('colors');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();
const port = process.env.PORT || 5000;

// import mongoose connection
const { connectDB } = require('./models/index.model');

// import Schema files 
const schema = require('./schema/schemaMongodb');

// initialize express
const app = express();

// mongoose connection
connectDB();

// 
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});