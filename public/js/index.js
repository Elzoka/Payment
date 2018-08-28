$(document).ready(function(){
    const {
        validateFullName,
        validateAmount, 
        validateCurrency, 
        validateCardName, 
        validateCardNumber, 
        validateExpirationDate,
        validateCCV,
        validateForm,
        isValidData
    } = validateHelper;    

    let data = {
        fullName: '',
        amount: '',
        creditCard: {
            number: '',
            expirationMonth: '',
            expirationYear: '',
            ccv: ''
        }
    };
    

    $('#full-name').keyup(function(e) {
        value = e.target.value
        data.fullName = value;
        validateFullName();

    });

    $('#amount').keyup(function(e) {
        value = e.target.value;
        data.amount = e.target.value;

        validateAmount();
    });

    $('#currency').keyup(function(e) {
        value = e.target.value;
        data.currency = e.target.value;

        validateCurrency();
    });

    $('#card-name').keyup(function(e) {
        value = e.target.value;
        data.creditCard.name = e.target.value;

        validateCardName();

    });

    $('#card-number').keyup(function(e) {
        value = e.target.value;
        data.creditCard.number = e.target.value;

        validateCardNumber();

    });

    $('#expiry-date').keyup(function(e) {
        value = e.target.value;
        if(value.length == 2 && e.keyCode !== 8) $(this).val(value + '/');
        const expiryDate = value.split('/');
        const month = expiryDate[0];
        const year = expiryDate[1];

        validateExpirationDate();

        data.creditCard.expirationMonth = month;
        data.creditCard.expirationYear = year;
    });

    $('#ccv').keyup(function(e) {
        value = e.target.value;
        data.creditCard.ccv = e.target.value;
        
        validateCCV();
    });



    $('form').submit(function(e) {
        e.preventDefault();
        validateForm();

        if($('.invalid-feedback').length === 0 && isValidData(data)){
            fetch('/pay', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(payload => {
                data = {
                    fullName: '',
                    amount: '',
                    creditCard: {
                        number: '',
                        expirationMonth: '',
                        expirationYear: '',
                        ccv: ''
                    }
                };
                $('form').find('input').val('');
            })    
        }
        
    });
});
