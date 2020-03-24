import {Button, Container, Table} from "reactstrap";
import React, {Component, Fragment} from "react";
import {Dropdown, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import {useStoreState} from "pullstate";
import {UserStore} from "../store/UserStore";

let apiLinks = require('../api/config.json');


export default class SaleForm extends Component{

    state = {
        sales: [],
        date: new Date(),
        code: "",
        custName:"",
        saleType: "Select Sale Type",
        tickNum: "",
        fare: "",
        Tlocal: "",
        Tother: "",
        method: "Payment Method",
        creditNum: "-",
        expDate: "-",
        secCode: "-",
        rate: "",
        adCode:"",
        notes:"",
        USDExchangeRate: ""
    };

    creditHandler(){
        if (this.state.method === "CreditCard"){
            return <Fragment>


                <FormLabel>Credit Card Number</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.creditNum}
                    onChange={e => {
                        this.setState({
                            creditNum: e.target.value
                        });
                    }}
                />
                <FormLabel>Expiration Date</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.expDate}
                    onChange={e => {
                        this.setState({
                            expDate: e.target.value
                        });
                    }}
                />
                <FormLabel>Security Code</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.secCode}
                    onChange={e => {
                        this.setState({
                            secCode: e.target.value
                        });
                    }}
                />

            </Fragment>
        }

    }

    taxHandler(){
        if(this.state.saleType === "Interline"){
            return <Fragment>
                <FormLabel>Local Tax</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.Tlocal}
                    onChange={e => {
                        this.setState({
                            Tlocal: e.target.value
                        });
                    }}
                />
            </Fragment>
        }
    }
    handleSubmit(event) {
        const newSale = {
            ticketNumber: this.state.tickNum,
            saleType: this.state.saleType,
            fare:this.state.fare,
            currency: this.state.code,
            localTax: this.state.Tlocal,
            otherTax:this.state.Tother,
            paymentMethod: this.state.method,
            creditCardNum: this.state.creditNum,
            expDate: this.state.expDate,
            securityCode: this.state.secCode,
            commissionRate: this.state.rate,
            custName: this.state.custName,
            advisorCode: this.state.adCode,
            saleDate: Date.now(),
            notes: this.state.notes,
            USDExchangeRate: this.state.USDExchangeRate

        };

        event.preventDefault();
        console.log('hello');

        let User = useStoreState(UserStore, s=> s.User);
        this.setState({adCode: User.advisorCode});
        this.setState({commissionRate: User.commissionRate});

        axios.post(apiLinks.SALES, newSale ).then(response => {
            console.log(response);
        });

    }

    render() {

        return (
            <Container>
                <Form>

                    <Dropdown
                        onSelect={key => {
                            this.setState({saleType: key});
                        }}
                    >
                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                        >
                            {this.state.saleType}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Domestic">
                                Domestic
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Interline">
                                Interline
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                        onSelect={key => {
                            this.setState({method: key});
                        }}
                    >
                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                        >
                            {this.state.method}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Cash">
                                Cash
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="CreditCard">
                                Credit card
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>



                    <FormLabel>Ticket Number</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.tickNum}
                        onChange={e => {
                            this.setState({
                                tickNum: e.target.value
                            });
                        }}
                    />
                    <FormLabel>Fare</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.fare}
                        onChange={e => {
                            this.setState({
                                fare: e.target.value
                            });
                        }}
                    />

                    <Fragment>{this.creditHandler()}</Fragment>
                    <Fragment>{this.taxHandler()}</Fragment>


                    <FormLabel>Other Tax</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.Tother}
                        onChange={e => {
                            this.setState({
                                Tother: e.target.value
                            });
                        }}
                    />

                    <FormLabel>Customer Name</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.Tother}
                        onChange={e => {
                            this.setState({
                                Tother: e.target.value
                            });
                        }}
                    />
                    <FormLabel>Notes</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.notes}
                        onChange={e => {
                            this.setState({
                                notes: e.target.value
                            });
                        }}
                    />





                    <Button
                        bssize="medium"
                        variant="outline-danger"
                        onClick={e => {
                            let today = this.state.date;
                            axios.get( apiLinks.EXCHANGERATES +'/byDate',{params:{today}}).then(res => {
                                const exchange = res.data;
                                this.setState({USDExchangeRate: exchange.toUSDRate});
                            });

                            this.handleSubmit(e)
                        }}
                        block
                    >
                        Sell Ticket
                    </Button>

                </Form>
            </Container>
        );
    }
}

