import React, { Component, Fragment } from 'react';
import { Container, Table, Button } from 'reactstrap';
import axios from 'axios';
import {
    Form,
    FormGroup,
    FormLabel,
    FormControl,
    Dropdown
} from 'react-bootstrap';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');
export default class TableOfCustomers extends Component {
    mounted = false; //to make sure server process is stopped
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        customers: [],
        filterString: '',
        filterCondition: 'Please Select'
    };

    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        this.mounted = true;

        axios.get(apiLinks.CUSTOMERS).then(res => {
            if (this.mounted) {
                const customers = res.data;
                this.setState({ customers });
            }
        });
    }

    onOpenClick(e, _id) {
        console.log(e, _id);
    }

    filter() {
        // console.log(this.state.filterString);
        this.setState({
            customers: this.state.customers.filter(
                customer =>
                    String(customer[this.state.filterCondition]) ===
                    String(this.state.filterString)
            )
        });
    }
    reset() {
        axios.get(apiLinks.CUSTOMERS).then(res => {
            const customers = res.data;
            this.setState({ customers });
        });
    }
    render() {
        /**
         * Will return a Fragment to be used when mapping in the render function.
         * Allows to break down the data into rows and TD.
         * @param {The MongoDB ID of the object in the collection} _id
         */
        const row = (
            _id,
            firstName,
            lastName,
            address,
            phoneNumber,
            customerType
        ) => (
            <Fragment>
                <tr key={_id}>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{address}</td>
                    <td>{phoneNumber}</td>
                    <td>{customerType}</td>
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
                    <FormGroup controlId="filterCondition" bssize="large">
                        <FormLabel>Filter Condition</FormLabel>
                        <Dropdown
                            onSelect={key => {
                                this.setState({ filterCondition: key });

                                // console.log(_.startCase(key));
                            }}
                        >
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {_.startCase(this.state.filterCondition)}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="firstName">
                                    First Name
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="lastName">
                                    Last Name
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="address">
                                    Address
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="phoneNumber">
                                    Phone Number
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="customerType">
                                    Customer Type
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FormGroup>
                    <FormGroup controlId="lastName" bssize="large">
                        <FormLabel>Filter: </FormLabel>
                        <FormControl
                            autoFocus
                            type="string"
                            value={this.state.filterString}
                            onChange={e => {
                                this.setState({
                                    filterString: e.target.value
                                });
                            }}
                        />
                    </FormGroup>

                    <Button bssize="large" onClick={() => this.filter()}>
                        Filter
                    </Button>
                    <Button bssize="large" onClick={() => this.reset()}>
                        Reset
                    </Button>
                </Form>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Customer Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map(
                            ({
                                _id,
                                firstName,
                                lastName,
                                address,
                                phoneNumber,
                                customerType
                            }) => (
                                <Fragment key={_id}>
                                    {row(
                                        _id,
                                        firstName,
                                        lastName,
                                        address,
                                        phoneNumber,
                                        customerType
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

/* 
    //calculations.map is used to map all the data from calculations (contains the collection from mongo) into seperate elments
    {calculations.map( 
        ({ _id, calculationString, date, userEmail }) => (
            <Fragment>
            // only uses the data of that user. 
            //THIS IS ESSENTIALLY A FILTER. COULD BE USED IN A METHOD TO PROVIDE FILTERING IN ATS
                {userEmail === user.email
                    ? row(
                          _id,
                          calculationString,
                          date,
                          userEmail
                      )
                    : null}
            </Fragment>
        )
    )} */
