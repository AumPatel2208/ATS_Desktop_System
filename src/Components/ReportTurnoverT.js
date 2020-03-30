import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Table, Button, Col } from 'reactstrap';
import axios from 'axios';
import {
    Form,
    FormGroup,
    Dropdown,
    FormControl,
    FormLabel
} from 'react-bootstrap';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');

export default class ReportTurnoverT extends Component {
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        blanks: [],
        aBlanks: [],
        uBlanks: [],
        assigns: [],
        assign: 'assigned',
        batch: 'batchValues',
        sd: '',
        startDate: new Date(),
        endDate: new Date(),
        ed: ''
    };
    //runs when component mounts, use to gets the data from db

    componentDidMount() {}

    /*




    onOpenClick(e, _id) {
        console.log(e, _id);
    }

 */

    render() {
        const row = (_id, batchValues, date, amount, advisorCode) => (
            <Fragment key={_id}>
                <tr>
                    <td>{_id}</td>
                    <td>{batchValues}</td>
                    <td>{date}</td>
                    <td>{amount}</td>
                    <td>{advisorCode}</td>

                    <td></td>
                </tr>
            </Fragment>
        );

        const row2 = (batchValues, advisorCode, amount) => (
            <Fragment>
                <tr>
                    <td>{batchValues}</td>
                    <td>{advisorCode}</td>
                    <td>{amount}</td>
                    <td></td>
                </tr>
            </Fragment>
        );

        return (
            <Container>
                <br></br>

                <FormLabel>From: </FormLabel>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={date => {
                        this.setState({
                            startDate: date
                        });
                    }}
                />
                <br />
                <FormLabel>To: </FormLabel>
                <DatePicker
                    selected={this.state.endDate}
                    onChange={date => {
                        this.setState({
                            endDate: date
                        });
                    }}
                />

                <br />
                <Button
                    bssize="medium"
                    variant="outline-danger"
                    onClick={async () => {
                        let start = new Date(this.state.startDate);
                        let end = new Date(this.state.endDate);
                        start.setHours(0, 0, 0, 0);
                        end.setHours(0, 0, 0, 0);

                        await axios
                            .get(apiLinks.BLANKS + '/byDate', {
                                params: { start, end }
                            })
                            .then(res => {
                                const blanks = res.data;
                                this.setState({ blanks });
                            })
                            .catch(err => console.log('Error code: ', err));

                        await axios
                            .get(apiLinks.ASSIGN + '/byDate', {
                                params: { start, end }
                            })
                            .then(res => {
                                const aBlanks = res.data;
                                this.setState({ aBlanks });
                            })
                            .catch(err => console.log('Error code: ', err));

                        await axios
                            .get(apiLinks.USED + '/byDate', {
                                params: { start, end }
                            })
                            .then(res => {
                                const uBlanks = res.data;
                                this.setState({ uBlanks });
                            })
                            .catch(err => console.log('Error code: ', err));
                    }}
                >
                    Enter Dates
                </Button>
                <br></br>
                <br></br>

                <h4>Received Blanks</h4>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Batch</th>
                            <th>Date</th>
                            <th>Batch Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.blanks.map(
                            ({ batchValues, date, amount }) => (
                                <Fragment>
                                    {row(batchValues, date, amount)}
                                </Fragment>
                            )
                        )}
                    </tbody>
                </Table>

                <h4>Assigned Received Blanks</h4>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>New Blanks Assigned</th>
                            <th>Advisor Assigned To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.aBlanks.map(
                            ({ batchValues, advisorCode }) => (
                                <Fragment>
                                    {row(batchValues, advisorCode)}
                                </Fragment>
                            )
                        )}
                    </tbody>
                </Table>

                <h4>Assigned Blanks</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>Assigned Blanks</th>
                            <th>Advisor Code</th>
                            <th>Batch Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.aBlanks.map(
                            ({ batchValues, advisorCode, amount }) => (
                                <Fragment>
                                    {row2(batchValues, advisorCode, amount)}
                                </Fragment>
                            )
                        )}
                    </tbody>
                </Table>

                <h4>Used Blanks</h4>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Used Blanks</th>
                            <th>Amount Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.uBlanks.map(({ batchValues, amount }) => (
                            <Fragment>{row(batchValues, amount)}</Fragment>
                        ))}
                    </tbody>
                </Table>

                <h4>All Available Blanks</h4>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Available Batches of Blanks </th>
                            <th>Amount in Batch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.blanks.map(({ _id, remaining }) => {
                            if (_id == this.state.myId) {
                                return (
                                    <tr key={_id}>
                                        {remaining.map((sub, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{_id}</td>
                                                    <td> {sub.start}</td>
                                                    <td>{sub.end}</td>
                                                </tr>
                                            );
                                        })}
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </Table>

                <h4>All Assigned Blanks </h4>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Advisor Code</th>
                            <th>All Assigned Blanks</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.aBlanks.map(
                            ({ advisorCode, batchValues, amount }) => (
                                <Fragment>
                                    {row(advisorCode, batchValues, amount)}
                                </Fragment>
                            )
                        )}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
