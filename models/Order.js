const mongoose = require('mongoose');
const {Schema} = mongoose;

const {getCardType, isValidCreditNumber, isValidCurrency, isValidCVV, isValidExpirationDate} = require('../lib/helpers/validateData');

const OrderSchema = new Schema({
    cardType: {
        type: String,
    },
    number: {
        type: String,
        required: true,
        validate: isValidCreditNumber
    },
    orderId: {
        type: String
    },
    fullName: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true,
        validate: isValidCVV
    },
    expirationDate:{
        type:String,
        required: true,
        validate: isValidExpirationDate
    },
    currency: {
        type: String,
        default: 'USD',
        required: true,
        validate: isValidCurrency
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    token: {
        type: String
    },
    success: {
        type: Boolean,
        default: null
    },
    response: {
        type: Object
    }
});

// OrderSchema.pre('save', function(next){
//     if(this.isModified('number')){
//         this.cardType = getCardType(this.number);
//     }
//     next();
// });

OrderSchema.statics.createOrder = function(data){
    const {name, fullName, number, cvv, expirationDate, currency, amount, id, token} = data;
    const Order = this;
        // create Order object, validate it and save it database then make order
    return Order.create({
        cardType: getCardType(number),
        orderId: id,
        number,
        fullName,
        name,
        cvv,
        expirationDate,
        currency,
        amount,
        token
    })
}


module.exports = mongoose.model('order', OrderSchema);

