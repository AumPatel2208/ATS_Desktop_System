const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//TODO
// Add id in
const  TSTSchema = new Schema({
    blankNumber: {
        type: int,
        required: true
    },
    advisorCode: {
        type: String,
        default: "N/A"
    },
    assigned: {
        type: bool,
        default: false,
        required: true
    },
    used: {
        type: bool,
        default: false,
        required: true
    },
    batch: {
        type: int,
        required: true
    }

});

module.exports = TST = mongoose.model('TST', TSTSchema);