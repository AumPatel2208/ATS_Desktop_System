const express = require('express');
const router = express.Router();
const ExchangeRate = require('../models/ExchangeRate');
// q= query, a = answer

router.post('/', (q, a) => {
    // const { currencyCode, date, toUSDRate } = q.body;
    // ExchangeRate.create(q.body).then(item => a.json(item));
    // console.log(q.body);
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
       // d.setHours(0,0,0,0);
   // let df = d.setHours(0,0,0,0);
    console.log(d)
    ExchangeRate.find({date:d})
    //ExchangeRate.find()
   // console.log(ExchangeRate.find({date: "2020-03-25T10:40:36.900Z"}))
        .then(exchangeRates => a.json(exchangeRates));
});


router.get('/sale', (req, res) => {
   /* let d = new Date(req.query.d);
    d.setHours(0,0,0,0);
    console.log(d);

    let c = req.query.currency;
    console.log(c);

//    ExchangeRate.find({date:d, currencyCode:c })
    ExchangeRate.find({currencyCode:c })
 //       .then(exchangeRates => res.json(exchangeRates))
        .then(function  (x) {
            console.log("db response");
            console.log(x);
            res.json(x)
        })
        .catch(function (err) {
            console.log(err)
        })
        .then(function () {
            console.log("rates")
        })

    console.log("Done");
    return res;
            //a.json(exchangeRates));
*/
   console.log("Send");
   res.send('Hello');
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
