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
    constructor(props) {
        super(props);

        this.state = {
            batchValues: '',
            date: new Date(),
            code: '',
            oG: '',
            i: 1,
            blanks: [],
            blanksD: [],
            num: ''
        };
    }



    //runs when component mounts, use to gets the data from db

    componentDidMount() {
        var cd;
        {
            this.props.staff !== undefined
                ? (cd = `${this.props.staff.advisorCode}`)
                : (cd = 'undefined');
        }


        axios
            .get(apiLinks.ASSIGN)
            .then(res => {
                const blanks = res.data;
                this.setState({ blanks });

                //filtering so only assigned to the current advisor
                const cl = this.state.blanks.filter(
                    i => i.advisorCode == cd
                );
                this.setState({ blanks: cl });
                this.setState({ blanksD: cl });

                const l = this.state.blanks.filter( i => i.batchType === "Interline");
                this.setState({ blanks: l });

                const c = this.state.blanks.filter(
                    i => i.batchType === "Domestic"
                );
                this.setState({ blanksD: c });


            })
            .catch(err => console.log('Error code: ', err));





    }
    onOpenClick(_id, i) {
        console.log(_id);
        this.props.history.push('./blanks/' + _id + '-' + i);
    }

    render() {
        return (
            <Container>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Available Interline Blanks</th>
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


                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>Available Domestic Blanks</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.blanksD.map(({ _id, remaining }) => {
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
