const express = require('express');
const router = express.Router();
//TODO: fix error handling
const TST = require('../models/InterlineSales');

router.post('/', (q,a) =>{
    const{ blankNumber, advisorCode, assigned, used, batch} = q.body;
    TST.create(q.body)
        .then(a.json(post));
});


// find all blanks by date, descending order
router.get('/', (q,a)=>{
    TST.find()
        .sort({date: -1})
        .then(Tstocks => a.json(Tstocks));
});

//find used blanks
router.get('/:id', (q,a) =>{
    TST.find(q.params.used, {date: -1})
        .then(a.json(post))
});

//find assigned blanks
router.get('/:id', (q,a) =>{
    TST.find(q.params.assigned, {date: -1})
        .then(a.json(post))
});

//find blanks by advisor code
router.get('/:id', (q,a) =>{
    TST.find(q.params.advisorCode, {date: -1})
        .then(a.json(post))
});

//find and update one stock turnover
router.put('/:id',(q,a)=>{
    TST.findByIdAndUpdate(q.params.id, q.body)
        .then(a.json(post));
});

//Delete one entry
router.delete('/:id',(q,a)=>{
    TST.findById(q.params.id)
        .then(Tstocks => Tstocks.remove().then(() => a.json({success :true})))
        .catch(err => a.status(404).json({success:false}));
});
