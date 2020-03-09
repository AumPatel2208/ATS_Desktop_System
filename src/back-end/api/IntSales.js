const express = require('express');
const router = express.Router();
//TODO: fix error handling
const IntL = require('../models/InterlineSales');

router.post('/', (q,a) =>{
    const{ ticketNumber,fare, currency, USDExchangeRate, paymentMethod, creditCardNum,
        expDate, securityCode, commissionRate, advisorCode, salePeriodStart, salePeriodEnd} = q.body;
    IntL.create(q.body)
        .then(a.json(post));
});

// find all int sale by payment type
router.get('/', (q,a)=>{
    IntL.find(q.param.paymentMethod)
        .sort({date: -1})
        .then(IntSales => a.json(IntSales));
});

// find sales by advisor code
router.get('/', (q,a)=>{
    IntL.find(q.param.advisorCode)
        .sort({date: -1})
        .then(IntSales => a.json(IntSales));
});
//TODO issue with updating, since this will be tagged to two databases????
//find and update one sale
router.put('/:id',(q,a)=>{
    IntL.findByIdAndUpdate(q.params.id, q.body)
        .then(a.json(post));
});
//TODO issue with deleting bc wouldn't match with sales deletion
//Delete one entry
router.delete('/:id',(q,a)=>{
    IntL.findById(q.params.id)
        .then(IntSales => IntSales.remove().then(() => a.json({success :true})))
        .catch(err => a.status(404).json({success:false}));
});

module.exports = router;