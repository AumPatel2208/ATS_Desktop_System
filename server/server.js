const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const blanks = require('./api/blanks');
const customers = require('./api/customers');
const exchangeRates = require('./api/exchangeRates');
const sales = require('./api/sales');
const staffMembers = require('./api/staffMembers');
const secure = require('./api/secure');
const config = require('../server/config/db');
const url = config.URI;
// const config = require('./config');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(cookieParser(config.jwt));

//to connect react port 3000 with
var cors = require('cors');
app.use(cors());

//DB Config
//const db ='mongodb+srv://Aum:Aum@cluster0-zkn6t.mongodb.net/test?retryWrites=true&w=majority'; //config.get('URI');

//connecting the database
mongoose.connect(url, { useNewUrlParser: true });

// to test the connection
const db = mongoose.connection;
db.once('open', _ => {
    console.log('connected to database:', url);
});
db.on('error', err => {
    console.error('connection error:', err);
});

app.use('/api/blanks', blanks);
app.use('/api/customers', customers);
app.use('/api/exchangeRates', exchangeRates);
app.use('/api/sales', sales);
app.use('/api/staffMembers', staffMembers);
app.use('/api/secure', secure);

//TODO add in error handling to forward to error page

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
