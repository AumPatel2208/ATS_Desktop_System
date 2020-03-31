const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
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
        type: String,
        required: true
    },
    customerType: {
        type: String,

    },
    discountName: {
        type: String
    },
    discountType:{
        type: String
    },
    paidThisMonth:{
        type: Number
    }
});
// eslint-disable-next-line no-undef
module.exports = Customer = mongoose.model('Customer', CustomerSchema);
