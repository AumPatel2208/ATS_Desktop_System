const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const bodyParser = require('body-parser');

router.post('/', (q, a) => {
    console.log(q.body.ticketNumber);

    newSale = {
        ticketNumber: q.body.ticketNumber,
        fare: q.body.fare,
        currency: q.body.currency,
        USDExchangeRate: q.body.USDExchangeRate,
        paymentMethod: q.body.paymentMethod,
        creditCardNum: q.body.creditCardNum,
        expDate: q.body.expDate,
        securityCode: q.body.securityCode,
        commissionRate: q.body.commissionRate,
        advisorCode: q.body.advisorCode,
        saleDate: q.body.saleDate,
        saleType: q.body.saleType,
        localTax: q.body.localTax,
        otherTax: q.body.otherTax,
        custName: q.body.custName
    };

    Sale.create(newSale, (err, newSale) => {
        if (err) {
            console.log("problem selling: " + err);
        } else {
            console.log(newSale);
        }

    });
});

//FOR THE REPORTS - gets sale type
router.get('/',(q,a)=>{
    Sale.find(q.param.saleType)
        .sort({date: -1})
        .then(sales => a.json(sales));

});
//FOR THE REPORTS - gets sale type
router.get('/customer',(q,a)=>{
    Sale.find()
        .sort({date: -1})
        .then(sales => a.json(sales));

});

// find all sales by payment type
router.get('/byDate',(q,a)=>{
    // x = JSON.parse(q.body);
    let sd = q.query.start;
    let ed = q.query.end;
    console.log(q.url);
    Sale.find({date:{$lte:ed, $gte:sd}})
        .then(sales => a.json(sales));

});


// find sales by advisor code
router.get('/', (q, a) => {
    Sale.find(q.param.advisorCode)
        .sort({ date: -1 })
        .then(sales => a.json(sales));
});

// find sales by date, sorted by advisor
router.get('/', (q, a) => {
    Sale.find(q.param.saleDate)
        .sort({ advisorCode: -1 })
        .then(sales => a.json(sales));
});

//find and update one sale by id
router.put('/:id', (q, a) => {
    Sale.findByIdAndUpdate(q.params.id, q.body).then(a.json(post));
});

//Delete one sale

router.delete('/:id', (q, a) => {
    Sale.findById(q.params.id)
        .then(sale => sale.remove().then(() => a.json({ success: true })))
        .catch(err => a.status(404).json({ success: false }));
});



module.exports = router;
