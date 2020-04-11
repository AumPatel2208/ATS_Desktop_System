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
export default class CommissionRates extends Component {
    state = {
        commissions: [],
        discountGetV: [],
        staff: [],
        name: '',
        t440: '',
        t444: '',
        t420: '',
        t210: '',
        sName: '',
        cName: '',
        staffMember: {
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
            .get(apiLinks.COMMISSIONRATE)
            .then((res) => {
                const commissions = res.data;
                this.setState({ commissions });
            })
            .catch((err) => console.log('Error code: ', err));
    }

    createCommission(e) {
        e.preventDefault();
    //adds a new commission into the database
        const newCommission = {
            name: this.state.name,
            ticket440: this.state.t440,
            ticket444: this.state.t444,
            ticket420: this.state.t420,
            ticket201: this.state.t210,
        };
        console.log(newCommission);

        axios
            .post(apiLinks.COMMISSIONRATE + '/', newCommission)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => console.log('Error code: ', err));

        alert('New Commission Created:'+ ' ' + this.state.name);
       // Window.location.reload();
    }

    onOpenClick(_id) {
        console.log(_id);
    }

    render() {
        const row = (name, ticket440, ticket444, ticket420, ticket201) => (
            <Fragment>
                <tr>
                    <td>{name}</td>
                    <td>{ticket440}</td>
                    <td>{ticket444}</td>
                    <td>{ticket420}</td>
                    <td>{ticket201}</td>
                    <td></td>
                </tr>
            </Fragment>
        );

        return (
            <Container>
                <h2>
                    <strong>Add New Commission Rates</strong>
                </h2>
                <br />

                <FormLabel>Commission Rate Name</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.name}
                    onChange={(e) => {
                        this.setState({ name: e.target.value });
                    }}
                />
                <FormLabel> Commission Value 440</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.t440}
                    onChange={(e) => {
                        this.setState({ t440: e.target.value });
                    }}
                />
                <FormLabel> Commission Value 444</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.t444}
                    onChange={(e) => {
                        this.setState({ t444: e.target.value });
                    }}
                />
                <FormLabel>Commission Value 420</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.t420}
                    onChange={(e) => {
                        this.setState({ t420: e.target.value });
                    }}
                />
                <FormLabel>Commission Value 201</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.t210}
                    onChange={(e) => {
                        this.setState({ t210: e.target.value });
                    }}
                />
                <br />

                <Button
                    bssize="medium"
                    variant="outline-primary"
                    onClick={(e) => {
                        this.createCommission(e);
                    }}
                    //onClick= {this.createDiscount()}
                    block
                >
                    Create Commission
                </Button>
                <br />

                <br />

                <h2>
                    <strong>Current Commission Rates</strong>
                </h2>
                {this.state.commissions.length > 0 ? (
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th>Commission Name</th>
                                <th>Value for 440 Ticket</th>
                                <th>Value for 444 Ticket</th>
                                <th>Value for 420 Ticket</th>
                                <th>Value for 201 Ticket</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.commissions.map(
                                ({
                                    name,
                                    ticket440,
                                    ticket444,
                                    ticket420,
                                    ticket201,
                                }) => (
                                    <Fragment>
                                        {row(
                                            name,
                                            ticket440,
                                            ticket444,
                                            ticket420,
                                            ticket201
                                        )}
                                    </Fragment>
                                )
                            )}
                        </tbody>
                    </Table>
                ) : (
                    <h4>Commission Rates Empty.</h4>
                )}
                <br></br>
            </Container>
        );
    }
}
