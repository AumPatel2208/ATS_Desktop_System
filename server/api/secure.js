const jwt = require("jsonwebtoken");
const config = require('../server/config/db');
const url = config.URI;
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt.js');
const secure = require('../config/secure');

// bc need to encrypt password
const Staff = require('../models/Staff');

router.post('/', (q,a)=> {
    const{username, password} = q.body;

    Staff.findOne(username).then(staff =>{
        if(!staff) return a.status(404).json({message: "No such user exists"});

        staff.comparePassword(password, function (err, isMatch) {
            if (err) throw err;
            jwt.sign(
                url,
                { expiresIn:1800 },
                (err, token) => {
                    if (err) throw err;
                    q.json({
                        token, staff:{
                            id: staff.id
                        }
                    });
                })
        })
    });

    });

module.exports = router;
