const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlankUsedSchema = new Schema({
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
    },
    batchAssignedId: {
        type: String
    }
});

module.exports = BlankUsed = mongoose.model('BlankUsed', BlankUsedchema);

