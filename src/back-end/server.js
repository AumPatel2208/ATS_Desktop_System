const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const blanks = require('./api/blanks');
const customers = require('./api/customers');
const exchangeRates = require('./api/exchangeRates');
const sales = require('./api/sales');
const staffMembers = require('./api/staffMembers');
const config = require('./config');
const app = express();

//DB Config
const db = config.get('URI');

//connecting the database
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('./api/blanks', blanks);
app.use('./api/customers',customers);
app.use('./api/exchangeRates',exchangeRates);
app.use('./api/sales',sales);
app.use('./api/staffMembers',staffMembers);

//TODO add in error handling to forward to error page