const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//TODO
// Add id in??
const  SaleSchema = new Schema({
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
    saleDate: {
        type: Date,
        required: true,
        default: Date.now()
    }

});

module.exports = Sale = mongoose.model('Sale', SaleSchema);