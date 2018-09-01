module.exports = (app) => {
    app.use('/paypal', require('./paypalRoutes'));
    app.use('/braintree', require('./braintreeRoutes'));
    app.use('/', require('./indexRoutes'));
    
};