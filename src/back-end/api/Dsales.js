const express = require('express');
const router = express.Router();
//TODO: fix error handling
const DSales = require('../models/DomesticSales');

router.post('/', (q,a) =>{
    const{ ticketNumber, fare, currency, USDExchangeRate, paymentMethod,
        commissionRate, advisorCode, salePeriodStart, salePeriodEnd, notes} = q.body;
    DSales.create(q.body)
        .then(a.json(post));
});


// find all domestic sale by payment type
router.get('/', (q,a)=>{
    DSales.find(q.param.paymentMethod)
        .sort({date: -1})
        .then(Dsales => a.json(Dsales));
});

// find sales by advisor code
router.get('/', (q,a)=>{
    DSales.find(q.param.advisorCode)
        .sort({date: -1})
        .then(Dsales => a.json(Dsales));
});
//TODO issue with updating, since this will be tagged to two databases????
//find and update one sale
router.put('/:id',(q,a)=>{
    DSales.findByIdAndUpdate(q.params.id, q.body)
        .then(a.json(post));
});
//TODO issue with deleting bc wouldn't match with sales deletion
//Delete one entry
router.delete('/:id',(q,a)=>{
    DSales.findById(q.params.id)
        .then(Dsales => Dsales.remove().then(() => a.json({success :true})))
        .catch(err => a.status(404).json({success:false}));
});

module.exports = router;