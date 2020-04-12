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
    Form,
} from 'react-bootstrap';
import { CommissionUpdate } from './CommissionUpdate';

let apiLinks = require('../api/config.json');
const _ = require('lodash'); //Library to Change Cases of things

// Component to update the customer
export class CustomerUpdate extends Component {
    state = {
        staff: {
            _id: '',
            firstName: '',
            lastName: '',
            address: '',
            // phoneNumber: '',
            username: '',
            staffType: '',
            advisorCode: 0,
            commisionRate: 0,
        },
    };

    // Load data when component is mounted
    async componentDidMount() {
        const getLink =
            apiLinks.STAFFMEMBERS + '/' + this.props.match.params.id;
        if (!this.props.isNew)
            await axios
                .get(getLink)
                .then((res) => {
                    const tempStaff = res.data;
                    // console.log(res);

                    this.setState({
                        ...this.state.staff,
                        staff: tempStaff,
                    });
                })
                .catch((err) => console.log('Error code: ', err));
    }

    // render the form
    render() {
        function updateCustomer(e) {
            e.preventDefault();

            if (!this.props.isNew) {
                axios
                    .put(
                        apiLinks.STAFFMEMBERS + '/' + this.state.staff._id,
                        this.state.staff
                    )
                    .then((res) => {
                        console.log(res);
                    });
            } else {
                console.log(this.state.staff);
                const newCustomer = {
                    firstName: this.state.staff.firstName,
                    lastName: this.state.staff.lastName,
                    address: this.state.staff.address,
                    username: this.state.staff.username,
                    staffType: this.state.staff.staffType,
                    advisorCode: this.state.staff.advisorCode,
                    commisionRate: this.state.staff.commisionRate,
                };
                axios
                    .post(apiLinks.STAFFMEMBERS, newCustomer)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((res) => console.log(res));
            }
        }

        // Return the form
        return (
            <Form>
                <form onSubmit={updateCustomer.bind(this)}>
                    <FormGroup controlId="firstName" bssize="large">
                        <FormLabel>First Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.staff.firstName}
                            onChange={(e) =>
                                this.setState({
                                    staff: {
                                        ...this.state.staff,
                                        firstName: e.target.value,
                                    },
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="lastName" bssize="large">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.staff.lastName}
                            onChange={(e) =>
                                this.setState({
                                    staff: {
                                        ...this.state.staff,
                                        lastName: e.target.value,
                                    },
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="address" bssize="large">
                        <FormLabel>Address</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.staff.address}
                            onChange={(e) =>
                                this.setState({
                                    staff: {
                                        ...this.state.staff,
                                        address: e.target.value,
                                    },
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="username" bssize="large">
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.staff.username}
                            onChange={(e) =>
                                this.setState({
                                    staff: {
                                        ...this.state.staff,
                                        username: e.target.value,
                                    },
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="commisionRate" bssize="large">
                        <FormLabel>Commision Rate</FormLabel>
                        <FormControl
                            autoFocus
                            type="Number"
                            value={this.state.staff.commisionRate}
                            onChange={(e) =>
                                this.setState({
                                    staff: {
                                        ...this.state.staff,
                                        commisionRate: e.target.value,
                                    },
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="advisorCode" bssize="large">
                        <FormLabel>Advisor Code</FormLabel>
                        <FormControl
                            autoFocus
                            type="Number"
                            value={this.state.staff.advisorCode}
                            onChange={(e) =>
                                this.setState({
                                    staff: {
                                        ...this.state.staff,
                                        advisorCode: e.target.value,
                                    },
                                })
                            }
                        />
                    </FormGroup>

                    <Button block bssize="large" type="submit">
                        {this.props.isNew
                            ? 'Create Staff Member'
                            : 'Update Customer'}
                    </Button>
                </form>
            </Form>
        );
    }
}
