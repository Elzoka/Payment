const router = require('express').Router();
const url = require('url');
require('../lib/gateways/paypal');

const {createPayment, executePayment} = require('../lib/helpers/paypal');
const Order = require('../db/models/Order');

router.post('/payment',(req, res) => {
    // paypal
        // create payment with valid data
        // send link to client -> redirect to paypal -> redirect to / with query string

    Order.createOrder(req.body)
        .then(order => {
            createPayment(order)
                .then(({link, id}) => {
                    let query = url.parse(link, true).query;
                    order.token = query.token;
                    order.orderId = id;
                    order
                        .save()
                        .then()
                        .catch(e => res.status(500).send({}))
                    res.status(200).send({link});
                })
                .catch(e => res.status(502).send({}))
        })
        .catch(e => res.status(400).send({}))

});

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    // execute transaction
    // redirect to / with query success
    executePayment(payerId, paymentId)
        .then(payment => {
            Order.updateOne({orderId: payment.id}, {
                success: true,
                response: payment
            })
            .then()
            .catch(e => console.log(e));

            res.redirect('/?p=success')
            
        })

});

router.get('/fail', (req, res) => {
    try{
        Order.updateOne({token: req.query.token}, {success: false, response: null})
        .then()
        .catch(e => console.log(e));
    }catch(e){

    }

    // redirect to / with query fail
    res.redirect('/?p=failure');
});


module.exports = router;