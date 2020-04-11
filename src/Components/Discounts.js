import React, { Component, Fragment } from 'react';
import { Container, Table } from 'reactstrap';
import axios from 'axios';
import {
    Form,
    FormGroup,
    FormLabel,
    FormControl,
    Dropdown,
    Button,
} from 'react-bootstrap';
import { GetUSer } from '../store/User';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');
export default class Discounts extends Component {
    state = {
        discounts: [],
        discountGetV: [],
        customers: [],
        name: '',
        fixed: '',
        b1: '-',
        b2: '-',
        b3: '-',
        b1v: '-',
        b2v: '-',
        b3v: '-',

        cName: '',
        dName: '',
        dType: 'Select Discount Type',
        dV: '',
        customer: {
            _id: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            discount: 0,
            customerType: null,
            discountName: '',
            discountType: '',
            discountValue: '',
        },
    };

    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        axios
            .get(apiLinks.DISCOUNT)
            .then((res) => {
                const discounts = res.data;
                this.setState({ discounts });

                this.setState({ discountsGetV: discounts });
                const fc = this.state.discountGetV.filter(
                    (i) => String(i.name) === 'Plan1'
                    //this.state.dName
                );
                this.setState({ discountGetV: fc });
            })
            .catch((err) => console.log('Error code: ', err));

        axios
            .get(apiLinks.CUSTOMERS)
            .then((res) => {
                const customers = res.data;
                this.setState({ customers });
            })
            .catch((err) => console.log('Error code: ', err));
    }

    createDiscount(e) {
        //adds a new discount into the database
        e.preventDefault();

        const newDiscount = {
            name: this.state.name,
            fixedValue: this.state.fixed,
            flexibleBand1: this.state.b1,
            band1Value: this.state.b1v,
            flexibleBand2: this.state.b2,
            band2Value: this.state.b2v,
            band3Value: this.state.b3v,
        };
        console.log(newDiscount);

        axios
            .post(apiLinks.DISCOUNT + '/', newDiscount)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => console.log('Error code: ', err));

        alert('Discount Created');
        window.location.reload();
    }

    onOpenClick(_id) {
        console.log(_id);
    }

    render() {
        const row = (
            name,
            fixedValue,
            flexibleBand1,
            band1Value,
            flexibleBand2,
            band2Value,
            band3Value
        ) => (
            <Fragment>
                <tr>
                    <td>{name}</td>
                    <td>{fixedValue}</td>
                    <td>{flexibleBand1}</td>
                    <td>{band1Value}</td>
                    <td>{flexibleBand2}</td>
                    <td>{band2Value}</td>
                    <td>{band3Value}</td>
                    <td></td>
                </tr>
            </Fragment>
        );

        return (
            <Container>
                <h2>
                    <strong>Add New Discount</strong>
                </h2>

                <FormLabel>Discount Name</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.name}
                    onChange={(e) => {
                        this.setState({ name: e.target.value });
                    }}
                />
                <FormLabel>Fixed Discount Value</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.fixed}
                    onChange={(e) => {
                        this.setState({ fixed: e.target.value });
                    }}
                />
                <FormLabel>Flexible Discount Band 1</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.b1}
                    onChange={(e) => {
                        this.setState({ b1: e.target.value });
                    }}
                />
                <FormLabel>Band 1 Discount(Less than Band 1)</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.b1v}
                    onChange={(e) => {
                        this.setState({ b1v: e.target.value });
                    }}
                />
                <FormLabel>Flexible Discount Band 2</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.b2}
                    onChange={(e) => {
                        this.setState({ b2: e.target.value });
                    }}
                />
                <FormLabel>
                    Band 2 Discount(Greater than band 1, less than 2)
                </FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.b2v}
                    onChange={(e) => {
                        this.setState({ b2v: e.target.value });
                    }}
                />
                <FormLabel>Band 3 Discount(greater than band 2)</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.b3v}
                    onChange={(e) => {
                        this.setState({ b3v: e.target.value });
                    }}
                />
                <p></p>
                <Button
                    bssize="medium"
                    variant="outline-primary"
                    onClick={(e) => {
                        this.createDiscount(e);
                    }}
                    //onClick= {this.createDiscount()}
                    block
                >
                    Create Discount
                </Button>
                <br />

                <br />

                <h2>Current Discounts</h2>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>DiscountName</th>
                            <th>Fixed Value Discount</th>
                            <th>Flexible Band 1</th>
                            <th>Band 1 Discount</th>
                            <th>Flexible Band 2</th>
                            <th>Band 2 Discount</th>
                            <th>Band 3 Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.discounts.map(
                            ({
                                name,
                                fixedValue,
                                flexibleBand1,
                                band1Value,
                                flexibleBand2,
                                band2Value,
                                band3Value,
                            }) => (
                                <Fragment>
                                    {row(
                                        name,
                                        fixedValue,
                                        flexibleBand1,
                                        band1Value,
                                        flexibleBand2,
                                        band2Value,
                                        band3Value
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
