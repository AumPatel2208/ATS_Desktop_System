import React, { Component, Fragment, } from 'react';
import { Container, Table, Button } from 'reactstrap';
import axios from 'axios';
import {
    Form,
    FormGroup,
    Dropdown, FormControl
} from 'react-bootstrap';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');
export default class ReportTableI extends Component {
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        sales: [],
        saleT: 'saleType',
       // advisorCode: "",
        saleTypeValue: 'Choose Sale Type'
    };
//TODO: add in advisor filtering so just one advisor
    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        axios.get(apiLinks.SALES).then(res => {
            const sales = res.data;
            this.setState({ sales });
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
            // add in credit data
            commissionRate,
            advisorCode,
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
                    <td>{commissionRate}</td>
                    <td>{advisorCode}</td>
                    <td>{saleDate}</td>
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
                                                "interline")
                                    });
                                } else {
                                    this.setState({
                                        sales: this.state.sales.filter(
                                            sale =>
                                                String(sale[this.state.saleT]) ===
                                                "domestic")
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
                    </FormGroup>

                </Form>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>Ticket Number</th>
                        <th>Fare</th>
                        <th>Currency</th>
                        <th>USD Exchange Rate</th>
                        <th>Payment Method</th>
                        <th>Commission Rate</th>
                        <th>Advisor Code</th>
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
                             USDExchangeRate,
                             paymentMethod,
                             // add in credit data
                             commissionRate,
                             advisorCode,
                             saleDate,
                             notes
                         }) => (
                            <Fragment key={_id}>
                                {row(
                                    _id,
                                    ticketNumber,
                                    fare,
                                    currency,
                                    USDExchangeRate,
                                    paymentMethod,
                                    // add in credit data
                                    commissionRate,
                                    advisorCode,
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

