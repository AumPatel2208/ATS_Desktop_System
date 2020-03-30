import React, { Component, Fragment } from 'react';
import { Container, Table, Button } from 'reactstrap';
import axios from 'axios';
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
export default class ReportTableG extends Component {
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
        endDate: new Date()
    };

    //runs when component mounts, use to gets the data from db
    componentDidMount() {
<<<<<<< HEAD
        let start = this.state.startDate;
        let end = this.state.endDate;

        axios
            .get(apiLinks.SALES + '/byDate', { params: { start, end } })
            .then(res => {
                const sales = res.data;
                this.setState({ sales });
            })
            .catch(err => console.log('Error code: ', err));
=======
        axios.get( apiLinks.SALES).then(res => {
            const sales = res.data;
            this.setState({sales});
        });
>>>>>>> d16001e8203dcc11ce12eda7b299bd69cd13498a
    }

    onOpenClick(e, _id) {
        console.log(e, _id);
    }

    aggregateSales() {
<<<<<<< HEAD
        var x = 0,
            y = 0;
=======

        let start = new Date(this.state.startDate);
        let end =new  Date(this.state.endDate);
        start.setHours(0,0,0,0);
        end.setHours(0,0,0,0);
/*
        const fl = this.state.sales.filter(i => (Date.parse(i.date)>= Date.parse(start)));
        this.setState({sales: fl});
        const tl = this.state.sales.filter(i => (Date.parse(i.date)<= Date.parse(end)));
        this.setState({sales: tl});
        */


        var x =0, y=0;
>>>>>>> d16001e8203dcc11ce12eda7b299bd69cd13498a
        for (x = 0; x < this.state.sales.length; x++) {
            var k = 0;
            for (k = 0; k < this.state.summedValues.length; k++) {
                if (
                    this.state.summedValues[k].advisorCode ==
                    this.state.sales[x].advisorCode
                )
                    break;
            }
            y = k;
            if (k == this.state.summedValues.length) {
                this.state.dict = {
                    advisorCode: this.state.sales[x].advisorCode,
                    cash: 0,
                    credit: 0,
                    cheque: 0,
                    saleNum: 0,
                    total: 0
                };
                y = this.state.summedValues.push(this.state.dict) - 1;
            }
<<<<<<< HEAD
            if (this.state.sales[x].paymentMethod === 'creditCard') {
                this.state.summedValues[y].credit += this.state.sales[x].fare;
            } else if (this.state.sales[x].paymentMethod === 'cheque') {
                this.state.summedValues[y].cheque += this.state.sales[x].fare;
            } else if (this.state.sales[x].paymentMethod === 'cash') {
=======
            if (this.state.sales[x].paymentMethod === "CreditCard") {
                this.state.summedValues[y].credit += this.state.sales[x].fare;
            } else if (this.state.sales[x].paymentMethod === "Cash") {
>>>>>>> d16001e8203dcc11ce12eda7b299bd69cd13498a
                this.state.summedValues[y].cash += this.state.sales[x].fare;
            }
            this.state.summedValues[y].saleNum += 1;
            this.state.summedValues[y].total += this.state.sales[x].fare;
        }
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
                    <td>
                    </td>
                </tr>
            </Fragment>
        );

        return (
            <Container>
<<<<<<< HEAD
                <Dropdown
                    onSelect={key => {
                        this.setState({ saleTypeValue: key });
                        if (key === 'Interline') {
                            this.setState({
                                sales: this.state.sales.filter(
                                    sale =>
                                        String(sale[this.state.saleT]) ===
                                        'Interline'
                                )
                            });
                        } else {
                            this.setState({
                                sales: this.state.sales.filter(
                                    sale =>
                                        String(sale[this.state.saleT]) ===
                                        'Domestic'
                                )
                            });
                        }
                    }}
                >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
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
=======
>>>>>>> d16001e8203dcc11ce12eda7b299bd69cd13498a
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
                <Form>
                    <FormGroup>
                        <Button
                            bssize="medium"
                            variant="outline-danger"
<<<<<<< HEAD
                            onClick={() => {
                                let start = new Date(this.state.startDate);
                                let end = new Date(this.state.endDate);
                                start.setHours(0, 0, 0, 0);
                                end.setHours(0, 0, 0, 0);

                                axios
                                    .get(apiLinks.SALES + '/byDate', {
                                        params: { start, end }
                                    })
                                    .then(res => {
=======

                                onClick={() =>{
                                    /*
                                    let start = new Date(this.state.startDate);
                                    let end =new  Date(this.state.endDate);
                                    start.setHours(0,0,0,0);
                                    end.setHours(0,0,0,0);
/*
                                    axios.get( apiLinks.SALES +'/byDate',{params:{start, end}}).then(res => {
>>>>>>> d16001e8203dcc11ce12eda7b299bd69cd13498a
                                        const sales = res.data;
                                        this.setState({ sales });
                                    });

<<<<<<< HEAD
                                this.setState({
=======
                                    const fl = this.state.sales.filter(i => (Date.parse(i.date)>= Date.parse(start)));
                                    this.setState({sales: fl});
                                    const tl = this.state.sales.filter(i => (Date.parse(i.date)<= Date.parse(end)));
                                    this.setState({sales: tl});
                                */
                                    this.setState({
>>>>>>> d16001e8203dcc11ce12eda7b299bd69cd13498a
                                    sales: this.aggregateSales()
                                });
                            }}
                        >
                            Generate Report
                        </Button>
                        {''}
                    </FormGroup>
                </Form>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Advisor Code</th>
                            <th>Sales</th>
                            <th>Credit</th>
                            <th>Cash</th>
                            <th>Cheque</th>
                            <th>USD Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.summedValues.map(
                            ({
                                advisorCode,
                                saleNum,
                                credit,
                                cash,
                                cheque,
                                total
                            }) => (
                                <Fragment key={advisorCode}>
                                    {row(
                                        advisorCode,
                                        saleNum,
                                        credit,
                                        cash,
                                        cheque,
                                        total
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
