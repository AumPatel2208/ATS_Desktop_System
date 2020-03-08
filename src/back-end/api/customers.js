const express = require('express');
const router = express.Router();
//TODO: fix error handling
const Customer = require('../../models/Customer');
// q= query, a = answer

router.post('/', (q,a) =>{
    const{firstName, lastName,address, phoneNumber, customerType} = q.body;
    const newCustomer = new Customer({
        firstName,
        lastName,
        address,
        phoneNumber,
        customerType
    });

router.get('/', (q,a)=>{
    Customer.find()
            .sort()//TODO add sorting functionality once figured out how
            .then(customers => a.json(customers));
});

router.delete('/:id',(q,a)=>{
    Customer.findById(q.params.id)
        .then(customer => customer.remove().then(() => a.json({success :true})))
        .catch(err => a.status(404).json({success:false}));
});

});

module.exports = router;