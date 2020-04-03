import { Container, Table } from 'reactstrap';
import {
    Button,
    Dropdown,
    Form,
    FormControl,
    FormGroup,
    FormLabel
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Assignment } from './Assignment';
import { withRouter } from 'react-router';

let apiLinks = require('../api/config.json');

class AdvisorBlanks extends Component {
    state = {
        batchValues: '',
        date: new Date(),
        code: '',
        oG: '',
        i: 0,
        blanks: [],
        num: ''
    };

    //runs when component mounts, use to gets the data from db

    componentDidMount() {
        axios
            .get(apiLinks.ASSIGN)
            .then(res => {
                const blanks = res.data;
                this.setState({ blanks });
            })
            .catch(err => console.log('Error code: ', err));
    }
    onOpenClick(_id, i) {
        console.log(_id);
        this.props.history.push('./blanks/' + _id + '-' + i);
    }

    render() {
        /**
         * Will return a Fragment to be used when mapping in the render function.
         * Allows to break down the data into rows and TD.
         * @param {The MongoDB ID of the object in the collection} _id
         */
        const row = (_id, start, end, i) => (
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
                            onClick={this.onOpenClick.bind(this, _id, i)}
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
                        {this.state.blanks.map(({ _id, remaining }) => {
                            return (
                                <tr key={_id}>
                                    {remaining.map((sub, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i}</td>
                                                <td> {sub}</td>
                                                <td>{}</td>
                                                <td>
                                                    {/*<Assignment id={_id} index={i}></Assignment> */}
                                                    <Button
                                                        className="open-btn"
                                                        color="primary"
                                                        size="lg"
                                                        onClick={() => {
                                                            this.props.history.push(
                                                                './sales/' +
                                                                    _id +
                                                                    '-' +
                                                                    sub
                                                            );
                                                        }}
                                                    >
                                                        Sell Blank
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
export default withRouter(AdvisorBlanks);
