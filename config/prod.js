module.exports = {
    URL: process.env.URL,
    paypal: {
        mode: process.env.MODE,
        client_id: process.env.PAYPAL_CLIENT_ID,
        client_secret: process.env.PAYPAL_CLIENT_SECRET
    },
    braintree: {
        environment: process.env.BRAINTREE_ENVIRONMENT,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY
    },
    mongoURI: process.env.MONGODB_URI
}