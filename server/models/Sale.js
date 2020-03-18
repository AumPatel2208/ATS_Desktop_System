const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//TODO
// Add id in??
const SaleSchema = new Schema({
    ticketNumber: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    USDExchangeRate: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    creditCardNum: {
        type: Number
    },
    expDate: {
        type: Date
    },
    securityCode: {
        type: Number
    },
    commissionRate: {
        type: Number,
        required: true
    },
    advisorCode: {
        type: Number,
        required: true
    },
    saleDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    notes: {
        type: String
    },
    saleType: {
        type: String
    }
});
// eslint-disable-next-line no-undef
module.exports = Sale = mongoose.model('Sale', SaleSchema);
