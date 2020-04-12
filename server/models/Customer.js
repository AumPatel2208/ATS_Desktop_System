const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scema for Customers
const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    customerType: {
        type: String,
    },
    discountName: {
        type: String,
    },
    discountType: {
        type: String,
    },
    discountValue: {
        type: String,
    },
    paidThisMonth: {
        type: String,
    },
});
// eslint-disable-next-line no-undef
module.exports = Customer = mongoose.model('Customer', CustomerSchema);
