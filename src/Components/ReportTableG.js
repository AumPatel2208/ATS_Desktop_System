import React, { Component, Fragment, } from 'react';
import { Container, Table, Button } from 'reactstrap';
import axios from 'axios';
import {
    Form,
    FormGroup,
    Dropdown, FormControl
} from 'react-bootstrap';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');
export default class ReportTableG extends Component {
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        sales: [],
        saleT: 'saleType',
        advisor:'advisorCode',
        saleTypeValue: 'Choose Sale Type',
        cash: 0,
        credit: 0,
        cheque: 0


    };



    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        axios.get(apiLinks.SALES).then(res => {
            const sales = res.data;
            this.setState({ sales });
        });
    }

    onOpenClick(e, _id) {
        console.log(e, _id);
    }
    render() {
        const row = (
            _id,
            fare,
            currency,
            USDExchangeRate,
            paymentMethod,
            commissionRate,
            advisorCode,
            saleDate,
            saleType,
            cash,
            credit,
            cheque,
            total
        ) => (
            <Fragment>
                <tr key={_id}>
                    <td>{fare}</td>
                    <td>{currency}</td>
                    <td>{USDExchangeRate}</td>
                    <td>{commissionRate}</td>
                    <td>{advisorCode}</td>
                    <td>{saleDate}</td>
                    <td>{saleType}</td>
                    <td>{cash}</td>
                    <td>{credit}</td>
                    <td>{cheque}</td>
                    <td>{total}</td>
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
                <Form>
                    <FormGroup controlId="saleT" bssize="large">

                        <Dropdown
                            onSelect={key => {
                                this.setState({saleTypeValue: key});
                                var credit = 0;
                                var cash = 0;
                                var cheque = 0;
                                if (key === "Interline") {
                                    this.setState({
                                        sales: this.state.sales.filter(
                                            sale =>
                                                String(sale[this.state.saleT]) ===
                                                "interline")
                                    });
                                } else {
                                    this.setState({
                                        sales: this.state.sales.filter(
                                            sale =>
                                                String(sale[this.state.saleT]) ===
                                                "domestic")
                                    });
                                }

/*

FILTER BY DATES FIRST THEN ADD THIS UP
                                var i;
                                for (i=0; i<sales.length; i++){
                                    if (String(sale[this.state.advisor]) === String(advisor){
                                        if (String(sale[this.state.paymentMethod]) === "creditCard"){
                                            credit += parseInt(sale[this.state.fare]);
                                        }
                                        else if (String(sale[this.state.paymentMethod]) === "cash"){
                                            cash += parseInt(sale[this.state.fare]);
                                        }
                                        else if (String(sale[this.state.paymentMethod]) === "cheque"){
                                            cheque += parseInt(sale[this.state.fare]);
                                        }
                                    }
                                    }

 */



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
                    </FormGroup>



                </Form>
                <Table className="mt-4">

                    <thead>
                    <tr>
                        <th>Currency</th>
                        <th>USD Exchange Rate</th>
                        <th>Payment Method</th>
                        <th>Commission Rate</th>
                        <th>Advisor Code</th>
                        <th>Sale Date</th>
                        <th>Credit</th>
                        <th>Cash</th>
                        <th>Cheque</th>
                        <th>USD Total</th>
                    </tr>
                    </thead>


                    <tbody>
                    {this.state.sales.map(
                        ({
                             _id,
                             currency,
                             USDExchangeRate,
                             commissionRate,
                             advisorCode,
                             saleDate

                         }) => (
                            <Fragment key={_id}>
                                {row(
                                    _id,
                                    currency,
                                    USDExchangeRate,
                                    commissionRate,
                                    advisorCode,
                                    saleDate,
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

