const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const Order = require('../../db/models/Order');
const {mongoURI} = require('../../config');


beforeAll(async () => {
    await mongoose.connect(mongoURI, {useNewUrlParser: true});
});
    
afterAll((done) => {
    mongoose.connection.db.dropDatabase().then(() => {
        mongoose.disconnect(done);
    });
});


describe('Paypal Routes', () => {
    describe('/payment POST', () => {
        beforeEach(async () => {
            await Order.remove({})
        })
        test('should return status of 200 when valid data is provided', async () => {
            let order = {
                _id: mongoose.Types.ObjectId(),
                number: "4111111111111111",
                fullName: 'Mahmoud Elzoka',
                name: 'Mahmoud',
                cvv: '123',
                expirationDate: '02/21',
                currency: 'USD',
                amount: '10'
            }
            await request(app)
                .post('/paypal/payment')
                .send(order)
                .expect(200)
                .expect(res => {
                    expect(res.body).toHaveProperty('link');
                    Order
                        .findOne({_id: order._id})
                        .then(newOrder => {
                            expect(newOrder.number).toEqual(order.number);
                            expect(newOrder.name).toEqual(order.name);
                            expect(newOrder.fullName).toEqual(order.fullName);
                            expect(newOrder.cvv).toEqual(order.cvv);
                            expect(newOrder.expirationDate).toEqual(order.expirationDate);
                            expect(newOrder.currency).toEqual(order.currency);
                            expect(newOrder.amount == order.amount).toBe(true);
                            expect(newOrder.cardType).toBeTruthy();
                        })
                });
        });
        test('should return status of 400 when invalid data is provided', async () => {
            let order = {
                _id: mongoose.Types.ObjectId(),
                number: "4111111111111111",
                fullName: 'Mahmoud Elzoka',
                name: 'Mahmoud',
                cvv: '123',
                expirationDate: '02/21',
                currency: 'USD',
                amount: '10'
            }
            order.number = order.number + "1";
            await request(app)
                .post('/paypal/payment')
                .send(order)
                .expect(400)
                .expect(res => {
                    Order
                        .findOne({_id: order._id})
                        .then(newOrder => {
                            expect(newOrder).toBeNull();
                        })
                });
        });
    });
});