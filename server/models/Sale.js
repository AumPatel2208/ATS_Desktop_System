const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SaleSchema = new Schema({
    ticketNumber: {
        type: String
    },
    fare: {
        type: Number
    },
    currency: {
        type: String
    },
    USDExchangeRate: {
        type: Number
    },
    paymentMethod: {
        type: String
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
        type: Number
    },
    advisorCode: {
        type: Number
    },
    saleDate: {
        type: String,
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
    },
    isRefunded: {
        type: Boolean
    }
});
// eslint-disable-next-line no-undef
module.exports = Sale = mongoose.model('Sale', SaleSchema);
