const express = require('express');
const router = express.Router();
//TODO: fix error handling
const Sale = require('../models/Sale');

/*
//add a sale
router.post('/', (q, a) => {
    // const {
    //     ticketNumber,
    //     fare,
    //     currency,
    //     USDExchangeRate,
    //     paymentMethod,
    //     creditCardNum,
    //     expDate,
    //     securityCode,
    //     commissionRate,
    //     advisorCode,
    //     saleDate
    // } = q.body;

    const ticketNum = toString(q.body[0].ticketNumber);
    const blankCode = ticketNum.substring(0,2);
    if (blankCode == "201"){
        Sale.saleType = "domestic";
    }
    else{
        Sale.saleType = "interline";
    }
    Sale.create(q.body).then(item => a.json(item));

});
*/


router.post('/', (q, a) => {
    const ticketNum = toString(q.body[0].ticketNumber);
    const blankCode = ticketNum.substring(0,2);
    let saleTp = "";
    if (blankCode == "201"){
        saleTp = "Domestic";
    }
    else{
        saleTp = "Interline";
    }

    newSale = {
        ticketNumber: q.body[0].ticketNumber,
        fare: q.body[0].fare,
        currency: q.body[0].currency,
        USDExchangeRate: q.body[0].USDExchangeRate,
        paymentMethod: q.body[0].paymentMethod,
        creditCardNum: q.body[0].creditCardNum,
        expDate: q.body[0].expDate,
        securityCode: q.body[0].securityCode,
        commissionRate: q.body[0].commissionRate,
        advisorCode: q.body[0].advisorCode,
        saleDate: q.body[0].saleDate,
        saleType: saleTp
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


// find all sales by payment type
router.get('/', (q, a) => {
    Sale.find(q.param.paymentMethod)
        .sort({ date: -1 })
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
