const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//TODO
// Add id in
const  CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: int,
        required: true
    },
    discount: {
        type: int,
    },
    customerType: {
        type: String,
        required: true
    },
    creditCardNum: {
        type: int,
    },
    expDate: {
        type: Date,
    },
    securityCode: {
        type: int,
    }
});

module.exports = Customer = mongoose.model('Customer', CustomerSchema);