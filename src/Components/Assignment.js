import React, { Component, Fragment } from 'react';
import { Container, Table } from 'reactstrap';
import {
    Button,
    Dropdown,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { withRouter } from 'react-router';

let apiLinks = require('../api/config.json');

// Component to assign blanks
class Assignment extends Component {
    state = {
        batchValues: '',
        date: new Date(),
        code: '',
        oG: '',
        i: 0,
        blanks: [],
        blank: [
            {
                _id: '',
                batchValues: '',
                batchStart: '',
                batchEnd: '',
                date: '',
                batchType: '',
                amount: '800',
                remaining: [],
            },
        ],
        myId: '',
        myIndex: '',
        assignedBatch: '',
    };

    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        let empty = [];
        this.setState({ blanks: empty });

        const {
            match: { params },
        } = this.props;
        const id = params.id.split('-');
        const id1 = id[0];

        this.setState({ myId: id1 });
        this.setState({ myIndex: id[1] });

        axios
            .get(apiLinks.BLANKS)
            .then((res) => {
                const blanks = res.data;
                this.setState({ blanks });
                const bl = this.state.blanks.filter(
                    (i) => String(i._id) === id1
                );
                this.setState({ blanks: bl });
            })
            .catch((err) => console.log('Error code: ', err));
    }

    onOpenClick(_id, i) {
        this.props.history.push('/blanks/' + _id + '-' + i);
        console.log(_id);
    }
    onDeleteClick(_id) {
        console.log(_id);
    }

    assignBlanks(e) {
        // putting new assignment into assigned database

        let d = new Date(Date.now());
        d.setHours(0, 0, 0, 0);

        const newAssignment = {
            date: d,
            batchValues: this.state.assignedBatch,
            advisorCode: this.state.code,
            batchId: this.state.myId,
        };

        e.preventDefault();
        console.log('hello');

        axios
            .post(apiLinks.ASSIGN, newAssignment)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => console.log('Error code: ', err));

        this.updateRemaining();

        alert(
            'Assigned: ' + this.state.assignedBatch + ' to ' + this.state.code
        );
    }

    updateRemaining() {
        //updating batch in blank to remove the ones that have been assigned

        let x = this.state.blanks[0].remaining;
        let y = this.state.myIndex;

        let zzz = this.state.assignedBatch.split('-');

        let z = parseInt(zzz[0]);
        let z2 = parseInt(zzz[1]);
        console.log(x[y].start);

        let st = parseInt(x[y].start);
        let en = parseInt(x[y].end);

        if (z < st || z > en || z2 > en || z2 < st) return;

        if (z !== st) {
            if (z - 1 === st) {
                x.push({ start: st, end: st });
            } else {
                x.push({ start: st, end: z - 1 });
            }
        }
        if (z2 !== en) {
            if (z2 + 1 === en) {
                x.push({ start: en, end: en });
            } else {
                x.push({ start: z2 + 1, end: en });
            }
        }

        x.splice(y, 1);

        const updatedBlank = {
            _id: this.state.blanks._id,
            batchValues: this.state.blanks.batchValues,
            batchStart: this.state.blanks.batchStart,
            batchEnd: this.state.blanks.batchEnd,
            date: this.state.blanks.date,
            batchType: this.state.blanks.batchType,
            amount: this.state.blanks.amount,
            remaining: x,
        };

        axios
            .put(apiLinks.BLANKS + '/' + this.state.myId, updatedBlank)
            .catch((err) => console.log('Error code: ', err));
    }

    render() {
        return (
            <Container>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Batch Values</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.blanks.map(({ _id, remaining }) => {
                            if (_id == this.state.myId) {
                                return (
                                    <tr key={_id}>
                                        {remaining.map((sub, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td> {sub.start}</td>
                                                    <td>{sub.end}</td>
                                                    <td>
                                                        {/*<Assignment id={_id} index={i}></Assignment> */}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </Table>

                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Batch Values</FormLabel>
                    <FormControl
                        autoFocus
                        type="batchValues"
                        value={this.state.assignedBatch}
                        onChange={(e) =>
                            this.setState({ assignedBatch: e.target.value })
                        }
                    />
                </FormGroup>
                <FormGroup controlId="date" bssize="large">
                    <FormLabel>Advisor Code</FormLabel>
                    <FormControl
                        selected={this.state.code}
                        onChange={(e) =>
                            this.setState({ code: e.target.value })
                        }
                    />
                </FormGroup>
                <Button
                    onClick={(e) => {
                        console.log('hit');
                        let x = String(this.state.assignedBatch).split('-')[0];
                        let y = String(this.state.assignedBatch).split('-')[1];

                        //making sure values are within bounds of the batch they're being assigned from
                        var i;
                        for (
                            i = 0;
                            i < this.state.blanks[0].remaining.length;
                            i++
                        ) {
                            if (
                                this.state.blanks[0].remaining[i].start <= x &&
                                this.state.blanks[0].remaining[i].end >= y
                            ) {
                                break;
                            }
                        }
                        if (i === this.state.blanks[0].remaining.length) {
                            alert(
                                this.state.assignedBatch +
                                    'is not part of this batch and cannot be assigned' +
                                    this.state.assignedBatch[0]._id
                            );

                            return;
                        } else {
                            this.assignBlanks(e);
                            this.updateRemaining();
                            this.props.history.push('./blanks');
                        }

                        this.setState({ blanks: [] });
                    }}
                >
                    Assign Blanks
                </Button>
            </Container>
        );
    }
}
export default withRouter(Assignment);
