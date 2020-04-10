const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
    },
    commissionRate440: {
        type: Number

    },
    commissionRate444: {
        type: Number

    },
    commissionRate420: {
        type: Number

    },
    commissionRate201: {
        type: Number

    }

});
// eslint-disable-next-line no-undef
module.exports = Staff = mongoose.model('Staff', StaffSchema);
