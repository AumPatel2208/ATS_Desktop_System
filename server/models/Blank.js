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
    }
});


module.exports = Blank = mongoose.model('Blank', BlankSchema);

