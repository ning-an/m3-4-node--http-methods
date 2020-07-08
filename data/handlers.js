const { stock, customers } = require("./promo");

const isRepeat = (data) => {
    const {givenName, surname, email, address} = data;
    let res = false;
    customers.forEach( customer => {
        if ((givenName === customer.givenName && surname === customer.surname)
            || email === customer.email
            || address === customer.address) {
                res = true;
            }
    }) 
    return res;
}

const isMissingData = (data) => {
    const {order, size} = data;
    return order === 'undefined' || (order.toLowerCase() === 'shirt' && size === 'undefined');
}

const isUndeliverable = (data) => {
    return data.country.toLowerCase() !== 'canada';
}

const outOfStock = (data) => {
    const {order, size} = data
    const numOfStock = stock[order.toLowerCase()];
    if (typeof numOfStock !== 'object') {
        return Number(numOfStock) === 0;
    } else {
        return Number(numOfStock[size]) === 0;
    }
}



const validateData = (data) => {
    let feedback = 'success';
    if (isMissingData(data)) {
        feedback = 'missing-data';
    } else if (isRepeat(data)) {
        feedback = 'repeat-customer';
    } else if (outOfStock(data)) {
        feedback = 'unavailable';
    } else if (isUndeliverable(data)) {
        feedback = 'undeliverable';
    }
    return feedback;
}

module.exports = { validateData };