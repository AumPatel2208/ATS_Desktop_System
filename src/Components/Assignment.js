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
    Form
} from 'react-bootstrap';

let apiLinks = require('../api/config.json');
const _ = require('lodash'); //Library to Change Cases of things

export class Assignment extends Component {
    state = {
        blank: {
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
        },
        code: "",
        assignedBatch: ""
    };

    componentDidMount() {
        // console.log(this.props.match.params);
        // const getLink = apiLinks.CUSTOMERS + '/' + this.props.match.params.id;
        const getLink = apiLinks.BLANKS + '/' + this.props.match.params.id;
            axios.get(getLink).then(res => {
                const tempblank = res.data;
                // console.log(res);

                this.setState({
                    ...this.state.blank,
                    blank: tempblank
                });
            });
    }



    render() {
        function updateBlank(e) {
            e.preventDefault();

                axios.put(apiLinks.BLANKS + '/' + this.state.blank._id,
                        this.state.blank
                    )
                    .then(res => {
                        console.log(res);
                    });
            }

            function assignBlanks(e) {
                let d = Date(Date.now());
                d.setHours(0,0,0,0);

                const newAssignment = {
                    date: d,
                    advisorCode: this.state.code,
                    batchId: this.props.params.id

                };

                e.preventDefault();
                console.log('hello');

                axios.post(apiLinks.ASSIGN, newAssignment).then(response => {
                    console.log(response);
                });
            }

        return (

            <Form>
                <form onSubmit={updateBlank(e).bind(this)}>
                    {/* {console.log(this.state.customer)} */}

                    <h3>Assign Blanks</h3>
                    <FormGroup controlId="username" bssize="large">

                        <FormLabel>Batch Values</FormLabel>
                        <FormControl
                            autoFocus
                            type="batchValues"
                            value={this.state.assignedBatch}
                            onChange={e => this.setState({assignedBatch: e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup controlId="date" bssize="large">
                        <FormLabel>Advisor Code</FormLabel>
                        <FormControl
                            selected = {this.state.code}
                            onChange={ e=>
                                this.setState({code: e.target.value})
                            }

                        />
                    </FormGroup>
                    <Button
                        onClick={e => {
                            console.log("hit");
                            //  this.handleSubmit(e);
                            //this.updateInitBatch(e)
                            //this.findInitBatch(e)
                        }}
                    >
                        Assign Blanks
                    </Button>

                    <Button  block bssize="large" type="submit">
                        {this.props.isNew
                            ? 'Create Customer'
                            : 'Update Customer'}

                    </Button>
                </form>

            </Form>


        );
    }
}
