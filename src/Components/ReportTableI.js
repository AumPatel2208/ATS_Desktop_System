import React, { Component, Fragment, ReactPropTypes } from 'react';
import { Container, Table, Button } from 'reactstrap';
import axios from 'axios';
//import {html2canvas, jsPDF} from  'app/ext'
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import 'jspdf-autotable'

import {
    Form,
    FormGroup,
    Dropdown,
    FormControl,
    FormLabel
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');
export default class ReportTableI extends Component {

    constructor(props) {
        super(props);
        this.toPDF =this.toPDF.bind(this);
        this.toPDFB =this.toPDFB.bind(this);


    //Set the state to an empty list of objects that will be taken from the database
    this.state = {
        sales: [],
        saleT: 'saleType',
        code: 'advisorCode',
        inputCode: '',
        saleTypeValue: 'Choose Sale Type',
        startDate: new Date(),
        endDate: new Date(),
        sType:""
    };
}

    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        //   let start = this.state.startDate;
        //let end = this.state.endDate;

        var ad;
        {
            this.props.staff !== undefined
                ? ad = `${this.props.staff.staffType}`
                : ad = "undefined"
        }

        if (ad !== "OfficeManager") {

            var a;
            {
                this.props.staff !== undefined
                    ? a = `${this.props.staff.advisorCode}`
                    : a = ""
            }

            this.setState( {code : a});


            axios
                .get(apiLinks.SALES)
                .then(res => {
                    const sales = res.data;
                    this.setState({sales});

                    const dl = this.state.sales.filter(
                        i => i.advisorCode == a);
                    this.setState({sales: dl});


                })
                .catch(err => console.log('Error code: ', err));
        } else {
            axios
                .get(apiLinks.SALES)
                .then(res => {
                    const sales = res.data;
                    this.setState({sales});
                })
                .catch(err => console.log('Error code: ', err));
            this.setState({sType: "OM"})
        }
    }
    cashCheck(paymentMethod, fare){
        if (paymentMethod === "Cash"){
            return fare;
        }
        else {
            return 0;
        }
    }

    creditCheck(paymentMethod, fare){
       if (paymentMethod === "Credit"){
            return fare;
        }else {
           return 0;
       }
    }

    commissionCheck9(commission, fare){
        if (commission === "9"){
            return fare;
        }else {
            return 0;
        }
    }
    commissionCheck5(commission, fare){
        if (commission === "5"){
            return fare;
        }else {
            return 0;
        }
    }

    roleHandler(){
      if (this.state.setType == "OM"){
            return <Fragment>
                <FormLabel>Enter Advisor Code</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.sales.code}
                    onChange={e => {
                        this.setState({
                            code: e.target.value
                        });
                    }}
                />
            </Fragment>

        }
    }

    aggregate(value) {
        let x = 0;
        if (value === 1) {
            for (var i = 0; i < this.state.sales.length; i++) {
                x += parseInt(this.state.sales[i].fare);
            }
            return x;
        } else if (value === 2) {
            for (var i = 0; i < this.state.sales.length; i++) {
                let y = parseInt(this.state.sales[i].fare) * parseInt(this.state.sales[i].USDExchangeRate);
                x += y;
            }
            return x;
        } else if (value === 3) {
            for (var i = 0; i < this.state.sales.length; i++) {
                if (this.state.sales[i].paymentMethod === "Cash") {
                    x += parseInt(this.state.sales[i].fare);
                }
            }
            return x;
        } else if (value === 4) {
            for (var i = 0; i < this.state.sales.length; i++) {
                if (this.state.sales[i].paymentMethod === "Credit") {
                    x += parseInt(this.state.sales[i].fare);
                }

            }
            return x;
        } else if (value === 5) {
            for (var i = 0; i < this.state.sales.length; i++) {
                x += parseInt(this.state.sales[i].localTax);
            }
            return x;
        } else if (value === 6) {
            for (var i = 0; i < this.state.sales.length; i++) {
                if (this.state.sales[i].commissionRate === 9) {
                    x += parseInt(this.state.sales[i].fare);
                }
            }
            return x;
        } else if (value === 7) {
            for (var i = 0; i < this.state.sales.length; i++) {
                if (this.state.sales[i].commissionRate === 5) {
                    x += parseInt(this.state.sales[i].fare);
                }
            }
            return x;
        }
        return x;
    }

    //to get the document into a pdf
    toPDF() {
        var pdf = new jsPDF('l', 'pt', 'A4');
        pdf.setFontSize(10);
        pdf.text( "For Advisor: " +this.state.code, 50, 20);
        var source = document.getElementById("export");
        pdf.autoTable({html: '#export'});
        pdf.save("DomesticIndividualReport.pdf")
    }

    toPDFB() {
        var pdf = new jsPDF('l', 'pt', 'A4');
        pdf.setFontSize(9);
        pdf.autoTable({html: '#exportB'});
        pdf.save("InterlineIndividualReport.pdf")
    }

    onOpenClick(e, _id) {
        console.log(e, _id);
    }
    render() {
        const row = (
            _id,
            advisorCode,
            ticketNumber,
            fare,
            currency,
            USDExchangeRate,
            paymentMethod,
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
                    <td>{advisorCode}</td>
                    <td>{ticketNumber}</td>
                    <td>{fare}</td>
                    <td>{currency}</td>
                    <td>{USDExchangeRate}</td>
                    <td>{paymentMethod}</td>
                    <td>{saleDate}</td>
                    <td>{commissionRate}</td>
                    <td>{creditCardNum}</td>
                    <td>{expDate}</td>
                    <td>{securityCode}</td>
                    <td>{notes}</td>
                    <td>{saleType}</td>
                    <td>
                    </td>
                </tr>
            </Fragment>
        );

        return (
            <Container>
                <Form>
                    <h2>For Advisor: {this.state.code}</h2>
                    <FormGroup controlId="saleT" bssize="large">
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
                        <br></br>


                        <Fragment>{this.roleHandler()}</Fragment>



                        <Button
                            bssize="medium"
                            variant="outline-danger"
                            onClick={() => {
                                let start = new Date(this.state.startDate);
                                let end = new Date(this.state.endDate);
                                start.setHours(0, 0, 0, 0);
                                end.setHours(0, 0, 0, 0);

                                axios
                                    .get(apiLinks.BLANKS + '/byDate', {
                                        params: { start, end }
                                    })
                                    .then(res => {
                                        const sales = res.data;
                                        this.setState({ sales });
                                    });

                                const dl = this.state.sales.filter(
                                    i => i.advisorCode === this.state.code);
                                this.setState({sales: dl});
                            }}
                            block
                        >
                            Filter Report
                        </Button>



                        <h2>Domestic Sales Report</h2>
                    </FormGroup>
                </Form>
                <button onClick={this.toPDF}>Download PDF</button>

                <Table grid className="mt-4" id="export">
                    <thead>
                        <tr>
                            <th>Ticket Number</th>
                            <th>Fare(Local)</th>
                            <th>Fare(USD)</th>
                            <th>Cash</th>
                            <th>Credit Card(USD)</th>
                            <th>Credit Card(local)</th>
                            <th>Taxes</th>
                            <th>Total Paid(local)</th>
                            <th>Commission 9%</th>
                            <th>Commission 5%</th>
                            <th>Notes</th>
                        </tr>
                    </thead>

                    <tbody>
                    {this.state.sales.map(({

                                                ticketNumber,
                                                fare,
                                                USDExchangeRate,
                                                localTax,
                                                paymentMethod,
                                                commissionRate,
                                                creditCardNum,
                                                expDate,
                                                securityCode,
                                                saleDate,
                                                notes,
                                                saleType
                                            }) => {
                        return (
                            <tr >
                                <td>{ticketNumber}</td>
                                <td> {fare}</td>
                                <td>{(fare * USDExchangeRate).toFixed(3)}</td>
                                <td> {this.cashCheck(paymentMethod, fare)}</td>
                                <td> {this.creditCheck(paymentMethod, fare)}</td>
                                <td> {this.creditCheck(paymentMethod, fare) * USDExchangeRate}</td>
                                <td> {localTax}</td>
                                <td> {localTax + fare}</td>
                                <td> {this.commissionCheck9(commissionRate, fare)}</td>
                                <td> {this.commissionCheck5(commissionRate, fare)}</td>
                                <td> {notes}</td>

                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
                <Table grid className="mt-4" id="export2">
                    <thead>
                    <tr>
                        <th>Ticket Total</th>
                        <th>Total Fare(Local)</th>
                        <th>Total Fare(USD)</th>
                        <th>Total Cash</th>
                        <th>Total Credit Card(USD)</th>
                        <th>Total Credit Card(local)</th>
                        <th>Total Taxes</th>
                        <th>Total Paid(local)</th>
                        <th>Total Commission 9%</th>
                        <th>Total Commission 5%</th>
                        <th>Total Commission Amounts</th>
                        <th>Net Amounts For Debit</th>
                    </tr>
                    </thead>

                    <tbody>
                            <tr >
                                <td>{this.state.sales.length}</td>
                                <td> {this.aggregate(1)}</td>
                                <td> {this.aggregate(2)}</td>
                                <td> {this.aggregate(3)}</td>
                                <td> {this.aggregate(4)}</td>
                                <td> "fix this one"</td>
                                <td> {this.aggregate(5)}</td>
                                <td> {this.aggregate(5) + this.aggregate(1)}</td>
                                <td> {this.aggregate(6)}</td>
                                <td> {this.aggregate(7)}</td>
                               <td>{(this.aggregate(6)*.09)+(this.aggregate(7)*.05)}</td>
                                <td> {(this.aggregate(6)+this.aggregate(7))-((this.aggregate(6)*.09)+(this.aggregate(7)*.05))}</td>
                            </tr>
                    </tbody>
                </Table>



                <h2>Interline Sales Report</h2>
                <button onClick={this.toPDFB}>Download PDF</button>
                <Table grid className="mt-4" id="exportB">
                    <thead>
                    <tr>
                        <th>Advisor Code</th>
                        <th>Ticket Number</th>
                        <th>Fare</th>
                        <th>Currency</th>
                        <th>Payment Method</th>
                        <th>Exchange Rate</th>
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
                             advisorCode,
                             ticketNumber,
                             fare,
                             currency,
                             paymentMethod,
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
                                    advisorCode,
                                    ticketNumber,
                                    fare,
                                    currency,
                                    paymentMethod,
                                    USDExchangeRate,
                                    commissionRate,
                                    creditCardNum,
                                    expDate,
                                    securityCode,
                                    saleDate.substring(0,10),
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
