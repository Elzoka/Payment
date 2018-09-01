module.exports = {
    URL: "http://localhost:3000",
    paypal: {
        mode: 'sandbox',
        client_id: 'AYqrsJ53fQZy250UM3IBI8BwHCij41fPZbNtILOVumAbl86pzsGGEONHFRhcC0c7E75Kjpe_4z8w8_Gl',
        client_secret: 'EGBxhNwTu3mjGCsSCxBF90Xs5WvH2XX0tn_lRI3JayCLONqOqazNmysa7kIhs8KssY-Z7XFcGw8zY95X'
    },
    braintree: {
        environment: 'Sandbox',
        merchantId: "bp8nbqcj74kv3gbk",
        publicKey: "tfw5p37xzfjhxyfj",
        privateKey: "30a31c2ba306294edcfe9b435b84a67a"
    },
    mongoURI: 'mongodb://localhost/payment_test'
}