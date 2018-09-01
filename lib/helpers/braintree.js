const gateway = require('../gateways/braintree');
const {toUSD} = require('../helpers/payment');

module.exports = {
    makeTransaction(data){
        let {amount, currency, expirationDate, number, cvv} = data;

        amount = toUSD(amount, currency);
        return new Promise((resolve, reject) => {
            gateway.transaction.sale({
                amount,
                creditCard: {
                    number,
                    expirationDate,
                    cvv
                },
                options: {
                    submitForSettlement: true
                }
            }, function(error, result) {
                if (result) {
                    resolve(result);    
                } else {
                    reject(error)
                }
            });
        });
    }
}