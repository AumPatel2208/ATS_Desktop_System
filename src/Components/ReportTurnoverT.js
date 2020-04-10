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
import jsPDF from "jspdf";

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');

export default class ReportTurnoverT extends Component {
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        blanks: [],
        allBlanks:[],
        aBlanks: [],
        allABlanks:[],
        uBlanks: [],
        assigns: [],
        assign: 'assigned',
        batch: 'batchValues',
        sd: '',
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
        ed: '',
        total1: 0,
        total2:0,
        total3:0,
        total4:0,
        total5:0,
        total6:0

    };
    //runs when component mounts, use to gets the data from db

    componentDidMount() {
        axios
            .get(apiLinks.BLANKS)
            .then(res => {
                const blanks = res.data;
                this.setState({ blanks });

                const allBlanks = res.data;
                this.setState({ allBlanks });
            })
            .catch(err => console.log('Error code: ', err));

        axios
            .get(apiLinks.ASSIGN)
            .then(res => {
                const allABlanks = res.data;
                this.setState({ allABlanks });
                const aBlanks = res.data;
                this.setState({ aBlanks });
            })
            .catch(err => console.log('Error code: ', err));


        axios
            .get(apiLinks.USED )
            .then(res => {
                const uBlanks = res.data;
                this.setState({ uBlanks });
            });
    }





    toPDF() {

        var pdf = new jsPDF('l', 'pt', 'A4');

        pdf.text( "Newly Received Blanks", 50, 20);
        pdf.autoTable({html: '#recieved', columnSpan: 50,columnWidth: 50});
        let page = pdf.internal.getCurrentPageInfo().pageNumber;
        pdf.text( "Assigned From Newly Received Blanks", 50, pdf.autoTable.previous.finalY +20);
        pdf.autoTable({html: '#assignedR', startY: pdf.autoTable.previous.finalY +40, pageBreak: 'avoid'});
        pdf.text( "Assigned During Given Period", 50, pdf.autoTable.previous.finalY +20);
        pdf.autoTable({html: '#assignedp', startY: pdf.autoTable.previous.finalY +40, pageBreak: 'avoid'});

        pdf.text( "Used During Given Period", 50, pdf.autoTable.previous.finalY +20);
        pdf.autoTable({html: '#used', startY: pdf.autoTable.previous.finalY +40,  columnWidth :50});
        pdf.text( "Available At End Of Period", 50, pdf.autoTable.previous.finalY +20);
        pdf.autoTable({html: '#available', startY: pdf.autoTable.previous.finalY +40});
        pdf.text( "Assigned At End Of Period", 50, pdf.autoTable.previous.finalY +20);
        pdf.autoTable({html: '#assignedA', startY: pdf.autoTable.previous.finalY +40});


        pdf.save("TurnoverReport.pdf")
    }

    generateTotals(){

        //getting totals
//newly added blanks - new
        let x=0;
        for (let i =0; i<this.state.blanks.length; i++){
            x += parseInt(this.state.blanks[i].amount);
        }
        this.setState({total1:x});
//newly assigned blanks - new & assigned during block
        x=0;
        for (let i =0; i<this.state.aBlanks.length; i++){
            x += parseInt(this.state.aBlanks[i].amount);
        }
        this.setState({total2:x});

//assigned blanks in period - assigned during block
        x=0;
        for (let i =0; i<this.state.aBlanks.length; i++){
            x += parseInt(this.state.aBlanks[i].amount);
        }
        this.setState({total3:x});

        //below are all set

//used blanks in period - used during block
        x=0;
        for (let i =0; i<this.state.uBlanks.length; i++){
            x += parseInt(this.state.uBlanks[i].amount);
        }
        this.setState({total4:x});

//available blanks at end of period - all available
        x=0;
        /*
        for (let i =0; i< this.state.allBlanks.length; i++){
            let y = this.state.allABlanks[3];
            for (let i2 =0; i2< this.state.allABlanks[i].remaining.length; i2++){
                 x += (y.remaining[i2].end - y.remaining[i2].start);
            }

        }
        */
        this.setState({total5:"fix this one"});

//assigned blanks in period - all assigned
        x=0;
        for (let i =0; i<this.state.allABlanks.length; i++){
            x += this.state.allABlanks[i].remaining.length;
        }
        this.setState({total6:x})

    }


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

                        const fl = this.state.blanks.filter(
                            i => Date.parse(i.date) >= Date.parse(start)
                        );
                        this.setState({ blanks: fl });
                        const tl = this.state.blanks.filter(
                            i => Date.parse(i.date) <= Date.parse(end)
                        );
                        this.setState({ blanks: tl });

                        const t = this.state.allABlanks.filter(
                            i => i.remaining[0] !== undefined
                        );
                        this.setState({ allABlanks: t });

                        /*
                        axios
                            .get(apiLinks.ASSIGN + '/byDate', {
                                params: { start, end }
                            })
                            .then(res => {
                                const aBlanks = res.data;
                                this.set

                         */
/*
                        axios
                            .get(apiLinks.USED + '/byDate', {
                                params: { start, end }
                            })
                            .then(res => {
                                const uBlanks = res.data;
                                this.setState({ uBlanks });
                            });

 */

                        this.generateTotals();

                    }}
                >
                    Enter Dates
                </Button>
                <br></br>
                <br></br>

                <button onClick={this.toPDF}>Download PDF</button>


                <h4>Received Blanks</h4>
                <Table striped id = "recieved" className="mt-4">
                    <thead>
                        <tr>
                            <th>Batch</th>
                            <th>Date</th>
                            <th>Batch Quantity</th>
                            <th>Total Amount Recieved: {this.state.total1}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.blanks.map(
                            ({ batchValues, date, amount }) => (
                                <Fragment>
                                    {row(
                                        batchValues,
                                        date.substring(0, 10),
                                        amount,
                                    )}
                                    <td></td>
                                </Fragment>
                            )
                        )}

                    </tbody>

                </Table>

                <h4>Assigned Received Blanks</h4>
                <Table striped id ="assignedR" className="mt-4">
                    <thead>
                        <tr>
                            <th>New Blanks Assigned</th>
                            <th>Advisor Assigned To</th>
                            <th>Total Amount Recieved: {this.state.total2}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.aBlanks.map(
                            ({ batchValues, advisorCode,amount }) => (
                                <Fragment>
                                    {row(batchValues, advisorCode, amount)}
                                </Fragment>
                            )
                        )}
                    </tbody>

                </Table>

                <h4>Assigned Blanks</h4>
                <Table striped id ="assignedp">
                    <thead>
                        <tr>
                            <th>Assigned Blanks</th>
                            <th>Advisor Code</th>
                            <th>Batch Quantity</th>
                            <th>Total Amount Recieved: {this.state.total3}</th>
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
                <Table striped id = "used" className="mt-4">
                    <thead>
                        <tr>
                            <th>Used Blanks</th>
                            <th>Amount Used</th>
                            <th>Total Amount Recieved: {this.state.total4}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.uBlanks.map(({ batchValues, amount }) => (
                            <Fragment>{row(batchValues, amount)}</Fragment>
                        ))}
                    </tbody>


                </Table>

                <h4>All Available Blanks</h4>
                <Table striped id ="available" className="mt-4">
                    <thead>
                        <tr>
                            <th>Available Batches of Blanks </th>
                            <th>Amount in Batch</th>
                            <th>Total Amount Received: {this.state.total5}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.allBlanks.map(({ _id, remaining }) => {
                            return (
                                <tr key={_id}>
                                    {remaining.map((sub, i) => {
                                        return (
                                            <Fragment>
                                                {row(
                                                    sub.start + '-' + sub.end,
                                                    1+(sub.end - sub.start)
                                                )}
                                            </Fragment>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>


                </Table>

                <h4>All Assigned Blanks </h4>
                <Table striped id ="assignedA" className="mt-4">
                    <thead>
                        <tr>
                            <th>Advisor Code</th>
                            <th>All Assigned Blanks</th>
                            <th>Amount</th>
                            <th>Total Amount Recieved: {this.state.total6}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.allABlanks.map(({ _id, remaining, advisorCode }) => {
                        return (
                                        <Fragment>
                                            {row(
                                                advisorCode,
                                                remaining[0] +"-"+ remaining[(remaining.length)-1],
                                                (remaining[(remaining.length)-1] -remaining[0]) +1
                                            )}
                                        </Fragment>
                                    );
                                })}
                    </tbody>

                </Table>

            </Container>
        );
    }
}
