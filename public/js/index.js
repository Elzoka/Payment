$(document).ready(function(){
    if(window.location.search.includes('success')){
        handleSuccess('Transaction Completed');
        window.history.pushState({}, document.title, "/");

    }else if(window.location.search.includes('failure')){
        handleError('Transaction Failed');
        window.history.pushState({}, document.title, "/");
    }

    var items = ["Water", "Clothing", "Shelter", "education", "Food"],
    $text = $( '#necessities' ),
    delay = 4; //seconds

    function loop ( delay ) {
        $.each( items, function ( i, elm ){
            $text.delay( delay*1000).fadeOut();
            $text.queue(function(){
                $text.html( items[i] );
                $text.dequeue();
            });
            $text.fadeIn();
            $text.queue(function(){
                if ( i == items.length -1 ) {
                    loop(delay);   
                }
                $text.dequeue();
            });
        });
    }

    loop( delay );

    const {
        validateFullName,
        validateAmount, 
        validateCurrency, 
        validateCardName, 
        validateCardNumber, 
        validateExpirationDate,
        validateCVV,
        validateForm,
        isValidData
    } = validateHelper;    

    let data = {
        fullName: '',
        amount: '',
        number: '',
        expirationDate: '',
        cvv: '',
        name: '',
        currency: $('#currency').val()
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
        data.name = e.target.value;

        validateCardName();

    });

    $('#card-number').keyup(function(e) {
        value = e.target.value;
        data.number = e.target.value;

        validateCardNumber();

    });

    $('#expiry-date').change(function(e) {
        value = e.target.value;
        data.expirationDate = value;
        validateExpirationDate(value);
    });

    $('#cvv').keyup(function(e) {
        value = e.target.value;
        data.cvv = e.target.value;
        
        validateCVV();
    });

    function getPaymentMethod(data){
        return fetch('/paymentMethod', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if(response.status !== 200){
                    throw new Error();
                }
                return response.json();
            })
    }

    function handlePayment(data, url){
        return fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data)
        })
        .then(respond => respond.json())
    }

    function clearData(){
        data = {
            fullName: '',
            amount: '',
            number: '',
            expirationDate: '',
            cvv: '',
            name: '',
            currency: $('#currency').val('USD')
        };
        $('form').find('input').val('');
    }
    function loading(){
        $('button').prop('disabled', true).html('<img alt="loading" src="imgs/loading.gif" style="height:30px">');
    }

    function clearLoading(){
        $('button').prop('disabled', false).html('Confirm');
    }

    function handleSuccess(message){
        $('form').prepend(`<div class="alert alert-success" role="alert">${message}<span id="close" style="float: right;">x</span></div>`);
        $('.alert.alert-success').fadeIn(500);
        let closeButton = $('#close');
        closeButton.click(() => {
            closeButton.parent().remove();
        });
    }

    function handleError(message){
        clearLoading();
        $('form').prepend(`<div class="alert alert-danger" role="alert">${message}<span id="close" style="float: right;">x</span></div>`);
        $('.alert.alert-danger').fadeIn(500);
        let closeButton = $('#close');
        closeButton.click(() => {
            closeButton.parent().remove();
        });
    }


    $('form').submit(function(e) {
        e.preventDefault();
        validateForm();
        let data = {
            fullName: $('#full-name').val(),
            amount: $('#amount').val(),
            number: $('#card-number').val(),
            expirationDate: $('#expiry-date').val(),
            cvv: $('#cvv').val(),
            name: $('#card-name').val(),
            currency: $('#currency').val()
        }
        if($('.invalid-feedback').length === 0 && isValidData(data)){
            loading();
            getPaymentMethod(data).then(({paymentMethod, link: url}) => {
                switch(paymentMethod){
                    case 'braintree':
                        handlePayment(data, url)
                            .then(({success}) => {
                                clearData();
                                clearLoading();
                                if(success){
                                    handleSuccess('Transaction Completed')
                                }else{
                                    handleError('Transaction Failed');
                                }
                            });
                        break;
                    case 'paypal':
                    default:
                        handlePayment(data, url)
                            .then(({link}) => {
                                clearLoading();

                                if(link) {
                                    clearData();
                                    window.location = link;
                                }else{
                                    handleError('Invalid Inputs');
                                }
                                
                            });

                        break;
                }
            })
            .catch(e => {
                handleError('Invalid Inputs');
            })
        }else{
            handleError('Invalid Inputs');
        }
    });
});
