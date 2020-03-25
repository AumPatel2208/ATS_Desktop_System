import React, { Component, Fragment, } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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

    componentDidMount() {

        axios.get( apiLinks.BLANKS ).then(res => {
            const blanks = res.data;
            this.setState({blanks});
        });
    }




/*
    onOpenClick(e, _id) {
        console.log(e, _id);
    }

 */


    render() {
        const row = (
            batchValues,
            date,
            amount,
            advisorCode,


        ) => (
            <Fragment>
                <tr >
                    <td>{batchValues}</td>
                    <td>{date}</td>
                    <td>{amount}</td>
                    <td>{advisorCode}</td>

                    <td>
                        <Button
                            className="open-btn"
                            color="primary"
                            size="sm"
                            //onClick={this.onOpenClick.bind(this)}
                        >
                            open
                        </Button>
                    </td>
                </tr>
            </Fragment>
        );

        return (
            <Container>
                <br></br>
                <FormLabel>From:  </FormLabel>
                <DatePicker
                selected = {this.state.startDate}
                onChange={ e=>
                    this.setState({startDate: e.target.value})
                }
                />
                <br/>
                    <FormLabel>To:  </FormLabel>
                <DatePicker
                    selected = {this.state.endDate}
                    onChange={ date=>
                        this.setState({endDate: date.target.value})
                    }

                />
                <br/>
                <Button
                    bssize="medium"
                    variant="outline-danger"
                    onClick={() =>{

                        let start = this.state.startDate;
                        let end = this.state.endDate;

                        axios.get( apiLinks.BLANKS +'/byDate',{params:{start, end}}).then(res => {
                            const blanks = res.data;
                            this.setState({blanks});
                        });

                        axios.get( apiLinks.ASSIGN +'/byDate',{params:{start, end}}).then(res => {
                            const aBlanks = res.data;
                            this.setState({aBlanks});
                        });

                        axios.get( apiLinks.USED +'/byDate',{params:{start, end}}).then(res => {
                            const uBlanks = res.data;
                            this.setState({uBlanks});
                        });

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
                        ({

                            batchValues,
                            date,
                            amount,

                         }) => (
                            <Fragment >
                                {row(
                                    batchValues,
                                    date,
                                    amount,
                                )}
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
                        ({
                             batchValues,
                             advisorCode

                         }) => (
                            <Fragment>
                                {row(
                                    batchValues,
                                   advisorCode
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </Table>



                <h4>Assigned Blanks</h4>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>Assigned Blanks</th>
                        <th>Advisor Code</th>
                        <th>Batch Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.aBlanks.map(
                        ({
                             batchValues,
                             advisorCode,
                             amount,
                         }) => (
                            <Fragment>
                                {row(
                                    batchValues,
                                    advisorCode,
                                    amount

                                )}
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
                    { this.state.uBlanks.map(
                        ({
                             batchValues,
                             amount,
                         }) => (
                            <Fragment >
                                {row(
                                    batchValues,
                                    amount,
                                )}
                            </Fragment>
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
                    {this.state.blanks.map(({batchValues, amount
                    })=> (
                            <Fragment >
                                {row(
                                    batchValues,
                                    amount
                                )}
                            </Fragment>
                        )
                    )}
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
                    {this.state.aBlanks.map(({batchValues, amount
                                            })=> (
                            <Fragment >
                                {row(
                                    batchValues,
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



