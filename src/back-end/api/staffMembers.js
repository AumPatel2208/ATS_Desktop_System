const express = require('express');
const router = express.Router();
//TODO: fix error handling
const Staff = require('../models/Staff');
// q= query, a = answer

router.post('/', (q,a) =>{
    const{firstName, lastName,address, username, staffType, advisorCode} = q.body;
    Staff.create(q.body)
        .then(a.json(post));
});

// find all staff, descending order
router.get('/', (q,a)=>{
    Staff.find()
        .sort({name: -1})
        .then(staffMembers => a.json(staffMembers));
});

//find one staff based on their code
router.get('', (q,a) =>{
    Staff.findById(q.params.advisorCode)
        .then(a.json(post))
});

//find and update one staff by code
router.put('/',(q,a)=>{
    Staff.findByIdAndUpdate(q.params.advisorCode, q.body)
        .then(a.json(post));
});

//Delete one customer
router.delete('/:id',(q,a)=>{
    Staff.findById(q.params.id)
        .then(staffMember => staffMember.remove().then(() => a.json({success :true})))
        .catch(err => a.status(404).json({success:false}));
});

module.exports = router;