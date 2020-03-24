import {Container} from "reactstrap";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker";
import React, {Component, Fragment} from "react";
import axios from "axios";

let apiLinks = require('../api/config.json');

export default class AddBlanks extends Component{
    state = {
        batchValues: "",
        date: new Date()

    };
    //runs when component mounts, use to gets the data from db

    /*
    componentDidMount() {

        axios.get( apiLinks.BLANKS +'/byDate',{params:{start, end}}).then(res => {
            const blanks = res.data;
            this.setState({blanks});
        });
    }

     */

    handleSubmit(event) {
        event.preventDefault();
        console.log('hello');

        axios.post(apiLinks.BLANKS, ).then(response => {
            console.log(response);
        });

    }

    render() {
        return (


<Container>
    <h3>Add New Blanks</h3>
        <FormGroup controlId="username" bssize="large">
            <FormLabel>Batch</FormLabel>
            <FormControl
                autoFocus
                type="batchValues"
                value={this.state.batchValues}
                onChange={e => this.setState({batchValues: e.target.value})}
            />
        </FormGroup>
        <FormGroup controlId="date" bssize="large">
            <FormLabel>Receipt Date:</FormLabel>
            <DatePicker
                selected = {this.state.date}
                onChange={ e=>
                    this.setState({date: e.target.value})
                }

            />
            <br/>
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