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
    };

    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        axios.get(apiLinks.SALES).then(res => {

            const sales = res.data;
            this.setState({sales});
        });
    }

    onOpenClick(e, _id) {
        console.log(e, _id);
    }

    aggregateSales() {
        var x =0, y=0;
        for (x = 0; x < this.state.sales.length; x++) {
            var k=0;
            for (k=0;k<this.state.summedValues.length;k++) {
                if (this.state.summedValues[k].advisorCode == this.state.sales[x].advisorCode)
                    break;
            }
            y = k;
            if (k == this.state.summedValues.length ) {
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
            if (this.state.sales[x].paymentMethod === "creditCard") {
                this.state.summedValues[y].credit += this.state.sales[x].fare;
            } else if (this.state.sales[x].paymentMethod === "cheque") {
                this.state.summedValues[y].cheque += this.state.sales[x].fare;
            } else if (this.state.sales[x].paymentMethod === "cash") {
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
                <tr key = {advisorCode}>
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
                        <Button
                            className="open-btn"
                            color="primary"
                            size="sm"
                            onClick={this.onOpenClick.bind(this, advisorCode)}
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

                    <FormGroup>
                        <Button
                            bssize="medium"
                            variant="outline-danger"
//                            onClick={() => this.aggregateSales()
                                onClick={() => this.setState({
                                    sales: this.aggregateSales()
                                })
                            }
                        >

                            Generate Report
                        </Button>{''}
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
                            <Fragment key={advisorCode} >
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
