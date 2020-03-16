const jwt = require('jsonwebtoken');
const config = require('../config/db');
// const jwt = config.jwt;
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const secure = require('../config/secure');

// bc need to encrypt password
const Staff = require('../models/Staff');

router.post('/', (q, a) => {
    const { username, password } = q.body;

    //Simple Validation for empty
    if (!username || !password) {
        return a.status(400).json({ msg: 'Please enter all fields' });
    }

    Staff.findOne({ username }).then(staff => {
        if (!staff)
            return a.status(400).json({ message: 'No such user exists' });

        bcrypt.compare(password, staff.password).then(isMatch => {
            if (!isMatch)
                return a.status(400).json({ msg: 'Invalid Credentials' });

            jwt.sign(
                { id: staff.id },
                config.jwt,
                { expiresIn: 3600 }, //only lasts an hour
                (err, token) => {
                    if (err) throw err;
                    a.json({
                        token,
                        staff: {
                            id: staff.id
                        }
                    });
                }
            );
        });
        // staff.comparePassword(password, function(err, isMatch) {
        //     if (err) throw err;
        //     if (isMatch)
        //         jwt.sign(url, { expiresIn: 1800 }, (err, token) => {
        //             if (err) throw err;
        //             q.json({
        //                 token,
        //                 staff: {
        //                     id: staff.id
        //                 }
        //             });
        //         });
        // });
    });
});

//get user via token
// @route   GET api/secure/staff
// @desc    Get User Data
// @access  Private
router.get('/staff', secure, (q, a) => {
    Staff.findById(q.staff.id)
        .select('-password') //disregard password
        .then(staff => a.json(staff));
});

module.exports = router;
