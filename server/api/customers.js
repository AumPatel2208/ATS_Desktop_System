const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
// q= query, a = answer

// Insert Customers
router.post('/', (q, a) => {
    Customer.create(q.body).then((item) => a.json(item));
});

// find all customers, descending order
router.get('/', (q, a) => {
    Customer.find()
        .sort({ name: -1 })
        .then((customers) => a.json(customers));
});

// Get discounts assigned to customer
router.get('/discount', (q, a) => {
    let st = q.query.st;
    x = st.split(' ');

    console.log(q.url);
    Customer.find({ firstName: x[0], lastName: x[1] }).then((customer) =>
        a.json(customer)
    );
});

//find one customer based on their id
router.get('/:id', (q, a) => {
    Customer.findById(q.params.id).then((item) => a.json(item));
});

//find and update one customer
router.put('/:id', (q, a) => {
    Customer.findByIdAndUpdate(q.params.id, q.body).then((item) =>
        a.json(item)
    );
    console.log('updated' + q.body.discountValue);
});

// Edit discounts assigned to customers
router.put('/discount', (q, a) => {
    let st = q.query.st;
    x = st.split(' ');

    console.log(q);
    Customer.find({ firstName: x[0], lastName: x[1] }).then((customer) =>
        a.json(customer)
    );
});

//Delete one customer
router.delete('/:id', (q, a) => {
    Customer.findById(q.params.id)
        .then((customer) =>
            customer.remove().then(() => a.json({ success: true }))
        )
        .catch((err) => a.status(404).json({ success: false }));
});

module.exports = router;
