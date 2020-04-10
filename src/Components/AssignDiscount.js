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
        cName: '',
        dName: '',
        dType: 'Select Discount Type',
        dV: '',
        cType: '',
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
    componentDidMount() {
        axios
            .get(apiLinks.DISCOUNT)
            .then((res) => {
                const discounts = res.data;
                this.setState({ discounts });
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
    assignDiscount(e) {
        e.preventDefault();

        //Accessing the correct customer to update
        const st = this.state.cName;
        const f = this.state.cName.split(' ');
        //filtering first name
        let i4;
        for (var i = 0; i < this.state.customers.length; i++) {
            if (this.state.customers[i].firstName == f[0]) {
                i4 = i;
                break;
            }
        }

        //getting the discount to assign the correct value
        let i3;
        for (var i2 = 0; i2 < this.state.discounts.length; i2++) {
            if (this.state.discounts[i2].name == this.state.dName) {
                i3 = i2;
                break;
            }
        }

        alert(this.state.discounts.length);

        let x = 0;
        if (this.state.dType === 'Fixed') {
            x = this.state.discounts[i3].fixedValue;
        } else if (this.state.dType === 'Flexible') {
            let z = this.state.customers[i4].paidThisMonth;
            let z2 = this.state.discounts[i3];

            if (z < z2.flexibleBand1) {
                x = z2.band1Value;
            } else if (z >= z2.flexibleBand1 && z < z2.flexibleBand2) {
                x = z2.band2Value;
            } else if (z >= z2.flexibleBand2) {
                x = z2.band3Value;
            }
        }
        const updatedCustomer = {
            firstName: this.state.customers[i4].firstName,
            lastName: this.state.customers[i4].lastName,
            address: this.state.customers[i4].address,
            phoneNumber: this.state.customers[i4].phoneNumber,
            customerType: this.state.customers[i4].customerType,
            discountName: this.state.dName,
            discountType: this.state.dType,
            discountValue: x,
            paidThisMonth: this.state.customers[i4].paidThisMonth,
        };
        axios
            .put(
                apiLinks.CUSTOMERS + '/' + this.state.customers[i4]._id,
                updatedCustomer
            )
            .then((res) => {
                console.log(res);
            });

        alert(
            'Discount: ' +
                this.state.dName +
                'has been assigned to: ' +
                this.state.customers[i4].firstName +
                this.state.customers[i4].lastName
        );
    }

    render() {
        return (
            <Container>
                <h2>
                    <strong>Assign Discount</strong>
                </h2>

                <FormLabel>Customer Name</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.cName}
                    onChange={(e) => {
                        this.setState({ cName: e.target.value });
                    }}
                />
                <FormLabel>Discount Name</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.dName}
                    onChange={(e) => {
                        this.setState({ dName: e.target.value });
                    }}
                />
                <p></p>
                <Dropdown
                    onSelect={(key) => {
                        this.setState({ dType: key });
                    }}
                >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {this.state.dType}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Fixed">Fixed</Dropdown.Item>
                        <Dropdown.Item eventKey="Flexible">
                            Flexible
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <p></p>
                <Button
                    bssize="medium"
                    variant="outline-primary"
                    onClick={(e) => {
                        this.assignDiscount(e);
                    }}
                    block
                >
                    Assign Discount
                </Button>
                <br></br>
            </Container>
        );
    }
}
