const {paymentMethod, validatePayment, toUSD} = require('../../../lib/helpers/payment');


describe('Payment helpers', () => {
    describe('paymentMethod()', () => {
        // payment is Paypal
        // cardType => AMEX && currency => USD
        // currency => USD, EUR, AUD
        describe('should return paypal', () => {
            let rightMethod = 'paypal'
            test('when cardType is AMEX && currency is USD', () =>{
                const method = paymentMethod({cardType: "AMEX",currency: "USD"});
                expect(method).toEqual(rightMethod);
            });

            test('when currency is USD', () =>{
                const method = paymentMethod({cardType: "Visa",currency: "USD"});
                expect(method).toEqual(rightMethod);
            });
            test('when currency is EUR', () =>{
                const method = paymentMethod({cardType: "Visa",currency: "EUR"});
                expect(method).toEqual(rightMethod);
            });
            test('when currency is AUD', () =>{
                const method = paymentMethod({cardType: "Visa",currency: "AUD"});
                expect(method).toEqual(rightMethod);
            });
        });
        // otherwise, payment is Braintree 
        describe('should return braintree', () => {
            let rightMethod = 'braintree'
            test('currency is THB', () =>{
                const method = paymentMethod({cardType: "Visa",currency: "THB"});
                expect(method).toEqual(rightMethod);
            });

            test('when currency is HKD', () =>{
                const method = paymentMethod({cardType: "Visa",currency: "HKD"});
                expect(method).toEqual(rightMethod);
            });
            test('when currency is SGD', () =>{
                const method = paymentMethod({cardType: "Visa",currency: "SGD"});
                expect(method).toEqual(rightMethod);
            });
        });
    });
    describe('validatePayment()', () => {
        let card = {
            cardType: "AMEX",
            currency: 'USD'
        }
        test('return error property of null when payment Card type is AMEX and currency is USD', () =>{
            const payment = validatePayment(card);
            expect(payment).toHaveProperty('isValid', true);
            expect(payment).toHaveProperty('error', null);
        })
        test('return errors when Card type is AMEX and currency isn\'t USD', () => {
            card.currency = 'EUR';
            const payment = validatePayment(card);
            expect(payment).toHaveProperty('isValid', false);
            expect(payment).toHaveProperty('error', 'AMEX is only available with USD currency');
        });
    });
    describe('toUSD', () => {
        let amount = 10;
        let convert = {
            EUR: 11.7,
            THB: 0.30,
            HKD: 1.3,
            SGD: 7.3,
            AUD: 7.3 
        };

        test('should return 11.7 USD when EUR is provided currency', () =>{
            let currency = "EUR"
            const usd = toUSD(amount, currency);
            expect(usd).toEqual(convert[currency])
        });

        test('should return 0.30 USD when THB is provided currency', () =>{
            let currency = "THB"
            const usd = toUSD(amount, currency);
            expect(usd).toEqual(convert[currency])
        });

        test('should return 1.3 USD when HKD is provided currency', () =>{
            let currency = "HKD"
            const usd = toUSD(amount, currency);
            expect(usd).toEqual(convert[currency])
        });

        test('should return 7.3 USD when SGD is provided currency', () =>{
            let currency = "SGD"
            const usd = toUSD(amount, currency);
            expect(usd).toEqual(convert[currency])
        });

        test('should return 7.3 USD when AUD is provided currency', () =>{
            let currency = "AUD"
            const usd = toUSD(amount, currency);
            expect(usd).toEqual(convert[currency])
        });

        test('should return 10 USD when invalid currency is provided', () =>{
            let currency = "invalid"
            const usd = toUSD(amount, currency);
            expect(usd).toEqual(amount);
        });


    })
});