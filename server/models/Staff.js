const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//TODO
// Add id in
const StaffSchema = new Schema({
    firstName: {
        type: String
        // required: true
    },
    lastName: {
        type: String
        // required: true
    },
    address: {
        type: String
        // required: true
    },
    username: {
        type: String
        //required: true
    },

    password: {
        type: String
        // required: true
    },
    staffType: {
        type: String
        //required: true
    },
    advisorCode: {
        type: Number
        // required: true
    }
});
// eslint-disable-next-line no-undef
module.exports = Staff = mongoose.model('Staff', StaffSchema);
