const express = require('express');
const router = express.Router();
const Commission = require('../models/CommissionRate');
const bodyParser = require('body-parser');

router.post('/', (q, a) => {
    console.log(q + "COMMISSION POST");


    newdiscount = {
        name: q.body.name,
        ticket440: q.body.ticket440,
        ticket444: q.body.ticket444,
        ticket420: q.body.ticket420,
        ticket201: q.body.ticket201
    };
    Commission.create(newdiscount, (err, newdiscount) => {
        if (err) {
            console.log("problem selling: " + err);
        } else {
            console.log(newdiscount);
        }

    });
});

// find all blanks, sorted by date added
router.get('/', (q, a) => {
    Commission.find()
        .sort({ date: -1 })
        .then(discounts => a.json(discounts));
});

router.get('/byDate',(q,a)=>{
    let sd = q.query.start;
    let ed = q.query.end;

    console.log(q.url);
    Commission.find({date:{$lte:ed, $gte:sd}})
        .then(discounts => a.json(discounts));


});

//find and update one blank
router.put('/:id', (q, a) => {
    Commission.findByIdAndUpdate(q.params.id, q.body).then(a.json(post));
});
//Delete one blank
router.delete('/:id', (q, a) => {
    Commission.findById(q.params.id)
        .then(discounts => discounts.remove().then(() => a.json({ success: true })))
        .catch(err => a.status(404).json({ success: false }));
});

module.exports = router;
