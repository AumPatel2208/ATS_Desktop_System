const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlankUsedSchema = new Schema({
    batchValues: {
        type: String

    },
    date:{
        type: Date,

    },
    advisorCode: {
        type: Number
    },
    batchId: {
        type: String
    },
    custName: {
        type: String
    }

});

module.exports = BlankUsed = mongoose.model('BlankUsed', BlankUsedSchema);

