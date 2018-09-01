const {URL} = require('../../config')
const paypal = require('paypal-rest-sdk');
module.exports = {
    createPayment({currency, amount}){
        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `${URL}/paypal/success`,
                "cancel_url": `${URL}/paypal/fail`
            },
            "transactions": [{
                "amount": {
                    "currency": `${currency}`,
                    "total": `${amount}`
                },
                "description": "create payment with paypal for the assignment."
            }]
        };

        return new Promise((resolve, reject) => {
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    reject(error);
                } else {         
                    var links = payment.links;
                    const link = links.find(el => el.rel === 'approval_url');
                    resolve({link: link.href, id: payment.id});
                }
            });    
        });
    },
    executePayment(payerId, paymentId){
        var execute_payment_json = {
            payer_id: payerId
        };
        
        return new Promise((resolve, reject) => {
            paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                if (error) {
                    reject(error);
                } else {
                    resolve(payment);
                }
            });
        });
    }
}

