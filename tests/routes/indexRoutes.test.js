const request = require('supertest');

const app = require('../../app');

describe('indexRoutes', () => {
    describe('/paymentMethod POST', () => {
        let payment;
        // currency number
        beforeEach(() => {
            payment = {
                number: '4111111111111111',
                currency: 'USD'
            };
        })

        const links = {
            paypal: '/paypal/payment',
            braintree: '/braintree/checkout'
        }

        test('should return paymentMethod paypal', async () => {
            await request(app)
                .post('/paymentMethod')
                .send(payment)
                .expect(200)
                .expect(res => {
                    expect(res.body).toHaveProperty('link', links["paypal"]);
                    expect(res.body).toHaveProperty('paymentMethod', "paypal");
                });
        });

        test('should return paymentMethod braintree', async () => {
            payment.currency = "THB"
            await request(app)
                .post('/paymentMethod')
                .send(payment)
                .expect(200)
                .expect(res => {
                    expect(res.body).toHaveProperty('link', links["braintree"]);
                    expect(res.body).toHaveProperty('paymentMethod', "braintree");
                });
        });

        test('should return status of 400 when invalid card number is provided', async () => {
            payment.number = '41111111111111111';

            await request(app)
                .post('/paymentMethod')
                .send(payment)
                .expect(400);
        });

        test('should return status of 400 when AMEX && !USD', async () => {
            payment.number = '378282246310005';
            payment.currency = "EUR";

            await request(app)
                .post('/paymentMethod')
                .send(payment)
                .expect(400);
        });
    });
});