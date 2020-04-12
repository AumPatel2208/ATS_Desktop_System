const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scema for Discount
const DiscountSchema = new Schema({
    name: {
        type: String,
    },
    fixedValue: {
        type: String,
    },
    flexibleBand1: {
        type: String,
    },
    band1Value: {
        type: String,
    },
    flexibleBand2: {
        type: String,
    },
    band2Value: {
        type: String,
    },
    band3Value: {
        type: String,
    },
});

module.exports = Discount = mongoose.model('Discount', DiscountSchema);
