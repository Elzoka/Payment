const {getCardType, isValidCreditNumber, isValidCurrency, isValidCVV, isValidExpirationDate} = require('../../../lib/helpers/validateData');

describe('Validate Data helpers', () => {
    const examples = {
        Mastercard: "5500 0000 0000 0004", 
        AMEX: "3400 0000 0000 009",
        Discover: "6011 0000 0000 0004",
        Visa: "4111 1111 1111 1111"
    }

    describe('getCardType()', () => {
        test('should return Mastercard', () => {
            expect(getCardType(examples["Mastercard"])).toEqual('Mastercard')
        });

        test('should return AMEX', () => {
            expect(getCardType(examples["AMEX"])).toEqual('AMEX')
        });

        test('should return Discover', () => {
            expect(getCardType(examples["Discover"])).toEqual('Discover')
        });

        test('should return Visa', () => {
            expect(getCardType(examples["Visa"])).toEqual('Visa')
        });
    });

    describe('isValidCreditNumber', () => {
        test('should be valid', () => {
            let validCards = ["378282246310005", "5610591081018250", "3530111333300000", "4012888888881881"]
            validCards.forEach((number) => expect(isValidCreditNumber(number)).toBe(true));
        });
    });

    describe('isValidCVV()', () => {
        describe('should be valid', () => {
            test('when 3 numbers', () => {
                let validCVV = ['123', '999'];
                validCVV.forEach(cvv => expect(isValidCVV(cvv)).toBe(true));
            });
            test('when 4 numbers', () => {
                let validCVV = ['1234', '9997'];
                validCVV.forEach(cvv => expect(isValidCVV(cvv)).toBe(true));
            });
        })
        describe('should be invalid', () => {
            test('when more than 4 numbers', () => {
                let validCVV = ['12354', '99977'];
                validCVV.forEach(cvv => expect(isValidCVV(cvv)).toBe(false));
            });
        })
    });
    describe('isValidExpirationDate()', () => {
        describe('should be valid expiration date', () => {
            test('when an future date is provided', () => {
                
                let validDates = ['02/21', '10/2026', '11/2018'];
                validDates.forEach(date => expect(isValidExpirationDate(date)).toBe(true));
            });
        });

        describe('should be valid expiration date', () => {
            test('when an past date is provided', () => {
                let validDates = ['02/11', '10/2013'];
                validDates.forEach(date => expect(isValidExpirationDate(date)).toBe(false));
            });
            test('when an invalid month is provided', () => {
                let validDates = ['13/21', '00/2023'];
                validDates.forEach(date => expect(isValidExpirationDate(date)).toBe(false));
            });
        });
    });
    
    describe('isValidCurrency()', () => {
        
        test('should return currency is valid', () => {            
            const availableCurrencies = ['USD', 'EUR', 'THB', 'HKD', 'SGD', 'AUD'];
            availableCurrencies.forEach(currency => expect(isValidCurrency(currency)).toBe(true));
        });

        test('should return currency is not valid', () => {            
            const inAvailableCurrencies = ['EGP', 'JPY', 'GBP', 'CAD'];
            inAvailableCurrencies.forEach(currency => expect(isValidCurrency(currency)).toBe(false));
        });
        
    });
    
});