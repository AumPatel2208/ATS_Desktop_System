const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//TODO
// Add id in????
// fix int issues
const  BlankSchema = new Schema({
    blankNumber: {
        type: String,
        required: true
    },
    advisorCode: {
        type: Number,
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
    },
    batch: {
        type: Number,
        required: true
    }
});

module.exports = Blank = mongoose.model('Blank', BlankSchema);