const router = require('express').Router();
const path = require('path');

const {validatePayment, paymentMethod} = require('../lib/helpers/payment');
const {isValidCreditNumber, getCardType} = require('../lib/helpers/validateData');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.post('/paymentMethod',(req, res) => {
    // determine whether to use paypal or braintree 

    if(!isValidCreditNumber(req.body.number)){
        return res.status(400).send({});
    };

    req.body.cardType = getCardType(req.body.number)

    const card = req.body;
    const payment = validatePayment(card);
    let link;
    if(payment.isValid){
        let payMethod = paymentMethod(card); 
        switch(payMethod){
            case 'paypal':
                link = `/paypal/payment`;
                break;
            case 'braintree':
                link = `/braintree/checkout`;
                break;
        }

        return res.status(200).send({
            paymentMethod: payMethod,
            link
        });
    }
    res.status(400).send({});
});

module.exports = router;