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
        commissions: [],
        discountGetV: [],
        staff: [],
        cCode: '',
        t440:"",
        t420: "",
        t201: "",
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
            .get(apiLinks.COMMISSIONRATE)
            .then(res => {
                const commissions = res.data;
                this.setState({ commissions });
            })
            .catch(err => console.log('Error code: ', err));

        axios
            .get(apiLinks.STAFFMEMBERS)
            .then(res => {
                const staff = res.data;
                this.setState({ staff });

            })
            .catch(err => console.log('Error code: ', err));
    }
    assignDiscount(e) {
        e.preventDefault();

        //Accessing the correct staff to update
        const st = this.state.cCode;
        //filtering first name
        let x =0;
        for (var i = 0; i <this.state.staff.length; i++){
            if (this.state.staff[i].advisorCode == st){
                x =i;
            }
        }
        //getting the commission to assign the correct value

        const fc = this.state.commissions.filter(
            i => String(i.name) === this.state.dName
            //this.state.dName
        );
        this.setState({commissions :fc});

        const updatedStaff ={
            firstName: this.state.staff[x].firstName,
            lastName: this.state.staff[x].lastName,
            address: this.state.staff[x].address,
                username:this.state.staff[x].username,
                password:this.state.staff[x].password,
        staffType: this.state.staff[x].staffType,
        advisorCode: this.state.staff[x].advisorCode,
        commissionRate440:this.state.commissions[0].ticket440,
        commissionRate420: this.state.commissions[0].ticket420,
        commissionRate201: this.state.commissions[0].ticket201,

        };
        axios
            .put(
                apiLinks.STAFFMEMBERS + '/' + this.state.staff[x]._id,
                updatedStaff
            )
            .then(res => {
                console.log(res);
            });
    }


    render() {
        return (
            <Container>
                <h2>Assign New Commission Rates</h2>

                <FormLabel>Staff Code</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.cCode}
                    onChange={e => {
                        this.setState({cCode: e.target.value});
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
