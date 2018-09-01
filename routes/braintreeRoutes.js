const router = require('express').Router();
const {makeTransaction} = require('../lib/helpers/braintree');
const Order = require('../db/models/Order');


router.post('/checkout',(req, res) => {
    // braintree
        // create transaction with valid data
        // send success => true || false
    Order.createOrder(req.body)
        .then((order) => {
            makeTransaction(order)
                .then(result => {
                    Order
                        .findOneAndUpdate({_id: order._id}, {
                            success: result.success,
                            response: result
                        }, {new: true})
                        .select('success -_id')
                        .then(success => res.status(200).send(success))
                        .catch(e => res.status(500).send({}))
                })
                .catch(e => {
                    Order.updateOne({_id: order._id},
                        {success: false, response: null}
                    )
                    .then(() => res.status(502).send({success: false}))
                    .catch(e => res.status(500).send({}))
                });
                    
        })
        .catch(e => res.status(400).send({}));
    
});

module.exports = router;