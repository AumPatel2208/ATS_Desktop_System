import React, { Component, Fragment, } from 'react';
import { Container, Table, Button } from 'reactstrap';
import axios from 'axios';
import {
    Form,
    FormGroup,
    Dropdown, FormControl
} from 'react-bootstrap';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');


export default class ReportTurnoverT extends Component{
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        blanks: [],
    };
//TODO: handle discounts in the customer section
    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        axios.get(apiLinks.BLANKS).then(res => {
            const blanks = res.data;
            this.setState({ blanks });
        });
    }

    onOpenClick(e, _id) {
        console.log(e, _id);
    }
    render() {
        //filter then add up for each?
        const row = (
            _id,
            blankNumber,
            advisorCode,
            assigned,
            used,
            batch
        ) => (
            <Fragment>
                <tr key={_id}>
                    <td>{blankNumber}</td>
                    <td>{advisorCode}</td>
                    <td>{assigned}</td>
                    <td>{used}</td>
                    <td>{batch}</td>
                    <td>
                        <Button
                            className="open-btn"
                            color="primary"
                            size="sm"
                            onClick={this.onOpenClick.bind(this, _id)}
                        >
                            open
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
                        <th>Blank Number</th>
                        <th>Advisor Code</th>
                        <th>Assigned</th>
                        <th>Used</th>
                        <th>Batch Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.blanks.map(
                        ({
                             _id,
                            blankNumber,
                            advisorCode,
                            assigned,
                            used,
                            batch
                         }) => (
                            <Fragment key={_id}>
                                {row(
                                    _id,
                                    blankNumber,
                                    advisorCode,
                                    assigned,
                                    used,
                                    batch
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



