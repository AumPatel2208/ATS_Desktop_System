import { Button, Container } from 'reactstrap';
import React, { Component, Fragment } from 'react';
import { Dropdown, Form, FormControl, FormLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { GetUser } from '../store/User';

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
                USDExchange: ''
            },
            exch: [],
            cCode: 'USD',
            myId: '',
            blanks: [],
            customers: [],
            discounts: []
        };
    }
    async componentDidMount() {
        const {
            match: { params }
        } = this.props;
        const l = params.id.split('-');

        this.setState({ tickNum: l[1] });
        this.setState({ myId: l[0] });

        //getting the day's exchange rate for the given currency
        const getLink = apiLinks.EXCHANGERATES + '/sale';
        await axios
            .get(getLink)
            .then(res => {
                const exchData = res.data;
                this.setState({
                    ...this.state.exch,
                    exch: exchData
                });
                console.log(this.state.exch);
            })
            .catch(err => console.log('Error code: ', err));

        //getting the originally assigned amount to remove the sold ticket
        await axios
            .get(apiLinks.ASSIGN)
            .then(res => {
                const blanks = res.data;
                this.setState({ blanks });
            })
            .catch(err => console.log('Error code: ', err));

        //getting the customer in order to apply discount
        await axios
            .get(apiLinks.CUSTOMERS)
            .then(res => {
                const customers = res.data;
                this.setState({ customers });
            })
            .catch(err => console.log('Error code: ', err));

        //getting discount to apply to the fare
        await axios
            .get(apiLinks.DISCOUNT)
            .then(res => {
                const discounts = res.data;
                this.setState({ discounts });
            })
            .catch(err => console.log('Error code: ', err));
    }

    creditHandler() {
        if (this.state.method === 'CreditCard') {
            return (
                <Fragment>
                    <FormLabel>Credit Card Number</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.creditNum}
                        onChange={e => {
                            this.setState({
                                creditNum: e.target.value
                            });
                        }}
                    />
                    <FormLabel>Expiration Date</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.expDate}
                        onChange={e => {
                            this.setState({
                                expDate: e.target.value
                            });
                        }}
                    />
                    <FormLabel>Security Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.secCode}
                        onChange={e => {
                            this.setState({
                                secCode: e.target.value
                            });
                        }}
                    />
                </Fragment>
            );
        }
    }

    taxHandler() {
        if (this.state.saleType === 'Interline') {
            return (
                <Fragment>
                    <FormLabel>Local Tax</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.Tlocal}
                        onChange={e => {
                            this.setState({
                                Tlocal: e.target.value
                            });
                        }}
                    />
                    <FormLabel>Currency Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.cCode}
                        onChange={e => {
                            this.setState({
                                cCode: e.target.value
                            });
                        }}
                    />
                </Fragment>
            );
        }
    }

    render() {
        function submitSale(event) {
            const bl = this.state.blanks.filter(
                i => String(i._id) === this.state.myId
            );
            this.setState({ blanks: bl });

            let dt = new Date(Date.now());
            dt.setHours(0, 0, 0, 0);

            event.preventDefault();

            //  this.setState({ adCode: GetUser.advisorCode });
            // this.setState({ commissionRate: GetUser.commissionRate });
            var ad;
            {
                this.props.staff !== undefined
                    ? (ad = `${this.props.staff.advisorCode}`)
                    : (ad = 'undefined');
            }

            var cd;
            {
                this.props.staff !== undefined
                    ? (cd = `${this.props.staff.commissionRate}`)
                    : (cd = 'undefined');
            }

            this.setState({ rate: cd });
            this.setState({ adCode: ad });

            //getting the correct customer and applying the discount to the fare
            //filtering by ID
            const cl = this.state.customers.filter(
                i => String(i._id) === this.state.custName
            );
            this.setState({ customers: cl });

            if (this.state.customers[0] != undefined) {
                const dl = this.state.discounts.filter(
                    i => String(i.name) === this.state.customers[0].discountName
                );
                this.setState({ discounts: dl });

                if (this.state.customers[0].discountType === "Fixed") {
                    let x = parseFloat(this.state.discounts[0].fixed);
                //assigning correct discount to the fare
                    let y = this.state.fare;
                    let z = y - y * (x / 100);
                    this.setState({ fare: z });
                } else if (
                    this.state.customers[0].discountType === 'Flexible'
                ) {
                    let z;
                    let x = parseFloat(this.state.customers[0].paidThisMonth);
                    if (x < this.state.discounts[0].flexibleBand1) {
                        z =
                            this.state.fare -
                            this.state.fare *
                                (this.state.discounts[0].band1Value / 100);
                    } else if (x < this.state.discounts[0].flexibleBand2) {
                        z =
                            this.state.fare -
                            this.state.fare *
                                (this.state.discounts[0].band2Value / 100);
                    } else if (x < this.state.discounts[0].flexibleBand3) {
                        z =
                            this.state.fare -
                            this.state.fare *
                                (this.state.discounts[0].band3Value / 100);
                    }
                    this.setState({ fare: z });
                }
            }
            //storing the sale in the database

            const newSale = {
                ticketNumber: this.state.tickNum,
                saleType: this.state.saleType,
                fare: this.state.fare,
                currency: this.state.cCode,
                localTax: this.state.Tlocal,
                otherTax: this.state.Tother,
                paymentMethod: this.state.method,
                creditCardNum: this.state.creditNum,
                expDate: this.state.expDate,
                securityCode: this.state.secCode,
                commissionRate: this.state.rate,
                custName: this.state.custName,
                advisorCode: this.state.adCode,
                saleDate: dt,
                notes: this.state.notes,
                USDExchangeRate: this.state.exch[0].toUSDRate
            };
            axios
                .post(apiLinks.SALES, newSale)
                .then(response => {
                    console.log(response);
                    console.log(this.state.exch);
                })
                .catch(res => console.log(res));

            //USING THE BLANK/ADDING TO THE USED DATABASE SECTION
            let d = new Date(Date.now());
            d.setHours(0, 0, 0, 0);

            const newUsed = {
                date: d,
                batchValues: this.state.tickNum,
                advisorCode: this.state.adCode,
                batchId: this.state.myId
            };

            axios
                .post(apiLinks.USED, newUsed)
                .then(response => {
                    console.log(response);
                })
                .catch(err => console.log('Error code: ', err));

            //UPDATING ASSIGNMENT - REMOVING FROM ASSIGNED LIST
            let x = this.state.blanks[0].remaining;

            let i = 0;
            for (i = 0; i < x.length; i++) {
                if (x[i] == this.state.tickNum) break;
            }
            if (i < x.length) {
                x.splice(i, 1);
            } else {
                return;
            }


            const updatedBlank = {
                batchValues: this.state.blanks[0].batchValues,
                batchStart: this.state.blanks[0].batchStart,
                batchEnd: this.state.blanks[0].batchEnd,
                date: this.state.blanks[0].date,
                batchType: this.state.blanks[0].batchType,
                amount: this.state.blanks[0].amount,
                remaining: x
            };

            axios
                .put(apiLinks.ASSIGN + '/' + this.state.myId, updatedBlank)
                .catch(err => console.log('Error code: ', err));

            // updating customer account to reflect fare
            if (this.state.customers[0] != undefined) {
                let x;
                if (this.state.customers[0].paidThisMonth != undefined) {
                    x = this.state.customers[0].paidThisMonth;
                } else {
                    x = 0;
                }

                const updatedCustomer = {
                    _id: this.state.customers[0]._id,
                    firstName: this.state.customers[0].firstName,
                    lastName: this.state.customers[0].lastName,
                    address: this.state.customers[0].address,
                    phoneNumber: this.state.customers[0].phoneNumber,
                    discount: this.state.customers[0].discount,
                    customerType: this.state.customers[0].customerType,
                    discountName: this.state.customers[0].discountName,
                    discountType: this.state.customers[0].discountType,
                    paidThisMonth: parseFloat(x) + parseFloat(this.state.fare)
                };

                axios
                    .put(
                        apiLinks.CUSTOMERS + '/' + this.state.customers[0]._id,
                        updatedCustomer
                    )
                    .catch(err => console.log('Error code: ', err));
            }
        }

        return (
            <Container>
                <h2>Make a Sale</h2>
                <Form onSubmit={submitSale.bind(this)}>
                    <Dropdown
                        onSelect={key => {
                            this.setState({ saleType: key });
                        }}
                    >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.saleType}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Domestic">
                                Domestic
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Interline">
                                Interline
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <br />
                    <Dropdown
                        onSelect={key => {
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
                        </Dropdown.Menu>
                    </Dropdown>

                    <br />

                    <FormLabel>Ticket Number</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.tickNum}
                        onChange={e => {
                            this.setState({
                                tickNum: e.target.value
                            });
                        }}
                    />
                    <FormLabel>Fare</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.fare}
                        onChange={e => {
                            this.setState({
                                fare: e.target.value
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
                        onChange={e => {
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
                        getOptionLabel={option =>
                            option.firstName +
                            ' ' +
                            option.lastName +
                            ' ID: ' +
                            option._id
                        }
                        style={{ width: 300 }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Customers"
                                variant="outlined"
                            />
                        )}

                        onChange={(event, value) => {
                            this.setState({
                                ...this.state,
                                custName: value._id
                            });
                        }}

                         /*
                        onChange={option => {
                            this.setState({
                                custName: option.target.value._id
                            });
                        }}

                          */

                    />

                    <FormLabel>Notes</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.notes}
                        onChange={e => {
                            this.setState({
                                notes: e.target.value
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
