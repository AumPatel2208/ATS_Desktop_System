const jwt = require('jsonwebtoken');
const config = require('../config/db');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const secure = require('../config/secure');

const Staff = require('../models/Staff');

// Compares the inserted username and passwords to the ones saved in the database
// It uses BCRYPT to encyprt/decrypt the password
// Uses JWT to sign and send an encrypted token as a cookie. Can be decrypted to get the Staff ID
router.post('/', (q, a) => {
    const { username, password } = q.body;

    //Simple Validation for empty
    if (!username || !password) {
        return a.status(400).json({ msg: 'Please enter all fields' });
    }

    Staff.findOne({ username }).then((staff) => {
        // console.log(staff);
        if (!staff)
            return a.status(400).json({ message: 'No such user exists' });

        bcrypt.compare(password, staff.password).then((isMatch) => {
            if (!isMatch)
                return a.status(400).json({ msg: 'Invalid Credentials' });

            jwt.sign(
                { id: staff.id },
                config.jwt,
                { expiresIn: 3600 }, //only lasts an hour. Token/Login expires within an hour
                (err, token) => {
                    if (err) throw err;
                    a.cookie('token', token, { httpOnly: true });
                    a.json({
                        token: token,
                        staff: {
                            id: staff.id,
                        },
                    });
                }
            );
        });
    });
});

//Logout
router.post('/logout', (q, a) => {
    a.clearCookie('token');
    a.json({ msg: 'Logged Out' });
});

//get user via token
// @route   GET api/secure/staff
// @desc    Get User Data
// @access  Private
router.get('/staff', (q, a) => {
    if (q.cookies.token !== undefined) {
        jwt.verify(q.cookies.token, config.jwt, (err, decoded) => {
            if (err) {
                a.json({ err: err });
            }
            a.json(decoded.id);
        });
    }
});

module.exports = router;
