const express = require('express');
const router = express.Router();
//TODO: fix error handling
const Blank = require('../models/Blank');

router.post('/', (q, a) => {
    const { blankNumber, assigned, used, batch } = q.body;
    Blank.create(q.body).then(a.json(post));
});

// find all blanks, sorted by date added
router.get('/', (q, a) => {
    Blank.find()
        .sort({ date: -1 })
        .then(blanks => a.json(blanks));
});

// find blank by advisor code
router.get('/', (q, a) => {
    Blank.find(q.param.advisorCode)
        .sort({ date: -1 })
        .then(blanks => a.json(blanks));
});

//find and update one blank
router.put('/:id', (q, a) => {
    Blank.findByIdAndUpdate(q.params.id, q.body).then(a.json(post));
});
//TODO issue with deleting bc wouldn't match with sales deletion
//Delete one blank
router.delete('/:id', (q, a) => {
    Blank.findById(q.params.id)
        .then(blanks => blanks.remove().then(() => a.json({ success: true })))
        .catch(err => a.status(404).json({ success: false }));
});

module.exports = router;
