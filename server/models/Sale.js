const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
        type: String
    },
    expDate: {
        type: String
    },
    securityCode: {
        type: String
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
        type: String,
        required: true,
        default: Date.now()
    },
    notes: {
        type: String
    },
    saleType: {
        type: String
    },
    localTax: {
        type: String
    },
    otherTax: {
        type: String
    },
    custName: {
        type: String
    }
});
// eslint-disable-next-line no-undef
module.exports = Sale = mongoose.model('Sale', SaleSchema);
