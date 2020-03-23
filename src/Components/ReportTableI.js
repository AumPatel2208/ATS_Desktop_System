import React, { Component, Fragment, } from 'react';
import { Container, Table, Button } from 'reactstrap';
import axios from 'axios';
import {
    Form,
    FormGroup,
    Dropdown, FormControl, FormLabel
} from 'react-bootstrap';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');
export default class ReportTableI extends Component {
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        sales: [],
        saleT: 'saleType',
        code: 'advisorCode',
        inputCode: '',
        saleTypeValue: 'Choose Sale Type',
        ed: '',
        sd: ''
    };
    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        let start = this.state.sd;
        let end = this.state.ed;
        axios.get(apiLinks.SALES +'/byDate',{params:{start, end}}).then(res => {
            const sales = res.data;
            this.setState({sales});
        });
    }

    onOpenClick(e, _id) {
        console.log(e, _id);
    }
    render() {
        const row = (
            _id,
            ticketNumber,
            fare,
            currency,
            USDExchangeRate,
            paymentMethod,
            advisorCode,
            commissionRate,
            creditCardNum,
            expDate,
            securityCode,
            saleDate,
            notes,
            saleType
        ) => (
            <Fragment>
                <tr key={_id}>
                    <td>{ticketNumber}</td>
                    <td>{fare}</td>
                    <td>{currency}</td>
                    <td>{USDExchangeRate}</td>
                    <td>{advisorCode}</td>
                    <td>{saleDate}</td>
                    <td>{commissionRate}</td>
                    <td>{creditCardNum}</td>
                    <td>{expDate}</td>
                    <td>{securityCode}</td>
                    <td>{notes}</td>
                    <td>{saleType}</td>
                    <td>
                        <Button
                            className="open-btn"
                            color="primary"
                            size="sm"
                            onClick={this.onOpenClick.bind(this, _id)}
                        >
                            open
                        </Button>
                    </td>
                </tr>
            </Fragment>
        );

        return (
            <Container>
                <Form>
                    <FormGroup controlId="saleT" bssize="large">

                        <Dropdown
                            onSelect={key => {
                                this.setState({saleTypeValue: key});

                                if (key === "Interline") {
                                    this.setState({
                                        sales: this.state.sales.filter(
                                            sale =>
                                                String(sale[this.state.saleT]) ===
                                                "Interline")
                                    });
                                } else {
                                    this.setState({
                                        sales: this.state.sales.filter(
                                            sale =>
                                                String(sale[this.state.saleT]) ===
                                                "Domestic")
                                    });
                                }
                            }}

                        >
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {_.startCase(this.state.saleTypeValue)}
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
                        <FormLabel>From</FormLabel>
                        <FormControl
                            autoFocus
                            type="string"
                            value={this.state.sd}
                            onChange={e => {
                                this.setState({
                                    sd: e.target.value
                                });
                            }}
                        />
                        <FormLabel>To</FormLabel>
                        <FormControl
                            autoFocus
                            type="string"
                            value={this.state.ed}
                            onChange={e => {
                                this.setState({
                                    ed: e.target.value
                                });
                            }}
                        />
                        <FormLabel>Enter Advisor Code</FormLabel>
                        <FormControl
                            autoFocus
                            type="string"
                            value={this.state.sales.inputCode}
                            onChange={e => {
                                this.setState({
                                    inputCode: e.target.value
                                });
                            }}
                        />
                        <Button
                            bssize="medium"
                            variant="outline-danger"
                            onClick={() => {
                                let start = this.state.sd;
                                let end = this.state.ed;

                                axios.get( apiLinks.BLANKS +'/byDate',{params:{start, end}}).then(res => {
                                    const sales = res.data;
                                    this.setState({sales});
                                });

                                this.setState({
                                sales: this.state.sales.filter(
                                    sale =>
                                            String(sale[this.state.code]) ===
                                         String(this.state.inputCode))

                            })}}
                            block
                        >
                            Generate Report
                        </Button>
                    </FormGroup>

                </Form>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>Ticket Number</th>
                        <th>Fare</th>
                        <th>Currency</th>
                        <th>Payment Method</th>
                        <th>Advisor Code</th>
                        <th>USD Exchange Rate</th>
                        <th>Commission Rate</th>
                        <th>Card Number</th>
                        <th>Expiration Date</th>
                        <th>Security Code</th>
                        <th>Sale Date</th>
                        <th>Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.sales.map(
                        ({
                             _id,
                             ticketNumber,
                             fare,
                             currency,
                             paymentMethod,
                             advisorCode,
                             USDExchangeRate,
                             commissionRate,
                             creditCardNum,
                             expDate,
                             securityCode,
                             saleDate,
                             notes
                         }) => (
                            <Fragment key={_id}>
                                {row(
                                    _id,
                                    ticketNumber,
                                    fare,
                                    currency,
                                    paymentMethod,
                                    commissionRate,
                                    creditCardNum,
                                    expDate,
                                    securityCode,
                                    advisorCode,
                                    USDExchangeRate,
                                    saleDate,
                                    notes
                                )}
                            </Fragment>
                        )
                    )}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

