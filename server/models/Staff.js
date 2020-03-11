const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//TODO
// Add id in
const StaffSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    staffType: {
        type: String,
        required: true
    },
    advisorCode: {
        type: Number,
        required: false
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = Staff = mongoose.model('Staff', StaffSchema);
//password hashing:  https://www.npmjs.com/package/bcryptjs