module.exports = {
    paymentMethod({cardType, currency}) {
        return ((cardType === 'AMEX' || ['USD', 'EUR', 'AUD'].includes(currency)) ? 'paypal' : 'braintree')
    },
    validatePayment({cardType, currency}){
        if(cardType === 'AMEX' && currency !== 'USD'){
            return {
                isValid: false,
                error: 'AMEX is only available with USD currency'
            }
        }
        return {
            isValid: true,
            error: null
        }
    },
    toUSD(amount, currency){
        // (USD, EUR, THB, HKD, SGD, AUD)
        let usd;
        switch(currency){
            case 'EUR':
                usd = amount * 1.17;
                break;
            case 'THB':
                usd = amount * 0.030;
                break;
            case 'HKD':
                usd = amount * 0.13 ;
                break;
            case 'SGD':
                usd = amount * 0.73 ;
                break;
            case 'AUD':
                usd = amount * 0.73 ;
                break;
            default:
                usd = amount;
                break;
        }
        return usd;
    }
}