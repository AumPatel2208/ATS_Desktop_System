import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import {
    Form,
    FormGroup,
    Dropdown,
    FormControl,
    FormLabel,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import jsPDF from 'jspdf';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');
export default class ReportTableGD extends Component {
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        sales: [],
        saleT: 'saleType',
        dates: 'saleDate',
        dateinput: '',
        saleTypeValue: 'Choose Sale Type',
        summedValues: [],
        dict: {},
        startDate: new Date(),
        endDate: new Date(),
    };

    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        axios
            .get(apiLinks.SALES)
            .then((res) => {
                const sales = res.data;
                this.setState({ sales });
                const fl = this.state.sales.filter(
                    (i) => i.saleType === 'Domestic'
                );
                this.setState({ sales: fl });
            })
            .catch((err) => console.log('Error code: ', err));
    }

    onOpenClick(e, _id) {
        console.log(e, _id);
    }

    toPDF() {
        var pdf = new jsPDF('l', 'pt', 'A4');
        var source = document.getElementById('export');
        pdf.text('Global Domestic Report', 50, 40);
        pdf.autoTable({ html: '#export', startY: 60 });
        pdf.autoTable({ html: '#exportB2' });
        pdf.save('GlobalDomesticAdvisor.pdf');
    }

    aggregateSales() {
        //getting the dates into the proper format
        let start = new Date(this.state.startDate);
        let end = new Date(this.state.endDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        //Date sorting
        let l = [];
        for (let i = 0; i < this.state.sales.length; i++) {
            if (
                Date.parse(this.state.sales[i].saleDate) >= start &&
                Date.parse(this.state.sales[i].saleDate) <= end
            ) {
                l.push(this.state.sales[i]);
            }
        }
        // this.setState({sales: l});

        //aggregating the sales together
        var x = 0,
            y = 0;
        for (x = 0; x < l.length; x++) {
            var k = 0;
            for (k = 0; k < this.state.summedValues.length; k++) {
                if (this.state.summedValues[k].advisorCode == l[x].advisorCode)
                    break;
            }
            y = k;
            if (k == this.state.summedValues.length) {
                this.state.dict = {
                    advisorCode: l[x].advisorCode,
                    cash: 0,
                    credit: 0,
                    saleNum: 0,
                    total: 0,
                    fare2: 0,
                    tax: 0,
                    creditUSD: 0,
                    creditT: 0,
                    c9: 0,
                    c5: 0,
                };
                y = this.state.summedValues.push(this.state.dict) - 1;
            }
            if (this.state.sales[x].paymentMethod === 'CreditCard') {
                this.state.summedValues[y].credit += parseInt(
                    this.state.sales[x].fare
                );
                this.state.summedValues[y].creditUSD +=
                    parseInt(this.state.sales[x].fare) *
                    this.state.sales[x].USDExchangeRate;
                this.state.summedValues[y].creditT += 1;
            } else if (this.state.sales[x].paymentMethod === 'Cash') {
                this.state.summedValues[y].cash += parseInt(
                    this.state.sales[x].fare
                );
            }

            if (this.state.sales[x].commissionRate == '9') {
                this.state.summedValues[y].c9 += this.state.sales[x].fare;
            } else if (this.state.sales[x].commissionRate == '5') {
                this.state.summedValues[y].c5 += this.state.sales[x].fare;
            }
            this.state.summedValues[y].tax += parseFloat(
                this.state.sales[x].otherTax
            );
            this.state.summedValues[y].saleNum += 1;
            this.state.summedValues[y].total += parseInt(
                this.state.sales[x].fare
            );
            this.state.summedValues[y].fare2 +=
                this.state.sales[x].fare * this.state.sales[x].USDExchangeRate;
        }
    }
    aggregate2(value) {
        //adding up the totals for the total table

        let x = 0;
        if (value === 1) {
            for (var i = 0; i < this.state.summedValues.length; i++) {
                x += parseFloat(this.state.summedValues[i].saleNum);
            }
            return x;
        } else if (value === 2) {
            for (var i = 0; i < this.state.summedValues.length; i++) {
                let y = parseFloat(this.state.summedValues[i].total);
                x += y;
            }
            return x;
        } else if (value === 3) {
            for (var i = 0; i < this.state.summedValues.length; i++) {
                let y = parseFloat(this.state.summedValues[i].fare2);
                x += y;
            }
            return x;
        } else if (value === 4) {
            for (var i = 0; i < this.state.summedValues.length; i++) {
                let y = parseFloat(this.state.summedValues[i].tax);
                x += y;
            }
            return x;
        } else if (value === 5) {
            for (var i = 0; i < this.state.summedValues.length; i++) {
                let y = parseFloat(this.state.summedValues[i].cash);
                x += y;
            }
            return x;
        } else if (value === 6) {
            for (var i = 0; i < this.state.summedValues.length; i++) {
                let y = parseFloat(this.state.summedValues[i].credit);
                x += y;
            }
            return x;
        } else if (value === 7) {
            for (var i = 0; i < this.state.summedValues.length; i++) {
                let y = parseFloat(this.state.summedValues[i].creditUSD);
                x += y;
            }
            return x;
        } else if (value === 8) {
            for (var i = 0; i < this.state.summedValues.length; i++) {
                let y = parseFloat(this.state.summedValues[i].c9);
                x += y;
            }
            return x;
        } else if (value === 9) {
            for (var i = 0; i < this.state.summedValues.length; i++) {
                let y = parseFloat(this.state.summedValues[i].c5);
                x += y;
            }
            return x;
        }
        return x;
    }

    render() {
        const row = (
            advisorCode,
            saleNum,
            currency,
            USDExchangeRate,
            commissionRate,
            saleDate,
            cash,
            credit,
            cheque,
            total
        ) => (
            <Fragment>
                <tr key={advisorCode}>
                    <td>{advisorCode}</td>
                    <td>{saleNum}</td>
                    <td>{currency}</td>
                    <td>{USDExchangeRate}</td>
                    <td>{commissionRate}</td>
                    <td>{saleDate}</td>
                    <td>{cash}</td>
                    <td>{credit}</td>
                    <td>{cheque}</td>
                    <td>{total}</td>
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
                <Form>
                    <FormGroup>
                        <Button
                            bssize="medium"
                            variant="outline-primary"
                            onClick={() => {
                                this.setState({
                                    sales: this.aggregateSales(),
                                });
                            }}
                        >
                            Generate Report
                        </Button>
                        {''}

                        <button onClick={this.toPDF}>Download PDF</button>
                    </FormGroup>
                </Form>
                <Table striped id="export" className="mt-4">
                    <thead>
                        <tr>
                            <th>Advisor Code</th>
                            <th>Sales</th>
                            <th>Fare(local)</th>
                            <th>Fare(USD)</th>
                            <th>Taxes</th>
                            <th>Cash</th>
                            <th>Credit#</th>
                            <th>Credit(USD)</th>
                            <th>Credit(local)</th>
                            <th>Total Paid</th>
                            <th>Commission 9%</th>
                            <th>Commission 5%</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.summedValues.map(
                            ({
                                advisorCode,
                                saleNum,
                                credit,
                                cash,
                                total,
                                fare2,
                                tax,
                                creditUSD,
                                c9,
                                c5,
                                creditT,
                            }) => (
                                <tr key={advisorCode}>
                                    <td>{advisorCode}</td>
                                    <td>{saleNum}</td>
                                    <td>{total}</td>
                                    <td>{fare2.toString().substring(0,7)}</td>
                                    <td>{tax}</td>
                                    <td>{cash}</td>
                                    <td>{creditT}</td>
                                    <td>{creditUSD.toString().substring(0,7)}</td>
                                    <td>{credit}</td>
                                    <td>{total}</td>
                                    <td>{c9}</td>
                                    <td>{c5}</td>

                                </tr>
                            )
                        )}
                    </tbody>
                </Table>

                <Table grid className="mt-4" id="exportB2">
                    <thead>
                        <tr>
                            <th>Sales</th>
                            <th>Fare(local)</th>
                            <th>Fare(USD)</th>
                            <th>Taxes</th>
                            <th>Cash</th>

                            <th>Credit(USD)</th>
                            <th>Credit(local)</th>
                            <th>Total Paid</th>
                            <th>Commission 9%</th>
                            <th>Commission 5%</th>
                            <th>Total Commission</th>
                            <th>Net Amount Debit</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td> {this.aggregate2(1)}</td>
                            <td> {this.aggregate2(2)}</td>
                            <td> {this.aggregate2(3).toString().substring(0,7)}</td>
                            <td> {this.aggregate2(4)}</td>
                            <td> {this.aggregate2(5)}</td>
                            <td> {this.aggregate2(7).toString().substring(0,7)}</td>
                            <td> {this.aggregate2(6)}</td>
                            <td> {this.aggregate2(2)}</td>
                            <td> {this.aggregate2(8)}</td>
                            <td> {this.aggregate2(9)}</td>
                            <td>
                                {this.aggregate2(8) * 0.09 +
                                    this.aggregate2(9) * 0.05}
                            </td>
                            <td>
                                {' '}
                                {this.aggregate2(8) +
                                    this.aggregate2(9) -
                                    (this.aggregate2(8) * 0.09 +
                                        this.aggregate2(9) * 0.05)}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }
}
