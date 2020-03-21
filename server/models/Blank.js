const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//TODO
// Add id in????
// fix int issues
const BlankSchema = new Schema({
    batchValues: {
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    batchType:{
        type: String,
        required: true
    },
    amount:{
        type: Number
    },
    advisorCode: {
        type: Number
    },
    assigned: {
        type: Boolean,
        required: true,
        default: false
    },
    used: {
        type: Boolean,
        required: true,
        default: false
    }
});
// eslint-disable-next-line no-undef
module.exports = Blank = mongoose.model('Blank', BlankSchema);
