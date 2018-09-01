const {makeTransaction} = require('../../../lib/helpers/braintree');

describe('Braintree helpers', () => {
    let transaction;
    describe('should create transaction', () => {
        test('return success equal to true', async () => {
            transaction = {
                amount: 1,
                currency: "USD",
                expirationDate: '02/21',
                number:"4111111111111111",
                cvv: "123"
            }
            const res = await makeTransaction(transaction); 
            expect(res.success).toBe(true);
        });
    })

    describe('should return errors', () => {
        test('when invalid number', async () => {
            transaction = {
                amount: 1,
                currency: "USD",
                expirationDate: '02/21',
                number:"41111111111111115",
                cvv: "123"
            }
            const res = await makeTransaction(transaction); 
            expect(res.errors).toBeTruthy();
        });
        test('when invalid currency', async () => {
            transaction = {
                amount: 1,
                currency: "NO",
                expirationDate: '02/21',
                number:"4111111111111111",
                cvv: "123"
            }
            const res = await makeTransaction(transaction); 
            expect(res.errors).toBeTruthy();
        });
        test('when invalid cvv', async () => {
            transaction = {
                amount: 1,
                currency: "USD",
                expirationDate: '02/21',
                number:"4111111111111111",
                cvv: "123456"
            }
            const res = await makeTransaction(transaction); 
            expect(res.errors).toBeTruthy();
        });
        test('when invalid amount', async () => {
            transaction = {
                amount: null,
                currency: "USD",
                expirationDate: '02/21',
                number:"4111111111111111",
                cvv: "123"
            }
            const res = await makeTransaction(transaction); 
            expect(res.errors).toBeTruthy();
        });
    })
});