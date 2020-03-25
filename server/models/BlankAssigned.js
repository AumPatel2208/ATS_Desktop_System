const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlankAssignedSchema = new Schema({
    batchStart: {
        type: String
    },
    batchEnd: {
        type: String
    },
    date:{
        type: Date,

    },
    batchType:{
        type: String,
    },
    amount:{
        type: String
    },
    advisorCode: {
        type: Number
    },
    batchId: {
        type: String
    }
});

module.exports = BlankAssigned = mongoose.model('BlankAssigned', BlankAssignedSchema);

