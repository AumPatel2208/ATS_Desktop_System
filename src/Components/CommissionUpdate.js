import React, { Component, Fragment } from 'react';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import axios from 'axios';
import {
    Button,
    Dropdown,
    FormGroup,
    FormLabel,
    FormControl,
    Container
} from 'react-bootstrap';

let apiLinks = require('../api/config.json');
const _ = require('lodash'); //Library to Change Cases of things

export class CommissionUpdate extends Component {
    state = {
        discounts: [],
        discountGetV: [],
        customers: [],
        cName: '',
        dName: '',
        dType: 'Select Commission Type',
        dV:"",
        cType: "",
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
            discountValue: ""
        }
    };
    componentDidMount() {
        axios
            .get(apiLinks.DISCOUNT)
            .then(res => {
                const discounts = res.data;
                this.setState({ discounts });


            })
            .catch(err => console.log('Error code: ', err));

        axios
            .get(apiLinks.CUSTOMERS)
            .then(res => {
                const customers = res.data;
                this.setState({ customers });
            })
            .catch(err => console.log('Error code: ', err));
    }
    assignDiscount(e) {
        e.preventDefault();

        //Accessing the correct customer to update
        const st = this.state.cName;
        const f = this.state.cName.split(" ");
        //filtering first name
        const c = this.state.customers.filter(
            i => String(i.firstName) === f[0]
        );
        this.setState({customers: c});
        //filtering last name
        const cl = this.state.customers.filter(
            i => String(i.firstName) === f[1]
        );
        this.setState({customers: cl});

        //getting the discount to assign the correct value

        const fc = this.state.discounts.filter(
            i => String(i.name) === "Plan1"
            //this.state.dName
        );
        this.setState({discounts :fc});

        let x = 0;
        if (this.state.dType === "Fixed") {
            x= this.state.discounts[0].fixedValue;
        } else if (this.state.dType === "Flexible") {
            let z = this.state.customers[0].paidThisMonth;
            let z2 = this.state.discounts[0];

            if (z < z2.flexibleBand1) {
                x = z2.band1Value;
            } else if ((z >= z2.flexibleBand1) && (z < z2.flexibleBand2)) {
                x= z2.band2Value;
            } else if (z >= z2.flexibleBand2) {
                x= z2.band3Value;
            }

        }
        const updatedCustomer ={
            _id: this.state.customers[0]._id,
            firstName: this.state.customers[0].firstName,
            lastName: this.state.customers[0].lastName,
            address: this.state.customers[0].address,
            phoneNumber: this.state.customers[0].phoneNumber,
            customerType: this.state.customers[0].customerType,
            discountName: this.state.dName,
            discountType:this.state.dType,
            discountValue: x,
            paidThisMonth: this.state.customers[0].paidThisMonth
        };
        axios
            .put(
                apiLinks.CUSTOMERS + '/' + this.state.customers[0]._id,
                updatedCustomer
            )
            .then(res => {
                console.log(res);
            });
    }


    render() {
        return (
            <Container>
                <h2>Assign New Commission Rates</h2>

                <FormLabel>Customer Name</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.cName}
                    onChange={e => {
                        this.setState({cName: e.target.value});
                    }}
                />
                <FormLabel>Commission Name</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.dName}
                    onChange={e => {
                        this.setState({dName: e.target.value});
                    }}
                />
                <Button
                    bssize="medium"
                    variant="outline-danger"
                    onClick={e => {
                        this.assignDiscount(e);
                    }}
                    block
                >
                    Assign Commission Rate
                </Button>

            </Container>
        )

    }
}
