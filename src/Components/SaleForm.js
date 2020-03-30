import { Button, Container, Table } from 'reactstrap';
import React, { Component, Fragment } from 'react';
import {
    Dropdown,
    Form,
    FormControl,
    FormGroup,
    FormLabel
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useStoreState } from 'pullstate';
import { UserStore } from '../store/UserStore';
import { GetUSer } from '../store/User';

let apiLinks = require('../api/config.json');

export class SaleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            stats: {}
        };
    }

    state = {
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
        blanks: []
    };

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

        //filtering by ID
        //const bl = this.state.blanks.filter(i => String(i._id )=== this.state.myId)
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

            let dt = new Date(Date.now());
            dt.setHours(0, 0, 0, 0);

            event.preventDefault();

            this.setState({ adCode: GetUSer.advisorCode });
            this.setState({ commissionRate: GetUSer.commissionRate });

            this.setState({ adCode: GetUSer.advisorCode });
            this.setState({ commissionRate: GetUSer.commissionRate });


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
                //advisorCode: this.props.staff.advisorCode,
                advisorCode: 380,
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
            let y = x.findIndex(k => k === this.state.tickNum);
            x.splice(y);

            const updatedBlank = {
                _id: this.state.blanks._id,
                batchValues: this.state.blanks.batchValues,
                batchStart: this.state.blanks.batchStart,
                batchEnd: this.state.blanks.batchEnd,
                date: this.state.blanks.date,
                batchType: this.state.blanks.batchType,
                amount: this.state.blanks.amount,
                remaining: x
            };

            axios
                .put(apiLinks.ASSIGN + '/' + this.state.myId, updatedBlank)
                .catch(err => console.log('Error code: ', err));

            axios
                .put(apiLinks.ASSIGN + '/' + this.state.myId, updatedBlank)
                .catch(err => console.log('Error code: ', err));
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
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.custName}
                        onChange={e => {
                            this.setState({
                                custName: e.target.value
                            });
                        }}
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
