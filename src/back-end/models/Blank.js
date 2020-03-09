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
        type: int,
    },
    assigned: {
        type: bool,
        required: true,
        default: false
    },
    used: {
        type: bool,
        required: true,
        default: false
    },
    batch: {
        type: int,
        required: true
    }
});

module.exports = Blank = mongoose.model('Blank', BlankSchema);