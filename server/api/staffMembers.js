const express = require('express');
const router = express.Router();
//TODO: fix error handling
const Staff = require('../models/Staff');
const bcrypt = require('bcrypt');
const salt = 10;
// q= query, a = answer

router.post('/', (q, a) => {
    console.log(q.body[0].password);
    //const newStaff = new Staff;
    newStaff = {
        username: q.body[0].username,
        firstName: q.body[0].firstName,
        lastName: q.body[0].lastName,
        address: q.body[0].address,
        password:bcrypt.hashSync(q.body[0].password, 8),
        staffType: q.body[0].staffType,
        advisorCode: q.body[0].advisorCode
    };
    Staff.create(newStaff, (err, newStaff) => {
        if (err) {
            console.log("problem registering: " + err);
        } else {
            console.log(newStaff);
        }

    });
});
// find all staff, descending order
router.get('/', (q, a) => {
    Staff.find()
        .sort({ name: -1 })
        .then(staffMembers => a.json(staffMembers));
});

//find one staff based on their code
router.get('', (q, a) => {
    Staff.findById(q.params.advisorCode).then(a.json(post));
});

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
