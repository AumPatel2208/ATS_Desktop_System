import React, { Component, Fragment } from 'react';
import { Container, Table } from 'reactstrap';
import axios from 'axios';
import {
    Form,
    FormGroup,
    FormLabel,
    FormControl,
    Dropdown,
    Button
} from 'react-bootstrap';
import { CustomerUpdate } from './CustomerUpdate';
import { Lightbox } from './Lightbox';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');
export default class TableOfAdvisors extends Component {
    mounted = false; //to make sure server process is stopped
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        advisors: [],
        filterString: '',
        filterCondition: 'Please Select',
        sort: 'Please Select'
    };

    //runs when component mounts, use to gets the data from db
    async componentDidMount() {
        this.mounted = true;

        await axios
            .get(apiLinks.STAFFMEMBERS)
            .then(async res => {
                if (this.mounted) {
                    const advisors = await res.data;
                    this.setState({ advisors });
                }
            })
            .catch(err => {
                console.log(err);
            });
        this.filterAdvisors();
    }

    onOpenClick(_id) {
        console.log(_id);
    }

    filterAdvisors() {
        this.setState({
            advisors: this.state.advisors.filter(
                advisor => advisor.staffType === 'TravelAdvisor'
            )
        });
    }

    filter() {
        if (
            !(
                this.state.filterCondition === 'Please Select' ||
                this.state.filterString === ''
            )
        ) {
            this.setState({
                advisors: this.state.advisors.filter(
                    advisor =>
                        String(advisor[this.state.filterCondition]) ===
                        String(this.state.filterString)
                )
            });
        }
    }
    async reset() {
        await axios
            .get(apiLinks.STAFFMEMBERS)
            .then(async res => {
                const advisors = await res.data;
                this.setState({ advisors });
            })
            .catch(err => console.log('Error code: ', err));
        this.filterAdvisors();
    }
    sortList(key) {
        this.setState({
            advisors: []
                .concat(this.state.advisors)
                .sort((a, b) => (a[`${key}`] > b[`${key}`] ? 1 : -1))
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
            username, //
            advisorCode, //
            commissionRate
        ) => (
            <Fragment>
                <tr key={_id}>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{address}</td>
                    <td>{username}</td>
                    <td>{advisorCode}</td>
                    <td>{commissionRate}</td>
                    <td>
                        {/* <CustomerUpdate id={_id}></CustomerUpdate> */}
                        <Button
                            className="open-btn"
                            color="primary"
                            size="lg"
                            onClick={this.onOpenClick.bind(this, _id)}
                            href={'./staff/' + _id}
                        >
                            EDIT
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
                                <Dropdown.Item eventKey="username">
                                    Username
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="advisorCode">
                                    Advisor Code
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="commissionRate">
                                    Commission Rate
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
                    <Button
                        bssize="large"
                        variant="outline-primary"
                        onClick={() => this.filter()}
                        block
                    >
                        Filter
                    </Button>{' '}
                    <Button
                        bssize="large"
                        variant="outline-danger"
                        onClick={() => this.reset()}
                        block
                    >
                        Reset
                    </Button>{' '}
                    <Button
                        bssize="large"
                        variant="info"
                        href="/customer/create"
                        block
                    >
                        Create New Customer
                    </Button>
                </Form>
                <br></br>
                <br></br>
                <Form>
                    <FormGroup controlId="sort" bssize="large">
                        <FormLabel>Sort</FormLabel>
                        <Dropdown
                            onSelect={key => {
                                this.setState({ sort: key });
                                this.sortList(key);
                                // console.log(_.startCase(key));
                            }}
                        >
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {_.startCase(this.state.sort)}
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
                </Form>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Username</th>
                            <th>Advisor Code</th>
                            <th>Commission Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.advisors.map(
                            ({
                                _id,
                                firstName,
                                lastName,
                                address,
                                username,
                                advisorCode,
                                commissionRate
                            }) => (
                                <Fragment key={_id}>
                                    {row(
                                        _id,
                                        firstName,
                                        lastName,
                                        address,
                                        username,
                                        advisorCode,
                                        commissionRate
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
