const express = require('express');
const router = express.Router();
//TODO: fix error handling
const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');
const salt = 10;
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const url = config.URI;
const bcryptSecret = config.bcryptSecret;

//const secure = require('../config/secure');

// q= query, a = answer

router.post('/', (q, a) => {
    // console.log(q.body[0].password);
    // var newStaff = {
    //     username: q.body[0].username,
    //     firstName: q.body[0].firstName,
    //     lastName: q.body[0].lastName,
    //     address: q.body[0].address,
    //     password: bcrypt.hashSync(q.body[0].password, salt),
    //     staffType: q.body[0].staffType,
    //     advisorCode: q.body[0].advisorCode
    // };
    // Staff.create(newStaff, (err, newStaff) => {
    //     if (err) {
    //         console.log('problem registering: ' + err);
    //     } else {
    //         console.log(newStaff);
    //     }
    // });
    q.body.map(staff => {
        // var newPassword;
        // bcrypt.genSalt(10, function(err, salt) {
        //     bcrypt.hash(bcryptSecret, salt, function(err, hash) {
        //         newPassword = hash;

        //         var newStaff = {
        //             username: staff.username,
        //             firstName: staff.firstName,
        //             lastName: staff.lastName,
        //             address: staff.address,
        //             password: newPassword, //bcrypt.hashSync(staff.password, salt),
        //             staffType: staff.staffType,
        //             advisorCode: staff.advisorCode
        //         };
        //         Staff.create(newStaff).then(item => a.json(item));
        //     });
        // });
        var newStaff = {
            username: staff.username,
            firstName: staff.firstName,
            lastName: staff.lastName,
            address: staff.address,
            password: bcrypt.hashSync(staff.password, salt),
            staffType: staff.staffType,
            advisorCode: staff.advisorCode
        };
        Staff.create(newStaff).then(item => a.json(item));
    });
});

// router.post('/', (q, a) => {
//     const username = q.body[0].username;
//     const password = q.body[0].password;

//     Staff.findOne(username).then(staff => {
//         if (!staff)
//             return a.status(404).json({ message: 'No such user exists' });

//         bcrypt.compare(password, salt, function(err, a) {
//             if (err) throw err;
//             jwt.sign(url, { expiresIn: 1800 }, (err, token) => {
//                 if (err) throw err;
//                 q.json({
//                     token,
//                     staff: {
//                         id: staff.id
//                     }
//                 });
//             });
//         });
//     });
// });

// router.get('/checkPass/:id', (q, a) => {
//     Staff.findById(q.params.id).then(staff => {
//         if (!staff)
//             return a.status(404).json({ message: 'No such user exists' });

//         // console.log(staff);
//         // bcrypt.compare(staff.password, '10', function(err, a) {
//         //     if (err) throw err;

//         //     jwt.sign(url, { expiresIn: 1800 }, (err, token) => {
//         //         if (err) throw err;
//         //         q.json({
//         //             token,
//         //             staff: {
//         //                 id: staff.id
//         //             }
//         //         });
//         //     });
//         // });
//         bcrypt.compare(staff.password, );
//         a.json(staff);
//     });

//     // Staff.findOne().then(staff => {
//     //     if (!staff)
//     //         return a.status(404).json({ message: 'No such user exists' });

//     //     bcrypt.compare(password, salt, function(err, a) {
//     //         if (err) throw err;
//     //         jwt.sign(url, { expiresIn: 1800 }, (err, token) => {
//     //             if (err) throw err;
//     //             q.json({
//     //                 token,
//     //                 staff: {
//     //                     id: staff.id
//     //                 }
//     //             });
//     //         });
//     //     });
//     // });
// });

// find all staff, descending order
router.get('/', (q, a) => {
    Staff.find()
        .sort({ name: -1 })
        .then(staffMembers => a.json(staffMembers));
});

// //find one staff based on their code
// router.get('', (q, a) => {
//     Staff.findById(q.params.advisorCode).then(a.json(post));
// });

//find and update one staff by code
router.put('/', (q, a) => {
    Staff.findByIdAndUpdate(q.params.advisorCode, q.body).then(a.json(post));
});

//Delete one staff
router.delete('/:id', (q, a) => {
    Staff.findById(q.params.id)
        .then(staffMember =>
            staffMember.remove().then(() => a.json({ success: true }))
        )
        .catch(err => a.status(404).json({ success: false }));
});

module.exports = router;
