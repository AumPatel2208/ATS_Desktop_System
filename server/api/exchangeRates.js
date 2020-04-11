const express = require('express');
const router = express.Router();
const ExchangeRate = require('../models/ExchangeRate');
// q= query, a = answer

//adding in a new one into the database
router.post('/', (q, a) => {
let dt = new Date(Date.now());
dt.setHours(0,0,0,0)
    const newExchangeRate = new ExchangeRate({
        currencyCode: q.body.currencyCode,
        toUSDRate: q.body.toUSDRate,
        date: dt
    });

    newExchangeRate.save().then(item => a.json(item));
    console.log(newExchangeRate);
});

// find all rates, descending order by currency code
router.get('/', (q, a) => {
    ExchangeRate.find()
        .sort({ currencyCode: -1 })
        .then(exchangeRates => a.json(exchangeRates));
});

router.get('/byDate', (q, a) => {
    let d = new Date(q.query.start);
    d.setHours(0,0,0,0);
    console.log(d);
    ExchangeRate.find({date:d})
        .then(exchangeRates => a.json(exchangeRates));
});


router.get('/sale', (req, res) => {
    let d = new Date(Date.now());
    d.setHours(0,0,0,0);
    ExchangeRate.find({date: d})
        .then(rates => res.json(rates));

});

// find rates, by currency code
router.get('/', (q, a) => {
    ExchangeRate.find(q.param.currencyCode).then(exchangeRates =>
        a.json(exchangeRates)
    );
});

//find and update one rate by id
router.put('/:id', (q, a) => {
    ExchangeRate.findByIdAndUpdate(q.params.id, q.body).then(a.json(post));
});

//Delete one rate
router.delete('/:id', (q, a) => {
    ExchangeRate.findById(q.params.id)
        .then(exchangeRates =>
            exchangeRates.remove().then(() => a.json({ success: true }))
        )
        .catch(err => a.status(404).json({ success: false }));
});

module.exports = router;
