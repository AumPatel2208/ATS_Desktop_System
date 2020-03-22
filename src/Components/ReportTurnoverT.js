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


export default class ReportTurnoverT extends Component{
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        blanks: [],
        assign: 'assigned'
    };
//TODO: handle discounts in the customer section
    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        axios.get(apiLinks.BLANKS).then(res => {
            const blanks = res.data;
            this.setState({ blanks });
        });
    }

    onOpenClick(e, _id) {
        console.log(e, _id);
    }
    render() {
        const row = (
            _id,
            batchValues,
            date,
            batchType,
            amount,
            assigned,
            used,

        ) => (
            <Fragment>
                <tr key={_id}>
                    <td>{batchValues}</td>
                    <td>{date}</td>
                    <td>{batchType}</td>
                    <td>{amount}</td>
                    <td>{assigned}</td>
                    <td>{used}</td>
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
                <h4>Received Blanks</h4>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>Batch</th>
                        <th>Date</th>
                        <th>Batch Quantity</th>
                        <th>New Blanks Assigned</th>
                        <th>Advisor Assigned To</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.blanks.map(
                        ({
                             _id,
                            batchValues,
                            date,
                            amount,

                         }) => (
                            <Fragment key={_id}>
                                {row(
                                    _id,
                                    batchValues,
                                    date,
                                    amount,
                                )}
                            </Fragment>

                        )
                    )}
                    </tbody>
                </Table>
                <h4>Assigned and Used Blanks</h4>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>Assigned Blanks</th>
                        <th>Advisor Code</th>
                        <th>Batch Quantity</th>
                        <th>Used Blanks</th>
                        <th>Amount Used</th>

                    </tr>
                    </thead>
                    <tbody>
                    { this.state.blanks.map(
                        ({
                             _id,
                             batchValues,
                             advisorCode,
                             amount,
                            used,
                           // amount

                         }) => (
                            <Fragment key={_id}>
                                {row(
                                    _id,
                                    batchValues,
                                    advisorCode,
                                    amount,
                                    used,
                                   // amount
                                )}
                            </Fragment>

                        )
                    )}
                    </tbody>
                </Table>
                <h4>Final Amounts</h4>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>Available Blanks </th>
                        <th>Amount</th>
                        <th>Advisor Code</th>
                        <th>Advisor Blanks</th>
                        <th>Amount</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.blanks.map(
                        ({
                             _id,
                             batchValues,
                             date,
                             amount,

                         }) => (
                            <Fragment key={_id}>
                                {row(
                                    _id,
                                    batchValues,
                                    date,
                                    amount,
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



