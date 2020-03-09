const express = require('express');
const router = express.Router();
//TODO: fix error handling
const Sale = require('../models/Sale');

//add a sale
router.post('/', (q, a) => {
    const {
        ticketNumber,
        fare,
        currency,
        USDExchangeRate,
        paymentMethod,
        creditCardNum,
        expDate,
        securityCode,
        commissionRate,
        advisorCode,
        saleDate
    } = q.body;
    Sale.create(q.body).then(a.json(post));
});

// find all sale by payment type
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
