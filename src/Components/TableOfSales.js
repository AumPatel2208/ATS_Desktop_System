import React, { Component, Fragment } from 'react';
import { Container, Table } from 'reactstrap';
import axios from 'axios';
import {
    Form,
    FormGroup,
    FormLabel,
    FormControl,
    Dropdown,
    Button,
} from 'react-bootstrap';
import SaleEditor from './SaleEditor';
import { withRouter } from 'react-router';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');

class TableOfSales extends Component {
    mounted = false; //to make sure server process is stopped
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        sales: [{}],
        filterString: '',
        filterCondition: 'Please Select',
        sort: 'Please Select',
    };

    //runs when component mounts, use to gets the data from db
    async componentDidMount() {
        this.mounted = true;

        await axios
            .get('/api/sales/')
            .then(async (res) => {
                if (this.mounted) {
                    // console.log(res.data);
                    // const salesTemp = await res.data;
                    this.setState({ ...this.state, sales: await res.data });

                    var changedSales = this.state.sales.map((sale) => {
                        if (sale.ticketNumber === undefined)
                            sale.ticketNumber = 'Empty.';
                        if (sale.fare === undefined) sale.fare = 'Empty.';
                        if (sale.currency === undefined)
                            sale.currency = 'Empty.';
                        if (sale.USDExchangeRate === undefined)
                            sale.USDExchangeRate = 'Empty.';
                        if (sale.paymentMethod === undefined)
                            sale.paymentMethod = 'Empty.';
                        if (sale.creditCardNum === undefined)
                            sale.creditCardNum = 'Empty.';
                        if (sale.expDate === undefined) sale.expDate = 'Empty.';
                        if (sale.securityCode === undefined)
                            sale.securityCode = 'Empty.';
                        if (sale.commissionRate === undefined)
                            sale.commissionRate = 'Empty.';
                        if (sale.advisorCode === undefined)
                            sale.advisorCode = 'Empty.';
                        if (sale.saleDate === undefined)
                            sale.saleDate = 'Empty.';
                        if (sale.paymentDate === undefined)
                            sale.paymentDate = 'Empty.';
                        if (sale.notes === undefined) sale.notes = 'Empty.';
                        if (sale.saleType === undefined)
                            sale.saleType = 'Empty.';
                        if (sale.localTax === undefined)
                            sale.localTax = 'Empty.';
                        if (sale.otherTax === undefined)
                            sale.otherTax = 'Empty.';
                        if (sale.custName === undefined)
                            sale.custName = 'Empty.';
                        if (
                            sale.isRefunded === undefined ||
                            sale.isRefunded === false
                        )
                            sale.isRefunded = 'No';
                        if (sale.isRefunded === true) sale.isRefunded = 'Yes';
                        if (
                            sale.hasPayed === undefined ||
                            sale.hasPayed === false
                        )
                            sale.hasPayed = 'No';
                        if (sale.hasPayed === true) sale.hasPayed = 'Yes';
                        return sale;
                    });
                    console.log(changedSales);

                    // this.setState({ sales: changedSales });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async onRefundClick(_id) {
        console.log(_id);
        const index = this.state.sales.findIndex((sale) => sale._id === _id);
        var tempSales = this.state.sales;
        tempSales[index].isRefunded = true;

        await axios
            .put('/api/sales/refund/' + _id, tempSales[index])
            .then((res) => {
                alert('Refund Logged. Response: ', res);
                tempSales[index].isRefunded = 'Yes';
                this.setState({ sales: tempSales });
            })
            .catch((err) => console.log('Refund Failed. Error Code: ', err));
    }

    filterPayed() {
        this.setState({
            sales: this.state.sales.filter(
                (sale) => String(sale.hasPayed) === 'No'
            ),
        });
    }

    filter() {
        if (
            !(
                this.state.filterCondition === 'Please Select' ||
                this.state.filterString === ''
            )
        ) {
            this.setState({
                sales: this.state.sales.filter(
                    (advisor) =>
                        String(advisor[this.state.filterCondition]) ===
                        String(this.state.filterString)
                ),
            });
        }
    }
    async reset() {
        await axios
            .get('http://localhost:5000/api/sales')
            .then(async (res) => {
                const salesTemp = await res.data;
                this.setState({ sales: salesTemp });
            })
            .catch((err) => console.log('Error code: ', err));
        // this.filterSales();
    }
    sortList(key) {
        this.setState({
            sales: []
                .concat(this.state.sales)
                .sort((a, b) => (a[`${key}`] > b[`${key}`] ? 1 : -1)),
        });
    }
    onFakeSubmit(e) {
        e.preventDefault();
    }
    render() {
        /**
         * Will return a Fragment to be used when mapping in the render function.
         * Allows to break down the data into rows and TD.
         * @param {The MongoDB ID of the object in the collection} _id
         */
        const row = (
            _id,
            ticketNumber,
            fare,
            currency,
            USDExchangeRate,
            paymentMethod,
            creditCardNum,
            expDate,
            securityCode,
            commissionRate,
            advisorCode,
            saleDate,
            paymentDate,
            notes,
            saleType,
            localTax,
            otherTax,
            custName,
            hasPayed,
            isRefunded
        ) => (
            <Fragment key={_id}>
                <tr key={_id}>
                    {/* <td>{_id}</td> */}
                    <td>{ticketNumber}</td>
                    <td>{fare}</td>
                    <td>{currency}</td>
                    <td>{USDExchangeRate}</td>
                    <td>{paymentMethod}</td>
                    <td>{creditCardNum}</td>
                    <td>{expDate}</td>
                    <td>{securityCode}</td>
                    <td>{commissionRate}</td>
                    <td>{advisorCode}</td>
                    <td>{saleDate}</td>
                    <td>{paymentDate}</td>
                    <td>{notes}</td>
                    <td>{saleType}</td>
                    <td>{localTax}</td>
                    <td>{otherTax}</td>
                    <td>{custName}</td>
                    <td>{hasPayed}</td>
                    <td>{isRefunded}</td>
                    <td>
                        {isRefunded === 'No' || !isRefunded ? (
                            <Button
                                className="open-btn"
                                variant="outline-warning"
                                size="lg"
                                onClick={this.onRefundClick.bind(this, _id)}
                            >
                                REFUND
                            </Button>
                        ) : null}
                        <p></p>
                        <p></p>

                        {hasPayed === 'No' || !hasPayed ? (
                            <Button
                                className="open-btn"
                                variant="outline-warning"
                                size="lg"
                                // href={}
                                onClick={() => {
                                    this.props.history.push(
                                        `/sale_edit/${_id}`
                                    );
                                }}
                            >
                                PAY
                            </Button>
                        ) : null}
                    </td>
                </tr>
            </Fragment>
        );

        return (
            <Container>
                <Form onSubmit={this.onFakeSubmit}>
                    <FormGroup controlId="filterCondition" bssize="large">
                        <FormLabel>Filter Condition</FormLabel>
                        <Dropdown
                            onSelect={(key) => {
                                this.setState({ filterCondition: key });

                                // console.log(_.startCase(key));
                            }}
                        >
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {_.startCase(this.state.filterCondition)}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="ticketNumber">
                                    Ticket Number
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="fare">
                                    Fare
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="currency">
                                    Currency
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="USDExchangeRate">
                                    USD Exchange Rate
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="paymentMethod">
                                    Payment Method
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="creditCardNum">
                                    Credit Card Number
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="expDate">
                                    Expiry Date
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="securityCode">
                                    Security Code
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="commissionRate">
                                    Commission Rate
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="advisorCode">
                                    Advisor Code
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="saleDate">
                                    Sale Date
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="paymentDate">
                                    Payment Date
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="notes">
                                    Notes
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="saleType">
                                    Sale Type
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="localTax">
                                    Local Tax
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="otherTax">
                                    Other Tax
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="custName">
                                    Customer Name
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="hasPayed">
                                    Has Payed
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="isRefunded">
                                    Is Refunded
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FormGroup>
                    <FormGroup controlId="lastName" bssize="large">
                        <FormLabel>Filter: </FormLabel>
                        <FormControl
                            autoFocus
                            type="string"
                            value={this.state.filterString}
                            onChange={(e) => {
                                this.setState({
                                    filterString: e.target.value,
                                });
                            }}
                        />
                    </FormGroup>
                    <Button
                        bssize="large"
                        variant="outline-primary"
                        onClick={() => this.filter()}
                        block
                    >
                        Filter
                    </Button>{' '}
                    <Button
                        bssize="large"
                        variant="outline-danger"
                        onClick={() => this.reset()}
                        block
                    >
                        Reset
                    </Button>{' '}
                    <Button
                        bssize="large"
                        variant="info"
                        onClick={() => {
                            this.props.history.push('./sale');
                        }}
                        block
                    >
                        Sell Ticket
                    </Button>
                </Form>
                <br></br>
                <br></br>
                <Form>
                    <FormGroup controlId="sort" bssize="large">
                        <FormLabel>Sort</FormLabel>
                        <Dropdown
                            onSelect={(key) => {
                                this.setState({ sort: key });
                                this.sortList(key);
                            }}
                        >
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {_.startCase(this.state.sort)}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="ticketNumber">
                                    Ticket Number
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="fare">
                                    Fare
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="currency">
                                    Currency
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="USDExchangeRate">
                                    USD Exchange Rate
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="paymentMethod">
                                    Payment Method
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="creditCardNum">
                                    Credit Card Number
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="expDate">
                                    Expiry Date
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="securityCode">
                                    Security Code
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="commissionRate">
                                    Commission Rate
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="advisorCode">
                                    Advisor Code
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="saleDate">
                                    Sale Date
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="paymentDate">
                                    Payment Date
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="notes">
                                    Notes
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="saleType">
                                    Sale Type
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="localTax">
                                    Local Tax
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="otherTax">
                                    Other Tax
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="custName">
                                    Customer Name
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="hasPayed">
                                    Has Payed
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="isRefunded">
                                    Is Refunded
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FormGroup>
                </Form>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            {/* <th>_id</th> */}
                            <th>Ticket Number</th>
                            <th>Fare</th>
                            <th>Currency</th>
                            <th>USD Exchange Rate</th>
                            <th>Payment Method</th>
                            <th>Credit Card Number</th>
                            <th>Expiry Date</th>
                            <th>Security Code</th>
                            <th>Commission Rate</th>
                            <th>Advisor Code</th>
                            <th>Sale Date</th>
                            <th>Payment Date</th>
                            <th>Notes</th>
                            <th>Sale Type</th>
                            <th>Local Tax</th>
                            <th>Other Tax</th>
                            <th>Customer Name</th>
                            <th>Has Payed</th>
                            <th>Is Refunded</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.sales.map((sale) => (
                            <Fragment key={sale._id}>
                                {row(
                                    sale._id,
                                    sale.ticketNumber,
                                    sale.fare,
                                    sale.currency,
                                    sale.USDExchangeRate,
                                    sale.paymentMethod,
                                    sale.creditCardNum,
                                    sale.expDate,
                                    sale.securityCode,
                                    sale.commissionRate,
                                    sale.advisorCode,
                                    sale.saleDate,
                                    sale.paymentDate,
                                    sale.notes,
                                    sale.saleType,
                                    sale.localTax,
                                    sale.otherTax,
                                    sale.custName,
                                    sale.hasPayed,
                                    sale.isRefunded
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
export default withRouter(TableOfSales);
