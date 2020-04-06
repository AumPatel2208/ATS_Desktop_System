import { Container, Table } from 'reactstrap';
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
import React, { Component } from 'react';
import axios from 'axios';

let apiLinks = require('../api/config.json');

export class ReAssignBlanks extends Component {
    state = {
        batchValues: '',
        date: new Date(),
        code: '',
        oG: '',
        i: 0,
        blanks: [],
        myId: '',
        myIndex: '',
        assignedBatch: ''
    };

    //runs when component mounts, use to gets the data from db

    componentDidMount() {
        let empty = [];
        this.setState({blanks: empty});

        axios.get(apiLinks.ASSIGN).then(res => {
            const blanks = res.data;
            this.setState({blanks});
        });

        this.filterStuff();
    }

    onOpenClick(_id) {
        console.log(_id);
    }

    onDeleteClick(_id) {
        console.log(_id);
    }

    filterStuff() {
        const {
            match: {params}
        } = this.props;
        const id = params.id.split('-');
        const id1 = id[0];

        this.setState({myId: id1});

        const bl = this.state.blanks.filter(i => String(i._id) === id1);
        console.log(bl);
        //this.setState({
        //    blanks: bla
        // })
    }

    updateRemaining() {
        //ADDS IN A NEW ASSIGNMENT UNDER NEW ADVISOR
        let d = new Date(Date.now());
        d.setHours(0, 0, 0, 0);

        const newAssignment = {
            date: d,
            batchValues: this.state.assignedBatch,
            advisorCode: this.state.code,
            batchId: this.state.myId
        };

        console.log('hello');

        axios.post(apiLinks.ASSIGN, newAssignment).then(response => {
            console.log(response);

            this.updateRemaining();
        });

        //UPDATING ASSIGNMENT - REMOVING FROM ASSIGNED LIST
        let z = this.state.blanks[0].remaining;

        let y = z.findIndex(k => k === this.state.assignedBatch);

        z.splice(y);

        const updatedBlank = {
            _id: this.state.blanks._id,
            batchValues: this.state.blanks.batchValues,
            batchStart: this.state.blanks.batchStart,
            batchEnd: this.state.blanks.batchEnd,
            date: this.state.blanks.date,
            batchType: this.state.blanks.batchType,
            advisorCode: this.state.code,
            amount: this.state.blanks.amount,
            batchId: this.state.myId,
            remaining: z
        };

        axios.put(apiLinks.ASSIGN + '/' + this.state.myId, updatedBlank);
    }

    render() {
        return (
            <Container>
                <h2>Re-Assign Blank </h2>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>{this.state.blanks[0]._id}</th>
                        <th>Batch End</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.blanks.map(({_id, remaining, batchValues, advisorCode}) => {
                            return (

                                <tr key={_id}>
                                    <td>{batchValues}</td>
                                    <td>{remaining + ", "}</td>
                                    <td>{advisorCode}</td>
                                </tr>

                            );

                    })}
                    </tbody>
                </Table>

                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Batch Values </FormLabel>
                    <FormControl
                        autoFocus
                        type="batchValues"
                        value={this.state.assignedBatch}
                        onChange={e =>
                            this.setState({assignedBatch: e.target.value})
                        }
                    />
                </FormGroup>
                <FormGroup controlId="date" bssize="large">
                    <FormLabel>Advisor Code</FormLabel>
                    <FormControl
                        selected={this.state.code}
                        onChange={e => this.setState({code: e.target.value})}
                    />
                </FormGroup>
                <Button
                    onClick={e => {
                        console.log('hit');
                        this.updateRemaining();
                    }}
                >
                    Re-Assign Blanks
                </Button>
            </Container>
        );
    }

}
