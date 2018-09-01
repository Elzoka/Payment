const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const {mongoURI} = require('./config')

// parse Form DATA
app.use(express.json());

// set static folder
app.use(
    express.static(path.join(__dirname, 'public'))
);

mongoose.connect(mongoURI, {useNewUrlParser: true});

// routes
require('./routes')(app);

module.exports = app;
