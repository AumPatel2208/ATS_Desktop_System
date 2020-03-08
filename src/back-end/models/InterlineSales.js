const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//TODO
// Add id in??
const  IntLSchema = new Schema({
    ticketNumber: {
        type: int,
        required: true
    },
    fare: {
        type: int,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    USDExchangeRate: {
        type: int,
        required: true
    },
    paymentMethod: {
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
    },
    commissionRate: {
        type: int,
        required: true
    },
    advisorCode: {
        type: int,
        required: true
    },
    salePeriodStart:{
        type:Date,
        required: true
    },
    salePeriodEnd:{
        type:Date,
        required: true
    }

});

module.exports = IntL = mongoose.model('IntL', IntLSchema);