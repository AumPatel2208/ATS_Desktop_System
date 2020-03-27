import {Button, Container, Table} from "reactstrap";
import React, {Component, Fragment} from "react";
import {Dropdown, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import {useStoreState} from "pullstate";
import {UserStore} from "../store/UserStore";
import {GetUSer} from "../store/User";

let apiLinks = require('../api/config.json');

/*
function getExchangRate(ccode) {
    let d = new Date(Date.now());
    d.setHours(0, 0, 0, 0);
    let currency = ccode;
    let r = {};
    const url = apiLinks.EXCHANGERATES + '/sale';

    console.log (url);
    //let currency = this.state.Ccode;
    axios.get(url, { params: {d,currency}})

           .then(function (response) {
                console.log("A response");
                console.log(response);
                r =  response;
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function (response) { console.log("Finmal")});

        console.log("After");
        return r;
}
*/
export default class SaleForm extends Component {
    constructor() {
        super();
        this.getExchangRate = this.getExchangRate.bind(this);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            sales: [],
            date: new Date(),
            custName: "",
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
            adCode: "",
            notes: "",
            USDExchangeRate: "",
            Ccode: ""
        };
    }

    componentDidMount() {
        this.handleClick()
    }

    handleClick() {
        console.log("Click");
        axios.get('https://api.github.com/users/njclayhh')
            .then(response => console.log(response))

    }
    getExchangRate() {
        let d = new Date(Date.now());
        d.setHours(0, 0, 0, 0);
        let currency = this.state.Ccode;
        let r = {};
        const url = apiLinks.EXCHANGERATES + '/sale';

        console.log (url);
        //let currency = this.state.Ccode;

        axios.get('https://api.github.com/users/njclayhh')
            .then(response => console.log(response))
        /*
        axios.get(url, { params: {d,currency}})

            .then(function (response) {
                console.log("A response");
                console.log(response);
                r =  response;
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function (response) { console.log("Finmal")});
        */
        console.log("After");
        return r;
    }

    creditHandler() {
        if (this.state.method === "CreditCard") {
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

    taxHandler() {
        if (this.state.saleType === "Interline") {
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
                <FormLabel>Currency Code</FormLabel>
                <FormControl
                    autoFocus
                    type="string"
                    value={this.state.Ccode}
                    onChange={e => {
                        this.setState({
                            Ccode: e.target.value
                        });
                    }}
                />
            </Fragment>
        }
    }

    /*
    async getExchangRate(){
        let d = new Date(Date.now());
        d.setHours(0,0,0,0);
        let currency = this.state.Ccode;
        axios.get(apiLinks.EXCHANGERATES + '/sale',{
            params: {d, currency}})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        if (this.state.saleType == "Interline") {

            console.log(currency)
            try {
                const response = await axios.get(apiLinks.EXCHANGERATES + '/sale', {params: {d, currency}})
                //.wait(3000)
                // .then(function (response) {
                console.log(response)
                //})
            }
            catch(err) {
                        console.log(err)
                    }
                //const rate = response.data;
                //  this.setState({USDExchangeRate : rate.USDExchangeRate});

 */


    handleSubmit(event) {


        event.preventDefault();
        console.log('hello');
        this.setState({adCode: GetUSer.advisorCode});
        //this.setState({commissionRate: GetUSer.commissionRate});
        let d = new Date(Date.now());
        d.setHours(0, 0, 0, 0);
        /*
                if (this.state.saleType == "Interline") {
                   let currency = this.state.Ccode;
                    axios.get(apiLinks.EXCHANGERATES + '/sale', {params: {d, currency}})
                        .then(function (response){console.log(response)})
                        .catch(function (err) {
                            console.log(err)
                        })
                            //const rate = response.data;
                          //  this.setState({USDExchangeRate : rate.USDExchangeRate});

                        }

         */

        const newSale = {
            ticketNumber: this.state.tickNum,
            saleType: this.state.saleType,
            fare: this.state.fare,
            currency: this.state.Ccode,
            localTax: this.state.Tlocal,
            otherTax: this.state.Tother,
            paymentMethod: this.state.method,
            creditCardNum: this.state.creditNum,
            expDate: this.state.expDate,
            securityCode: this.state.secCode,
            commissionRate: this.state.rate,
            custName: this.state.custName,
            advisorCode: this.state.adCode,
            saleDate: d,
            notes: this.state.notes,
            USDExchangeRate: this.state.USDExchangeRate

        };

        axios.post(apiLinks.SALES, newSale).then(response => {
            // console.log(response);
        });


    }

    render() {

        return (
            /*
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
                            this.setState({Tother: e.target.value});
                        }}
                    />

                    <FormLabel>Customer Name</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.custName}
                        onChange={e => {
                            this.setState({
                                custName: e.target.value
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

                            //this.handleSubmit(e)
                            //this.getExchangRate()
                            this.getExchangRate()
                        }}
                        //                        onClick={this.getExchangRate}
                        onClick={this.handleClick}
                        block
                    >
                        Sell Ticket
                    </Button>

                </Form>
            </Container>
        */
            <div className='button_container'>
                <button className='button' onClick={this.handleClick}>
                    Click Me
                </button>
            </div>
        );
    }
}



