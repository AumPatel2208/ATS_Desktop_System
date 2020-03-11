const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const blanks = require('./api/blanks');
const customers = require('./api/customers');
const exchangeRates = require('./api/exchangeRates');
const sales = require('./api/sales');
const staffMembers = require('./api/staffMembers');
const url = 'mongodb://127.0.0.1:27017/ATS';

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

//connecting the database
mongoose.connect(url, {useNewUrlParser: true});

// to test the connection
const db = mongoose.connection;
db.once('open', _=>{
    console.log('connected to database:', url)
});
db.on('error', err => {
    console.error('connection error:', err);
});




app.use('/api/blanks', blanks);
app.use('/api/customers', customers);
app.use('/api/exchangeRates', exchangeRates);
app.use('/api/sales', sales);
app.use('/api/staffMembers', staffMembers);

//TODO add in error handling to forward to error page

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
