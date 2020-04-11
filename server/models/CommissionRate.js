const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommissionRateSchema = new Schema({
    name: {
        type: String
    },
    ticket440: {
        type: Number
    },
    ticket444: {
        type: Number
    },
    ticket420: {
        type: Number
    },
    ticket201: {
        type: Number
    }


});


module.exports = CommissionRate = mongoose.model('CommissionRate', CommissionRateSchema);

