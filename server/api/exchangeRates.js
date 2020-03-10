const express = require('express');
const router = express.Router();
//TODO: fix error handling
const ExchangeRate = require('../models/ExchangeRate');
// q= query, a = answer

router.post('/', (q, a) => {
    // const { currencyCode, date, toUSDRate } = q.body;
    // ExchangeRate.create(q.body).then(item => a.json(item));
    // console.log(q.body);

    const newExchangeRate = new ExchangeRate({
        currencyCode: q.body.currencyCode,
        toUSDRate: q.body.toUSDRate
    });

    newExchangeRate.save().then(item => a.json(item));
});

// find all rates, descending order by currency code
router.get('/', (q, a) => {
    ExchangeRate.find()
        .sort({ currencyCode: -1 })
        .then(exchangeRates => a.json(exchangeRates));
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
