import {Button, Container, Table} from "reactstrap";
import React, {Component, Fragment} from "react";
import {Dropdown, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";

let apiLinks = require('../api/config.json');


export default class RatesForm extends Component{
    state = {
        rates: [],
        date: new Date(),
        eRate: "",
        code: ""
    };


    handleSubmit(event) {
        const newRate = {
            currencyCode: this.state.code,
            date: Date.now(),
            toUSDRate: this.state.eRate
        };

        event.preventDefault();
        console.log('hello');

        axios.post(apiLinks.EXCHANGERATES, newRate ).then(response => {
            console.log(response);
        });

    }

    render() {

        const row = (
            currencyCode,
            date,
            toUSDRate

        ) => (
            <Fragment>
                <tr>
                    <td>{currencyCode}</td>
                    <td>{date}</td>
                    <td>{toUSDRate}</td>
                    <td>
                        <Button
                            className="open-btn"
                            color="primary"
                            size="sm"
                            onClick={this.onOpenClick.bind(this)}
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

                    <FormLabel>Enter Rate</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.eRate}
                        onChange={e => {
                            this.setState({
                                eRate: e.target.value
                            });
                        }}
                    />
                    <FormLabel>Enter Currency</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.code}
                        onChange={e => {
                            this.setState({
                                code: e.target.value
                            });
                        }}
                    />
                    <Button
                        bssize="medium"
                        variant="outline-danger"
                        onClick={e => {
                            this.handleSubmit(e)
                        }}
                        block
                    >
                        Save Rate
                    </Button>



                    <br></br>


                        <FormLabel>Search For Rates By Date  </FormLabel>
                        <DatePicker
                            selected = {this.state.date}
                            onChange={ e=>
                                this.setState({date: e.target.value})
                            }

                        />
                        <Button
                            bssize="medium"
                            variant="outline-danger"
                            onClick={() => {
                                let start = this.state.date;

                                axios.get(apiLinks.BLANKS + '/byDate', {params: {start}}).then(res => {
                                    const rates = res.data;
                                    this.setState({rates});
                                });

                            }}
                            block
                        >
                            Search
                        </Button>


                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Date</th>
                        <th>To USD Rate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rates.map(
                        ({
                             currencyCode,
                            date,
                            toUSDRate
                         }) => (
                            <Fragment >
                                {row(
                                    currencyCode,
                                    date,
                                    toUSDRate
                                )}
                            </Fragment>
                        )
                    )}
                    </tbody>
                </Table>
                </Form>
            </Container>
        );
    }
}

