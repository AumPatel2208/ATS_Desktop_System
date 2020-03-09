const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//TODO
// Add id in
const  ExchangeRateSchema = new Schema({

    currencyCode: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    toUSDRate: {
        type: Number,
        required: true
    }
});

module.exports = ExchangeRate = mongoose.model('Staff', ExchangeRateSchema);