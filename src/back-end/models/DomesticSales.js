const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//TODO
// Add id in??
// fix int issue
const  DSalesSchema = new Schema({
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
    },
    notes:{
        type:String
    }

});

module.exports = DSales= mongoose.model('DSales', DSalesSchema);