const express = require('express');
const router = express.Router();
//TODO: fix error handling
const Customer = require('../models/Customer');
// q= query, a = answer

router.post('/', (q, a) => {
    // const { firstName, lastName, address, phoneNumber, customerType } = q.body;
    Customer.create(q.body).then(item => a.json(item));
});

// find all customers, descending order
router.get('/', (q, a) => {
    Customer.find()
        .sort({ name: -1 })
        .then(customers => a.json(customers));
});

//find one customer based on their id
router.get('/:id', (q, a) => {
    Customer.findById(q.params.id).then(item => a.json(item));
});

//find and update one customer
router.put('/:id', (q, a) => {
    Customer.findByIdAndUpdate(q.params.id, q.body).then(item => a.json(item));
});

//Delete one customer
router.delete('/:id', (q, a) => {
    Customer.findById(q.params.id)
        .then(customer =>
            customer.remove().then(() => a.json({ success: true }))
        )
        .catch(err => a.status(404).json({ success: false }));
});

module.exports = router;
