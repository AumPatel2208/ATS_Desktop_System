const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');
const bodyParser = require('body-parser');

router.post('/', (q, a) => {
console.log(q + "DISCOUNT POST");

    newdiscount = {
        name: q.body.name,
        fixedValue: q.body.fixedValue,
        flexibleBand1: q.body.flexibleBand1,
        band1Value: q.body.band1Value,
        flexibleBand2: q.body.flexibleBand2,
        band2Value: q.body.band2Value,
        band3Value: q.body.band3Value
    };
    Discount.create(newdiscount, (err, newdiscount) => {
        if (err) {
            console.log("problem selling: " + err);
        } else {
            console.log(newdiscount);
        }

    });
});

// find all blanks, sorted by date added
router.get('/', (q, a) => {
    Discount.find()
        .sort({ date: -1 })
        .then(discounts => a.json(discounts));
});

router.get('/byDate',(q,a)=>{
    // x = JSON.parse(q.body);
    let sd = q.query.start;
    let ed = q.query.end;

    console.log(q.url);
    Discount.find({date:{$lte:ed, $gte:sd}})
        .then(discounts => a.json(discounts));


});

//find and update one blank
router.put('/:id', (q, a) => {
    Discount.findByIdAndUpdate(q.params.id, q.body).then(a.json(post));
});
//Delete one blank
router.delete('/:id', (q, a) => {
    Discount.findById(q.params.id)
        .then(discounts => discounts.remove().then(() => a.json({ success: true })))
        .catch(err => a.status(404).json({ success: false }));
});

module.exports = router;
