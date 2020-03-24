const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlankSchema = new Schema({
    batchValues: {
        type: String,

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
/*
BlankSchema.method.getDates = function getDates(sd,ed){
    var dateRange = Blank.find({
        date:{$lte:ed, $gte:sd}
    });
    return dateRange;
};

 */


module.exports = Blank = mongoose.model('Blank', BlankSchema);

