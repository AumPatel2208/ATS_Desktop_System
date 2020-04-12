const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scema for Blanks
const BlankSchema = new Schema({
    batchValues: {
        type: String,
    },
    batchStart: {
        type: String,
    },
    batchEnd: {
        type: String,
    },
    date: {
        type: Date,
    },
    batchType: {
        type: String,
    },
    amount: {
        type: String,
    },
    remaining: {
        type: Array,
    },
});

module.exports = Blank = mongoose.model('Blank', BlankSchema);
