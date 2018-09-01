function getCardType(number){
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // Mastercard 
    // Updated for Mastercard 2017 BINs expansion
     if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) 
        return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";

    return "";
}

function isValidCreditNumber(number){
    // takes the form field value and returns true on valid number

    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(number)) return false;

    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0, nDigit = 0, bEven = false;
    number = number.replace(/\D/g, "");

    for (var n = number.length - 1; n >= 0; n--) {
        var cDigit = number.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) == 0;
}

function isValidCVV(cvv){
    let re = new RegExp(/^[0-9]{3,4}$/);
    return (!!cvv && cvv.match(re) != null)
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



function isValidCurrency(currency){
    const availableCurrencies = ['USD', 'EUR', 'THB', 'HKD', 'SGD', 'AUD'];

    return (!!currency && availableCurrencies.includes(currency));
}


module.exports = {
    isValidCreditNumber,
    isValidExpirationDate,
    isValidCVV,
    isValidCurrency,
    getCardType
};