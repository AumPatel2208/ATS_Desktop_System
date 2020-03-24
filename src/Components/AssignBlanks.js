import {Container} from "reactstrap";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker";
import React, {Component, Fragment} from "react";
import axios from "axios";

let apiLinks = require('../api/config.json');

export default class AssignBlanks extends Component{
    state = {
        startDate: new Date(),
        endDate: new Date(),
        batchValues: "",
        date: new Date()


    };
    //runs when component mounts, use to gets the data from db

    componentDidMount() {
        let start = this.state.startDate;
        let end = this.state.endDate;

        axios.get( apiLinks.BLANKS +'/byDate',{params:{start, end}}).then(res => {
            const blanks = res.data;
            this.setState({blanks});
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('hello');

        axios.post(apiLinks.BLANKS, { batchValues: this.state.batchValues, date: this.state.date}).then(response => {
            console.log(response);
        });

    }

    render() {
        return (
            <Container>
                <h3>Assign Blanks</h3>
                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Batch</FormLabel>
                    <FormControl
                        autoFocus
                        type="batchValues"
                        value={this.state.batchValues}
                        onChange={e => this.setState({batchValues: e.target.value, date: Date.now()})}
                    />
                </FormGroup>
                <FormGroup controlId="date" bssize="large">
                    <FormLabel>Advisor Code</FormLabel>
                    <FormControl
                        selected = {this.state.advisorCode}
                        onChange={ e=>
                            this.setState({advisorCode: e.target.value})
                        }

                    />
                </FormGroup>
                <Button
                    onClick={e => {
                        this.handleSubmit(e)
                    }}
                >
                    Add Blanks
                </Button>
                <br></br>
                <br/>


                <h3>Re-assign Blanks</h3>
                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Batch</FormLabel>
                    <FormControl
                        autoFocus
                        type="batchValues"
                        value={this.state.batchValues}
                        onChange={e => this.setState({batchValues: e.target.value, date: Date.now()})}
                    />
                </FormGroup>
                <FormGroup controlId="date" bssize="large">
                    <FormLabel>Initial Advisor's Code</FormLabel>
                    <FormControl
                        selected = {this.state.advisorCode}
                        onChange={ e=>
                            this.setState({advisorCode: e.target.value})
                        }

                    />
                </FormGroup>
                <FormGroup controlId="date" bssize="large">
                    <FormLabel>New Advisor's Code</FormLabel>
                    <FormControl
                        selected = {this.state.advisorCode}
                        onChange={ e=>
                            this.setState({advisorCode: e.target.value})
                        }

                    />
                </FormGroup>
                <Button
                    onClick={e => {
                        this.handleSubmit(e)
                    }}
                >
                    Add Blanks
                </Button>
            </Container>

        )
    }}