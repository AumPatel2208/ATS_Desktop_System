const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');
const salt = 10;

// q= query, a = answer
// request   response

router.post('/', (q, a) => {
    console.log(q.body);

    q.body.map(staff => {
        var newStaff = {
            username: staff.username,
            firstName: staff.firstName,
            lastName: staff.lastName,
            address: staff.address,
            password: bcrypt.hashSync(staff.password, salt),
            staffType: staff.staffType,
            advisorCode: staff.advisorCode,
            commissionRate: staff.commissionRate
        };
        Staff.create(newStaff).then(item => a.json(item));
    });
});

// find all staff, descending order
router.get('/', (q, a) => {
    Staff.find()
        .sort({ name: -1 })
        .then(staffMembers => a.json(staffMembers));
});

//get by advisor code
router.get('/commission', (q, a) => {
        let st = q.query.st;
        console.log(q.url);

        Staff.find({advisorCode:st})
            .then(staff => a.json(staff));

});

//find one staff based on their id
router.get('/:id', (q, a) => {
    Staff.findById(q.params.id).then(staff => {
        var staffWithoutPass = staff;
        // delete staffWithoutPass.password;
        staffWithoutPass.password = undefined;

        a.json(staffWithoutPass);
    });
    // console.log('Staff');
});

//find and update one staff by code
router.put('/', (q, a) => {
    Staff.findByIdAndUpdate(q.params.advisorCode, q.body).then(item =>
        a.json(item)
    );
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
