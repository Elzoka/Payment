const braintree = require('braintree');

let {braintree: {environment, merchantId, publicKey, privateKey}} = require('../../config');
let gateway = braintree.connect({
    environment: braintree.Environment[environment],
    merchantId,
    publicKey,
    privateKey
});

module.exports = gateway;