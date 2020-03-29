const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlankUsedSchema = new Schema({
    batchValues: {
        type: String

    },
    date:{
        type: Date,

    },
    batchType:{
        type: String,

    },
    advisorCode: {
        type: Number
    },
    batchId: {
        type: String
    },

});

module.exports = BlankUsed = mongoose.model('BlankUsed', BlankUsedSchema);

