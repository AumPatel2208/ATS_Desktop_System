const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scema for Assigned Blanks
const BlankAssignedSchema = new Schema({
    batchStart: {
        type: String,
    },
    batchEnd: {
        type: String,
    },
    batchValues: {
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
    advisorCode: {
        type: Number,
    },
    batchId: {
        type: String,
    },
    remaining: {
        type: Array,
    },
});

module.exports = BlankAssigned = mongoose.model(
    'BlankAssigned',
    BlankAssignedSchema
);
