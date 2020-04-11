import { Button, Container } from 'reactstrap';
import React, { Component, Fragment } from 'react';
import { Dropdown, Form, FormControl, FormLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
let apiLinks = require('../api/config.json');

export class SaleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sales: [],
            rates: [],
            date: new Date(),
            code: '',
            custName: '',
            saleType: 'Select Sale Type',
            tickNum: '',
            fare: '',
            Tlocal: '',
            Tother: '',
            method: 'Payment Method',
            hasPayed: false,
            creditNum: '-',
            expDate: '-',
            secCode: '-',
            rate: '',
            adCode: '',
            notes: '',
            USDExchangeRate: '',
            eRate: {
                eDate: Date,
                currency: '',
                USDExchange: '',
            },
            exch: [],
            cCode: 'local',
            myId: '',
            blanks: [],
            customers: [],
            discounts: [],
            setType: ' ',
        };
    }
    async componentDidMount() {
        const {
            match: { params },
        } = this.props;
        const l = params.id.split('-');

        this.setState({ tickNum: l[1] });
        this.setState({ myId: l[0] });
        this.setState({ setType: l[2] });
        this.setState({ saleType: this.state.setType });

        //getting the day's exchange rate for the given currency
        const getLink = apiLinks.EXCHANGERATES + '/sale';
        await axios
            .get(getLink)
            .then((res) => {
                const exchData = res.data;
                this.setState({
                    ...this.state.exch,
                    exch: exchData,
                });
                console.log(this.state.exch);
            })
            .catch((err) => console.log('Error code: ', err));

        //getting the originally assigned amount to remove the sold ticket
        await axios
            .get(apiLinks.ASSIGN)
            .then((res) => {
                const blanks = res.data;
                this.setState({ blanks });

                const bl = this.state.blanks.filter(
                    (i) => String(i._id) === this.state.myId
                );
                this.setState({ blanks: bl });
            })
            .catch((err) => console.log('Error code: ', err));

        //getting the customer in order to apply discount
        await axios
            .get(apiLinks.CUSTOMERS)
            .then((res) => {
                const customers = res.data;
                this.setState({ customers });
            })
            .catch((err) => console.log('Error code: ', err));

        //getting discount to apply to the fare
        await axios
            .get(apiLinks.DISCOUNT)
            .then((res) => {
                const discounts = res.data;
                this.setState({ discounts });
            })
            .catch((err) => console.log('Error code: ', err));
    }

    creditHandler() {
        //if it's a credit sale, this will display extra places to input the credit card values
        if (this.state.method === 'CreditCard') {
            return (
                <Fragment>
                    <FormLabel>Credit Card Number</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.creditNum}
                        onChange={(e) => {
                            this.setState({
                                creditNum: e.target.value,
                            });
                        }}
                    />
                    <FormLabel>Expiration Date</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.expDate}
                        onChange={(e) => {
                            this.setState({
                                expDate: e.target.value,
                            });
                        }}
                    />
                    <FormLabel>Security Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.secCode}
                        onChange={(e) => {
                            this.setState({
                                secCode: e.target.value,
                            });
                        }}
                    />
                </Fragment>
            );
        }
    }

    taxHandler() {
        //if it is an interline sale, this will give boxes to enter the extra values needed
        if (this.state.setType === 'Interline') {
            return (
                <Fragment>
                    <FormLabel>Local Tax</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.Tlocal}
                        onChange={(e) => {
                            this.setState({
                                Tlocal: e.target.value,
                            });
                        }}
                    />
                    <FormLabel>Currency Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.cCode}
                        onChange={(e) => {
                            this.setState({
                                cCode: e.target.value,
                            });
                        }}
                    />
                </Fragment>
            );
        }
    }

    render() {
        function submitSale(event) {
            //adds a new sale

            let dt = new Date(Date.now());
            dt.setHours(0, 0, 0, 0);

            event.preventDefault();

            //handling to make sure correct commission rate is tagged to the sale based on ticket type
            // and advisor commission values
            var ad;
            {
                this.props.staff !== undefined
                    ? (ad = `${this.props.staff.advisorCode}`)
                    : (ad = '-');
            }

            var cd;
            if (this.state.tickNum.substring(0, 3) == 440) {
                this.props.staff !== undefined
                    ? (cd = `${this.props.staff.commissionRate440}`)
                    : (cd = '-');
            } else if (this.state.tickNum.substring(0, 3) == 444) {
                this.props.staff !== undefined
                    ? (cd = `${this.props.staff.commissionRate444}`)
                    : (cd = '-');
            } else if (this.state.tickNum.substring(0, 3) == 420) {
                this.props.staff !== undefined
                    ? (cd = `${this.props.staff.commissionRate420}`)
                    : (cd = '-');
            } else if (this.state.tickNum.substring(0, 3) == 201) {
                this.props.staff !== undefined
                    ? (cd = `${this.props.staff.commissionRate201}`)
                    : (cd = '-');
            }

            //getting the correct customer and applying the discount to the fare
            //filtering by ID
            let i2;
            for (let i = 0; i < this.state.customers.length; i++) {
                if (this.state.customers[i]._id == this.state.custName) {
                    i2 = i;
                    break;
                }
            }

            let w = 'Casual Customer';
            if (this.state.customers[i2] !== undefined) {
                w =
                    this.state.customers[i2].firstName +
                    ' ' +
                    this.state.customers[i2].lastName;
            }

            let z;
            //applying discount if valued customer
            if (w !== 'Casual Customer') {
                let z1 = parseInt(this.state.fare);
                let z2 = parseInt(this.state.customers[i2].discountValue);
                z = z1 - (z2 / 100) * z1;
            }else {
                z = this.state.fare;
            }
            //converting usd sale into local fare
            if (this.state.cCode == "USD"){
                z = (this.state.fare /this.state.exch[0].toUSDRate).toFixed(3);
            }

            var payed = false;
            if (this.state.method !== 'payLater') {
                console.log(this.state.method);
                this.setState({ hasPayed: true });
                payed = true;
            }
            //storing the sale in the database
            const newSale = {
                ticketNumber: this.state.tickNum,
                saleType: this.state.setType,
                fare: z,
                currency: this.state.cCode,
                localTax: this.state.Tlocal,
                otherTax: this.state.Tother,
                paymentMethod: this.state.method,
                creditCardNum: this.state.creditNum,
                expDate: this.state.expDate,
                securityCode: this.state.secCode,
                commissionRate: cd,
                custName: w,
                advisorCode: ad,
                saleDate: dt,
                notes: this.state.notes,
                hasPayed: payed,
                USDExchangeRate: this.state.exch[0].toUSDRate,
            };
            axios
                .post(apiLinks.SALES, newSale)
                .then((response) => {
                    console.log(response);
                    console.log(this.state.exch);
                })
                .catch((res) => console.log(res));

            //USING THE BLANK/ADDING TO THE USED DATABASE SECTION
            let d = new Date(Date.now());
            d.setHours(0, 0, 0, 0);
            const newUsed = {
                date: d,
                batchValues: this.state.tickNum,
                advisorCode: ad,
                batchId: this.state.myId,
                custName: w,
            };

            axios
                .post(apiLinks.USED, newUsed)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => console.log('Error code: ', err));

            //UPDATING ASSIGNMENT - REMOVING FROM ASSIGNED LIST
            let x = this.state.blanks[0].remaining;
            let y;
            for (var i = 0; i < x.length; i++) {
                if (x[i] == this.state.tickNum) {
                    y = i;
                }
            }
            x.splice(y, 1);

            const updatedBlank = {
                batchValues: this.state.blanks[0].batchValues,
                batchStart: this.state.blanks[0].batchStart,
                batchEnd: this.state.blanks[0].batchEnd,
                date: this.state.blanks[0].date,
                batchType: this.state.blanks[0].batchType,
                amount: this.state.blanks[0].amount,
                remaining: x,
            };

            axios
                .put(apiLinks.ASSIGN + '/' + this.state.myId, updatedBlank)
                .catch((err) => console.log('Error code: ', err));

            // updating customer account to reflect fare
            if (w !== 'Casual Customer') {
                let x;

                if (this.state.customers[i2].paidThisMonth != undefined) {
                    x = this.state.customers[i2].paidThisMonth;
                } else {
                    x = 0;
                }

                const updatedCustomer = {
                    _id: this.state.customers[i2]._id,
                    firstName: this.state.customers[i2].firstName,
                    lastName: this.state.customers[i2].lastName,
                    address: this.state.customers[i2].address,
                    phoneNumber: this.state.customers[i2].phoneNumber,
                    discount: this.state.customers[i2].discount,
                    customerType: this.state.customers[i2].customerType,
                    discountName: this.state.customers[i2].discountName,
                    discountType: this.state.customers[i2].discountType,
                    paidThisMonth: parseFloat(x) + parseFloat(this.state.fare),
                };

                axios
                    .put(
                        apiLinks.CUSTOMERS + '/' + this.state.customers[i2]._id,
                        updatedCustomer
                    )
                    .catch((err) => console.log('Error code: ', err));
            }

           alert(this.state.tickNum + " has been sold");


            this.props.history.push('/sales');
        }

        return (
            <Container>
                <h2>Make a Sale</h2>
                <Form onSubmit={submitSale.bind(this)}>
                    <Dropdown
                        onSelect={(key) => {
                            this.setState({ method: key });
                        }}
                    >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.method}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Cash">Cash</Dropdown.Item>
                            <Dropdown.Item eventKey="CreditCard">
                                Credit card
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="payLater">
                                Pay Later
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <br />

                    <FormLabel>Ticket Number</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.tickNum}
                        onChange={(e) => {
                            this.setState({
                                tickNum: e.target.value,
                            });
                        }}
                    />
                    <FormLabel>Fare</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.fare}
                        onChange={(e) => {
                            this.setState({
                                fare: e.target.value,
                            });
                        }}
                    />

                    <Fragment>{this.creditHandler()}</Fragment>
                    <Fragment>{this.taxHandler()}</Fragment>

                    <FormLabel>Other Tax</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.Tother}
                        onChange={(e) => {
                            this.setState({ Tother: e.target.value });
                        }}
                    />

                    <FormLabel>Customer Name</FormLabel>
                    {/* <FormControl
                        autoFocus
                        type="string"
                        value={this.state.custName}
                        onChange={e => {
                            this.setState({
                                custName: e.target.value
                            });
                        }}
                    /> */}
                    <Autocomplete
                        id="combo-box-customers"
                        options={this.state.customers}
                        getOptionLabel={(option) =>
                            option.firstName +
                            ' ' +
                            option.lastName +
                            ' ID: ' +
                            option._id
                        }
                        style={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Customers"
                                variant="outlined"
                            />
                        )}
                        onChange={(event, value) => {
                            this.setState({
                                ...this.state,
                                custName: value._id,
                            });
                        }}
                    />

                    <FormLabel>Notes</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.notes}
                        onChange={(e) => {
                            this.setState({
                                notes: e.target.value,
                            });
                        }}
                    />

                    <Button bssize="medium" type="submit">
                        Sell Ticket
                    </Button>
                </Form>
            </Container>
        );
    }
}
