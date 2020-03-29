import {Container, Table} from "reactstrap";
import {Button, Dropdown, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker";
import React, {Component, Fragment} from "react";
import axios from "axios";
import {Assignment} from "./Assignment";

let apiLinks = require('../api/config.json');

export default class AdvisorBlanks extends Component{
    state = {
        batchValues: "",
        date: new Date(),
        code: "",
        oG: "",
        i: 0,
        blanks :[],
        num:""

    };

    //runs when component mounts, use to gets the data from db

    componentDidMount() {

        axios.get( apiLinks.ASSIGN ).then(res => {
            const blanks = res.data;
            this.setState({blanks});
        });
    }
    onOpenClick(_id) {
        console.log(_id);
    }

    render() {
        /**
         * Will return a Fragment to be used when mapping in the render function.
         * Allows to break down the data into rows and TD.
         * @param {The MongoDB ID of the object in the collection} _id
         */
        const row = (
            _id,
            start,
            end,
            i
        ) => (
            <Fragment>
                <tr key={_id}>
                    <td>{start}</td>
                    <td>{end}</td>
                    <td>{i}</td>
                    <td>
                        {/* <Assignment id={_id} index={i}></Assignment> */}
                        <Button
                            className="open-btn"
                            color="primary"
                            size="lg"
                            onClick={this.onOpenClick.bind(this, _id)}
                            href={'./blanks/' + _id +"-"+ i}
                        >
                            Sell Blank
                        </Button>
                    </td>
                </tr>
            </Fragment>
        );

        return (
            <Container>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>Batch Start</th>
                        <th>Batch End</th>

                    </tr>
                    </thead>
                    <tbody>

                    {this.state.blanks.map(
                        ({num, remaining}) => {
                            return (
                                <tr key={num}>
                                    {
                                        remaining.map((sub, i) => {
                                                return(
                                                    <tr key = {i}>
                                                        <td>{num =sub.start +'-'+sub.end}</td>
                                                        <td> {}</td>
                                                        <td>{}</td>
                                                        <td>
                                                            { /*<Assignment id={_id} index={i}></Assignment> */}
                                                            <Button
                                                                className="open-btn"
                                                                color="primary"
                                                                size="lg"
                                                                onClick={this.onOpenClick.bind(this, num)}
                                                                href={'./sales/' + num }
                                                            >
                                                                Sell Blank
                                                            </Button>
                                                        </td>
                                                    </tr>

                                                )})}
                                </tr>
                            )})}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

