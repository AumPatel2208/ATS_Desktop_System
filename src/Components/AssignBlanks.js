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

class AssignBlanks extends Component {
    state = {
        batchValues: '',
        date: new Date(),
        code: '',
        oG: '',
        i: 0,
        blanks: [],
        aBlanks: []
    };

    //runs when component mounts, use to gets the data from db

    componentDidMount() {
        axios.get(apiLinks.BLANKS).then(res => {
            const blanks = res.data;
            this.setState({ blanks });
        });

        axios.get(apiLinks.ASSIGN).then(res => {
            const aBlanks = res.data;
            this.setState({ aBlanks });
            const t = this.state.aBlanks.filter(
                i => i.remaining[0] !== undefined
            );
            this.setState({ aBlanks: t });
        });
    }
    onOpenClick(_id, i) {
        console.log(_id);
        this.props.history.push('./blanks/' + _id + '-' + i);
    }
    onOpenClick2(_id, i) {
        console.log(_id);
        this.props.history.push('./blankAssigned/' + _id + '-' + i);
    }

    render() {
        /**
         * Will return a Fragment to be used when mapping in the render function.
         * Allows to break down the data into rows and TD.
         * @param {The MongoDB ID of the object in the collection} _id
         */


        return (
            <Container>
                <h2>Assign Blanks</h2>
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
                                                <td>{_id}</td>
                                                <td> {sub.start}</td>
                                                <td>{sub.end}</td>
                                                <td>
                                                    <Button
                                                        className="open-btn"
                                                        color="primary"
                                                        size="lg"
                                                        onClick={this.onOpenClick.bind(
                                                            this,
                                                            _id,
                                                            i
                                                        )}
                                                    >
                                                        Assign from Batch
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
                <h2>Re-Assign Blanks</h2>

                <Table className="mt-4" >
                    <thead>
                        <tr>
                            <th>Batch Values</th>
                            <th>Remaining</th>
                            <th>Assigned Advisor</th>

                        </tr>
                    </thead>
                    <tbody>
                    {this.state.aBlanks.map(({_id, remaining, batchValues, advisorCode}) => {
                        return (
                            <tr key={_id}>

                                <td>{batchValues}</td>
                                <td>{remaining + ", "}</td>
                                <td>{advisorCode}</td>

                                <td>
                                    {/*<Assignment id={_id} index={i}></Assignment> */}
                                    <Button
                                        className="open-btn"
                                        color="primary"
                                        size="lg"
                                        onClick={this.onOpenClick2.bind(
                                            this,
                                            _id,
                                            "re"
                                        )}
                                    >
                                        Re-Assign from batch
                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
export default withRouter(AssignBlanks);
