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


    //Set the state to an empty list of objects that will be taken from the database
    this.state = {
        sales: [],
        saleT: 'saleType',
        code: 'advisorCode',
        inputCode: '',
        saleTypeValue: 'Choose Sale Type',
        startDate: new Date(),
        endDate: new Date()
    };
}

    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        //   let start = this.state.startDate;
        //let end = this.state.endDate;
        var a;
        {this.props.staff !== undefined
            ? a =`${this.props.staff.advisorCode}`
            : a = ""}

        axios
            .get(apiLinks.SALES)
            .then(res => {
                const sales = res.data;
                this.setState({ sales });

                const dl = this.state.sales.filter(
                    i => i.advisorCode == a);
                this.setState({ sales: dl });

            })
            .catch(err => console.log('Error code: ', err));
    }

    roleHandler(){
       var ad;
        {this.props.staff !== undefined
            ? ad =`${this.props.staff.staffType}`
            : ad = "undefined"}
        if (ad === "TravelAdvisor") {

           let code =  `${this.props.staff.advisorCode}`;
/*
            this.setState({sales: this.state.sales.filter(
                    sale =>
                        String(sale[this.state.code]) == code)});

 */


            return <Fragment>
                <h3>Showing Sales For Advisor {code} </h3>
            </Fragment>
        }
        else {
            return <Fragment>
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
            </Fragment>

        }
    }


    //to get the document into a pdf
    toPDF() {
        var pdf = new jsPDF('l', 'pt', 'A4');
        pdf.setFontSize(10);
        var source = document.getElementById("export");
        pdf.autoTable({html: '#export'});
        pdf.save("individualReport.pdf")
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
                    <FormGroup controlId="saleT" bssize="large">
                        <Dropdown
                            onSelect={key => {
                                this.setState({ saleTypeValue: key });

                                if (key === 'Interline') {
                                    this.setState({
                                        sales: this.state.sales.filter(
                                            sale =>
                                                String(
                                                    sale[this.state.saleT]
                                                ) === 'Interline'
                                        )
                                    });
                                } else {
                                    this.setState({
                                        sales: this.state.sales.filter(
                                            sale =>
                                                String(
                                                    sale[this.state.saleT]
                                                ) === 'Domestic'
                                        )
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

                                this.setState({
                                    sales: this.state.sales.filter(
                                        sale =>
                                            String(sale[this.state.code]) ===
                                            String(this.state.inputCode)
                                    )
                                });
                            }}
                            block
                        >
                            Filter Report
                        </Button>

                    </FormGroup>
                </Form>
                <button onClick={this.toPDF}>Download PDF</button>



                <Table grid className="mt-4" id="export">
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
