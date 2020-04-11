import React, { Component, Fragment } from 'react';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import axios from 'axios';
import {
    Button,
    Dropdown,
    FormGroup,
    FormLabel,
    FormControl,
    Container,
} from 'react-bootstrap';

let apiLinks = require('../api/config.json');
const _ = require('lodash'); //Library to Change Cases of things

export class CommissionUpdate extends Component {
    state = {
        commissions: [],
        discountGetV: [],
        staff: [],
        cCode: '',
        t440: '',
        t444: '',
        t420: '',
        t201: '',
        dName: '',
        dType: 'Select Commission Type',
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
            .get(apiLinks.COMMISSIONRATE)
            .then((res) => {
                const commissions = res.data;
                this.setState({ commissions });
            })
            .catch((err) => console.log('Error code: ', err));

        axios
            .get(apiLinks.STAFFMEMBERS)
            .then((res) => {
                const staff = res.data;
                this.setState({ staff });
            })
            .catch((err) => console.log('Error code: ', err));
    }
    assignDiscount(e) {
        e.preventDefault();

        //Accessing the correct staff to update
        const st = this.state.cCode;
        //filtering first name
        let x = 0;
        for (var i = 0; i < this.state.staff.length; i++) {
            if (this.state.staff[i].advisorCode == st) {
                x = i;
            }
        }
        //getting the commission to assign the correct value
        let w = 0;
        for (var i = 0; i < this.state.commissions.length; i++) {
            if (this.state.commissions[i].name == this.state.dName) {
                w = i;
                break;
            }
        }
        const updatedStaff = {
            firstName: this.state.staff[x].firstName,
            lastName: this.state.staff[x].lastName,
            address: this.state.staff[x].address,
            username: this.state.staff[x].username,
            password: this.state.staff[x].password,
            staffType: this.state.staff[x].staffType,
            advisorCode: this.state.staff[x].advisorCode,
            commissionRate440: this.state.commissions[w].ticket440,
            commissionRate444: this.state.commissions[w].ticket440,
            commissionRate420: this.state.commissions[w].ticket420,
            commissionRate201: this.state.commissions[w].ticket201,
        };
        axios
            .put(
                apiLinks.STAFFMEMBERS + '/' + this.state.staff[x]._id,
                updatedStaff
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log('Error: ' + err);
            });


        alert("Commission Assigned");

    }

    render() {
        return (
            <Container>
                <h2>
                    <strong>Assign Commission Rates</strong>
                </h2>

                <FormLabel>Staff Code</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.cCode}
                    onChange={(e) => {
                        this.setState({ cCode: e.target.value });
                    }}
                />
                <FormLabel>Commission Name</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.dName}
                    onChange={(e) => {
                        this.setState({ dName: e.target.value });
                    }}
                />
                <br />
                <Button
                    bssize="medium"
                    variant="outline-primary"
                    onClick={(e) => {
                        this.assignDiscount(e);
                    }}
                    block
                >
                    Assign Commission Rate
                </Button>
            </Container>
        );
    }
}
