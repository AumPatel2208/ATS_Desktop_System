import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Table, Col } from 'reactstrap';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { FormLabel } from 'react-bootstrap';
import jsPDF from 'jspdf';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');

export default class ReportTurnoverT extends Component {
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        blanks: [],
        blanks2:[],
        allBlanks: [],
        aBlanks: [],
        anBlanks:[],
        aBlanks2: [],
        allABlanks: [],
        finalRemainin: [],
        uBlanks: [],
        uBlanks2:[],
        assigns: [],
        assign: 'assigned',
        batch: 'batchValues',
        sd: '',
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
        ed: '',
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0,
        total5: 0,
        total6: 0,
    };
    //runs when component mounts, use to gets the data from db

    componentDidMount() {
        axios
            .get(apiLinks.BLANKS)
            .then((res) => {
                const blanks2 = res.data;
                this.setState({ blanks2 });

                const allBlanks = res.data;
                this.setState({ allBlanks });
            })
            .catch((err) => console.log('Error code: ', err));

        axios
            .get(apiLinks.ASSIGN)
            .then((res) => {
                const allABlanks = res.data;
                this.setState({ allABlanks });
                const aBlanks2 = res.data;
                this.setState({ aBlanks2 });
            })
            .catch((err) => console.log('Error code: ', err));

        axios.get(apiLinks.USED).then((res) => {
            const uBlanks2 = res.data;
            this.setState({ uBlanks2 });
        });
    }

    toPDF() {
        //fetching and arranging what gets exported into the pdf

        var pdf = new jsPDF('l', 'pt', 'A4');

        pdf.text('Newly Received Blanks', 50, 20);
        pdf.autoTable({ html: '#recieved', columnSpan: 50, columnWidth: 50 });
        let page = pdf.internal.getCurrentPageInfo().pageNumber;
        pdf.text(
            'Assigned From Newly Received Blanks',
            50,
            pdf.autoTable.previous.finalY + 20
        );
        pdf.autoTable({
            html: '#assignedR',
            startY: pdf.autoTable.previous.finalY + 40,
            pageBreak: 'avoid',
        });
        pdf.text(
            'Assigned During Given Period',
            50,
            pdf.autoTable.previous.finalY + 20
        );
        pdf.autoTable({
            html: '#assignedp',
            startY: pdf.autoTable.previous.finalY + 40,
            pageBreak: 'avoid',
        });

        pdf.text(
            'Used During Given Period',
            50,
            pdf.autoTable.previous.finalY + 20
        );
        pdf.autoTable({
            html: '#used',
            startY: pdf.autoTable.previous.finalY + 40,
            columnWidth: 50,
        });
        pdf.text(
            'Available At End Of Period',
            50,
            pdf.autoTable.previous.finalY + 20
        );
        pdf.autoTable({
            html: '#available',
            startY: pdf.autoTable.previous.finalY + 40,
        });
        pdf.text(
            'Assigned At End Of Period',
            50,
            pdf.autoTable.previous.finalY + 20
        );
        pdf.autoTable({
            html: '#assignedA',
            startY: pdf.autoTable.previous.finalY + 40,
        });

        pdf.save('TurnoverReport.pdf');
    }

    dateHandling(){
        let start = new Date(this.state.startDate);
        let end = new Date(this.state.endDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        //Date sorting - blanks added in
        for (let i = 0; i < this.state.blanks2.length; i++) {
            if (
                Date.parse(this.state.blanks2[i].date) >= Date.parse(start) &&
                Date.parse(this.state.blanks2[i].date) <= Date.parse(end)
            ) {
                this.state.blanks.push(this.state.blanks2[i]);
            }
        }

        //assigned during period
        for (let i = 0; i < this.state.aBlanks2.length; i++) {
            if (
                Date.parse(this.state.aBlanks2[i].date) >= start &&
                Date.parse(this.state.aBlanks2[i].date) <= end
            ) {
                this.state.aBlanks.push(this.state.aBlanks2[i]);
            }
        }



//assigned from new during period
        for (let i = 0; i < this.state.aBlanks.length; i++) {
            for(let i2=0; i2<this.state.blanks.length; i2++){
                if ((this.state.aBlanks[i].batchStart >= this.state.blanks[i2].batchStart)
                    &&(this.state.aBlanks[i].batchEnd <= this.state.blanks[i2].batchEnd)){
                    this.state.anBlanks.push(this.state.aBlanks2[i]);
                }
            }
        }

        //used during period

        for (let i = 0; i < this.state.uBlanks2.length; i++) {
            if (
                Date.parse(this.state.uBlanks2[i].date) >= start &&
                Date.parse(this.state.uBlanks2[i].date) <= end
            ) {
                this.state.uBlanks.push(this.state.uBlanks2[i]);
            }
        }

    }


    generateTotals() {
        //getting totals

        //newly added blanks - new
        let x = 0;
        for (let i = 0; i < this.state.blanks.length; i++) {
            x += parseInt(this.state.blanks[i].amount);
        }
        this.setState({ total1: x });
        //newly assigned blanks - new & assigned during block
        x = 0;
        for (let i = 0; i < this.state.anBlanks.length; i++) {
            x += parseInt(this.state.anBlanks[i].amount);
        }
        this.setState({ total2: x });

        //assigned blanks in period - assigned during block
        x = 0;
        for (let i = 0; i < this.state.aBlanks.length; i++) {
            x += parseInt(this.state.aBlanks[i].amount);
        }
        this.setState({ total3: x });


        //used blanks in period - used during block
        x = 0;
        x += parseInt(this.state.uBlanks.length);
        this.setState({ total4: x });

        //available blanks at end of period - all available
        x = 0;
        let len = 0;
        let dif = 0;
        for (let i = 0; i < this.state.allBlanks.length; i++) {
            len = this.state.allBlanks[i].remaining.length;
            if (len === 0) continue;

            for (let i2 = 0; i2 < len; i2++) {
                dif =
                    this.state.allBlanks[i].remaining[i2].end -
                    this.state.allBlanks[i].remaining[i2].start +
                    1;
                x += dif;
            }
        }
        this.setState({ total5: x });

        //assigned blanks in period - all assigned
        x = 0;
        for (let i = 0; i < this.state.allABlanks.length; i++) {
            x += this.state.allABlanks[i].remaining.length;
        }
        this.setState({ total6: x });
    }

    finalRemainTable() {
        //setting up a new array so the remaining will display correctly
    for (let i = 0; i < this.state.allBlanks.length; i++) {
        let len = this.state.allBlanks[i].remaining.length;
        if (len === 0) continue;
        for (let i2 = 0; i2 < len; i2++) {
            this.state.finalRemainin.push(
                this.state.allBlanks[i].remaining[i2]
            );
        }
    }
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
                    onChange={(date) => {
                        this.setState({
                            startDate: date,
                        });
                    }}
                />
                <br />
                <FormLabel>To: </FormLabel>
                <DatePicker
                    selected={this.state.endDate}
                    onChange={(date) => {
                        this.setState({
                            endDate: date,
                        });
                    }}
                />

                <br />
                <Button
                    bssize="medium"
                    variant="outline-info"
                    onClick={async () => {

                        this.dateHandling();

                        const t = this.state.allABlanks.filter(
                            (i) => i.remaining[0] !== undefined
                        );
                        this.setState({ allABlanks: t });



                        this.generateTotals();
                        this.finalRemainTable();
                    }}
                >
                    Enter Dates
                </Button>
                <br></br>
                <br></br>

                <button onClick={this.toPDF}>Download PDF</button>

                <h4>Received Blanks</h4>
                <Table striped id="recieved" className="mt-4">
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
                                        amount
                                    )}
                                    <td></td>
                                </Fragment>
                            )
                        )}
                    </tbody>
                </Table>

                <h4>Assigned Received Blanks</h4>
                <Table striped id="assignedR" className="mt-4">
                    <thead>
                        <tr>
                            <th>New Blanks Assigned</th>
                            <th>Advisor Assigned To</th>
                            <th>Total Amount Recieved: {this.state.total2}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.anBlanks.map(
                            ({ batchValues, advisorCode, amount }) => (
                                <Fragment>
                                    {row(batchValues, advisorCode, amount)}
                                </Fragment>
                            )
                        )}
                    </tbody>
                </Table>

                <h4>Assigned Blanks</h4>
                <Table striped id="assignedp">
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
                <Table striped id="used" className="mt-4">
                    <thead>
                        <tr>
                            <th>Used Blanks</th>
                            <th>Amount Used</th>
                            <th>Total Amount Recieved: {this.state.total4}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.uBlanks.map(({ batchValues, amount }) => (
                            <Fragment>{row(batchValues, 1)}</Fragment>
                        ))}
                    </tbody>
                </Table>

                <h4>All Available Blanks</h4>
                <Table striped id="available" className="mt-4">
                    <thead>
                        <tr>
                            <th>Available Batches of Blanks </th>
                            <th>Amount in Batch</th>
                            <th>Total Amount Received: {this.state.total5}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.finalRemainin.map(({ _id, start, end }) => {
                            return (
                                <tr key={_id}>
                                    <td>{start + '-' + end}</td>
                                    <td>{1 + (end - start)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                <h4>All Assigned Blanks </h4>
                <Table striped id="assignedA" className="mt-4">
                    <thead>
                        <tr>
                            <th>Advisor Code</th>
                            <th>All Assigned Blanks</th>
                            <th>Amount</th>
                            <th>Total Amount Recieved: {this.state.total6}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.allABlanks.map(
                            ({ _id, remaining, advisorCode }) => {
                                return (
                                    <Fragment>
                                        {row(
                                            advisorCode,
                                            remaining[0] +
                                                '-' +
                                                remaining[remaining.length - 1],
                                            remaining[remaining.length - 1] -
                                                remaining[0] +
                                                1
                                        )}
                                    </Fragment>
                                );
                            }
                        )}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
