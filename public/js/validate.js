const validateHelper = (function (){
    function validateFullName(){
        $('.fullname-error').remove();
        const fullName = $('#full-name'); 
        if(!fullName.val()){
            return fullName.after(`<div class="invalid-feedback fullname-error">You must provide your full name</div>`);
        }
    }

    function validateAmount(){
        $('.amount-error').remove();
        const amount = $('#amount');
        const value = amount.val();
        if(!value){
            return amount.after(`<div class="invalid-feedback amount-error">You must provide amount</div>`);
        }
        if(isNaN(value)){
            return amount.after(`<div class="invalid-feedback amount-error">Amount must be a number</div>`);
        }
    }


    function validateCurrency(){
        $('.currency-error').remove();
        const currency = $('#currency');
        const value = currency.val();
        if(!value){
            return currency.after(`<div class="invalid-feedback currency-error">You must provide a currency</div>`);
        }
    }

    function validateCardName(){
        $('.cardName-error').remove();
        const cardName = $('#card-name');
        if(!cardName.val()){
            return cardName.after(`<div class="invalid-feedback cardName-error">You must provide a Card name</div>`);
        }
    }

    function validateCardNumber(){
        $('.cardNumber-error').remove();
        const cardNumber = $('#card-number');
        const value = cardNumber.val();
        if(!value){
            return cardNumber.after(`<div class="invalid-feedback cardNumber-error">You must provide Card Number</div>`);
        }
        if(isNaN(value)){
            return cardNumber.after(`<div class="invalid-feedback cardNumber-error">Amount must be a number</div>`);
        }

    }
    function isValidMonth(month) {
        return (month >= 1 && month <= 12);
    };
      
    
    function isValidExpirationDate(date) {
        let [month, year] = date.split('/');
        var today = new Date();
        var currentMonth = (today.getMonth() + 1);
        var currentYear = "" + today.getFullYear();
    
        if (("" + year).length == 2) {
            year = currentYear.substring(0, 2) + "" + year;
        }
    
        currentMonth = parseInt(currentMonth);
        currentYear = parseInt(currentYear);
        month = parseInt(month);
        year = parseInt(year);
    
        return isValidMonth(month)
            && ((year > currentYear) || (year == currentYear && month >= currentMonth));
    };

    function validateExpirationDate(){
        $('.date-error').remove();
        const expirationDate = $('#expiry-date');

        if(!expirationDate.val()){
            return expirationDate.after(`<div class="invalid-feedback date-error">You must provide a date</div>`);
        }

        if(!isValidExpirationDate(expirationDate.val())){
            return expirationDate.after(`<div class="invalid-feedback date-error">You must provide a valid date</div>`);
        }

    }

    function validateCVV(){
        $('.cvv-error').remove();
        const cvv = $('#cvv');
        if(!cvv.val()){
            return cvv.after(`<div class="invalid-feedback cvv-error">You must provide a value</div>`);
        }
    }

    function isValidData(data){
        let errors = [];
        for(let key in data){
            if(!data[key]){
                errors.push(key);
            }
        }
        return !errors.length;
    }

    function validateForm(){
        validateFullName();
        validateAmount();
        validateCurrency();
        validateCardName();
        validateCardNumber();
        validateExpirationDate();
        validateCVV();
    };

    return {
        validateFullName,
        validateCurrency,
        validateAmount,
        validateCardName,
        validateCardNumber,
        validateExpirationDate,
        validateCVV,
        validateForm,
        isValidData
    }
})();