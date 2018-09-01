const paypal = require('paypal-rest-sdk'); 
const {paypal: {mode, client_id, client_secret}} = require('../../config/index');
// configure paypal 
paypal.configure({
    mode, //sandbox or live
    client_id,
    client_secret
});