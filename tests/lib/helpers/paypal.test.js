const {createPayment} = require('../../../lib/helpers/paypal');

describe('Paypal helpers', () => {
    let data;
    describe('Create Payment', () => {
        test('should return a link', async () => {
            data = {
                currency: 'USD',
                amount: '1'
            };
            createPayment(data)
                .then(payment => {
                    expect(payment).toHaveProperty('link');
                    expect(payment).toHaveProperty('id');
                });
        });
    });
});