const path = require('path');
const express = require('express');
const app = express();


// parse Form DATA
app.use(express.json());

// set static folder
app.use(
    express.static(path.join(__dirname, 'public'))
);

//db
require('./db');

// routes
require('./routes')(app);

module.exports = app;
