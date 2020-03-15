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

export class CustomerUpdate extends Component {
    state = {
        customer: {
            _id: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            discount: 0,
            customerType: null,
            creditCardNum: 0,
            expDate: '',
            securityCode: ''
        }
    };

    componentDidMount() {
        // console.log(this.props.match.params);
        // const getLink = apiLinks.CUSTOMERS + '/' + this.props.match.params.id;
        const getLink = apiLinks.CUSTOMERS + '/' + this.props.match.params.id;

        axios.get(getLink).then(res => {
            const tempCustomer = res.data;
            // console.log(res);

            this.setState({ ...this.state.customer, customer: tempCustomer });
        });
    }

    render() {
        function updateCustomer(e) {
            // for (var key in this.state.customers) {
            //     if (this.state.customers[key] === '') {
            //         console.log(key, ' ', this.state.customers[key]);
            //     }
            // }
            // console.log(this.state.customer);
            // axios.put(apiLinks.CUSTOMERS, this.state.customers).then(res => {
            //     console.log(res);
            // });
            e.preventDefault();

            axios
                .put(
                    apiLinks.CUSTOMERS + '/' + this.state.customer._id,
                    this.state.customer
                )
                .then(res => {
                    console.log(res);
                });
            // axios
            //     .put(apiLinks.CUSTOMERS + '/' + this.state.customer._id, {
            //         firstName: 'Royal',
            //         customerType: 'regular'
            //     })
            //     .then(res => {
            //         console.log(res);
            //     });
        }
        return (
            <Container>
                <form onSubmit={updateCustomer.bind(this)}>
                    {/* {console.log(this.state.customer)} */}
                    <FormGroup controlId="firstName" bssize="large">
                        <FormLabel>First Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.customer.firstName}
                            onChange={e =>
                                this.setState({
                                    customer: {
                                        ...this.state.customer,
                                        firstName: e.target.value
                                    }
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="lastName" bssize="large">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.customer.lastName}
                            onChange={e =>
                                this.setState({
                                    customer: {
                                        ...this.state.customer,
                                        lastName: e.target.value
                                    }
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="address" bssize="large">
                        <FormLabel>Address</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.customer.address}
                            onChange={e =>
                                this.setState({
                                    customer: {
                                        ...this.state.customer,
                                        address: e.target.value
                                    }
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="phoneNumber" bssize="large">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.customer.phoneNumber}
                            onChange={e =>
                                this.setState({
                                    customer: {
                                        ...this.state.customer,
                                        phoneNumber: e.target.value
                                    }
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="discount" bssize="large">
                        <FormLabel>Discount</FormLabel>
                        <FormControl
                            autoFocus
                            type="Number"
                            value={this.state.customer.discount}
                            onChange={e =>
                                this.setState({
                                    customer: {
                                        ...this.state.customer,
                                        discount: e.target.value
                                    }
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="creditCardNum" bssize="large">
                        <FormLabel>Credit Card Number</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.customer.creditCardNum}
                            onChange={e =>
                                this.setState({
                                    customer: {
                                        ...this.state.customer,
                                        creditCardNum: e.target.value
                                    }
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="expDate" bssize="large">
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl
                            autoFocus
                            type="Date"
                            value={this.state.customer.expDate}
                            onChange={e =>
                                this.setState({
                                    customer: {
                                        ...this.state.customer,
                                        expDate: e.target.value
                                    }
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="securityCode" bssize="large">
                        <FormLabel>Security Code</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.customer.securityCode}
                            onChange={e =>
                                this.setState({
                                    customer: {
                                        ...this.state.customer,
                                        securityCode: e.target.value
                                    }
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup controlId="customerType" bssize="large">
                        <FormLabel>Customer Type</FormLabel>
                        <Dropdown
                            onSelect={key => {
                                this.setState({
                                    customer: {
                                        ...this.state.customer,
                                        customerType: key
                                    }
                                });
                            }}
                        >
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {this.state.customer.customerType}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="valued">
                                    Valued
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="regular">
                                    Regular
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FormGroup>
                    <Button block bssize="large" type="submit">
                        Login
                    </Button>
                </form>
            </Container>
        );
    }
}
