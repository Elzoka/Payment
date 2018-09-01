module.exports = {
    URL,
    paypal: {
        mode: 'sandbox',
        client_id,
        client_secret
    },
    braintree: {
        environment: 'Sandbox',
        merchantId,
        publicKey,
        privateKey
    },
    mongoURI: 'mongodb://localhost/payment'
}