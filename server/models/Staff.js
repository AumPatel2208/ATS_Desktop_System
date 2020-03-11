const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const salt = 8;

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

StaffSchema.pre('post', function (next) {
    const staff = this;
    if(!staff.isModified('password')) return next();

    bcrypt.genSalt(salt, function (err, salt) {
        if(err) return next(err);
        bcrypt.hash(staff.password,salt, function (err, salt) {
            if (err) return next(err);
            staff.password = hash;
            next();
        })
    })

});

StaffSchema.methods.comparePassword = function(enteredValue, p){
    bcrypt.compare(enteredValue, this.password, function (err, isMatch) {
        if(err) return p(err);
        p(null, isMatch);
    });
};

module.exports = Staff = mongoose.model('Staff', StaffSchema);
