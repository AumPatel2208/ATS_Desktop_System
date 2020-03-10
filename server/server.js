const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const blanks = require('./api/blanks');
const customers = require('./api/customers');
const exchangeRates = require('./api/exchangeRates');
const sales = require('./api/sales');
const staffMembers = require('./api/staffMembers');

// const config = require('./config');
const app = express();
const bodyParser = require('body-parser');
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

//to connect react port 3000 with
var cors = require('cors');
app.use(cors());

//DB Config
const db =
    'mongodb+srv://Aum:Aum@cluster0-zkn6t.mongodb.net/test?retryWrites=true&w=majority'; //config.get('URI');

//connecting the database
mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
// .connect(db, { useNewUrlParser: true, useCreateIndex: true })

app.use('/api/blanks', blanks);
app.use('/api/customers', customers);
app.use('/api/exchangeRates', exchangeRates);
app.use('/api/sales', sales);
app.use('/api/staffMembers', staffMembers);

//TODO add in error handling to forward to error page

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
