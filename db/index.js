const mongoose = require('mongoose');
const {mongoURI} = require('../config');

if(mongoURI !== 'test'){
    mongoose.connect(mongoURI, {useNewUrlParser: true});
}