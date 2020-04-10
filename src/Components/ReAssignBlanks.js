import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Table,
    Container,
} from 'react-bootstrap';
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

        axios.get(apiLinks.ASSIGN).then((res) => {
            const blanks = res.data;
            this.setState({ blanks });

            const t = this.state.blanks.filter(
                (i) => i.remaining[0] !== undefined
            );
            this.setState({ blanks: t });

            const bl = this.state.blanks.filter((i) => String(i._id) === id1);
            this.setState({ blanks: bl });
        });

        // this.filterStuff();
    }

    onOpenClick(_id) {
        console.log(_id);
    }

    onDeleteClick(_id) {
        console.log(_id);
    }
    /*
    filterStuff() {
        const {
            match: {params}
        } = this.props;
        const id = params.id.split('-');
        const id1 = id[0];

        this.setState({myId: id1});

        const bl = this.state.blanks.filter(i => String(i._id) === id1);
        console.log(bl);

        const t = this.state.blanks.filter(
            i => i.remaining[0] !== " "
        );

        this.setState({blanks:t});
        console.log(t);
        //this.setState({
        //    blanks: bla
        // })
    }

 */

    updateRemaining() {
        //ADDS IN A NEW ASSIGNMENT UNDER NEW ADVISOR
        let k = this.state.assignedBatch.split(',');

        let d = new Date(Date.now());
        d.setHours(0, 0, 0, 0);

        const newAssignment = {
            date: d,
            batchValues: k[0] + '-' + k[k.length - 1],
            advisorCode: this.state.code,
            batchId: this.state.myId,
        };

        console.log('hello');

        axios.post(apiLinks.ASSIGN, newAssignment).then((response) => {
            console.log(response);

            this.updateRemaining();
        });

        //UPDATING ASSIGNMENT - REMOVING FROM ASSIGNED LIST

        let z = this.state.blanks[0].remaining;

        for (var i2 = 0; i2 < k.length; i2++) {
            var i = 0;
            let t = k[i2];
            while (z[i] != t) {
                i++;
            }
            z.splice(i, 1);

            /*
            for (var i = 0; i < z.length; i++) {
                if (z[i] == k[i2]) {
                    z.splice(i, 1);
                    i2++;
                    break;
                }
            }

             */
        }

        const updatedBlank = {
            batchValues: this.state.blanks.batchValues,
            batchStart: this.state.blanks.batchStart,
            batchEnd: this.state.blanks.batchEnd,
            date: this.state.blanks.date,
            batchType: this.state.blanks.batchType,
            advisorCode: this.state.blanks.advisorCode,
            amount: this.state.blanks.amount,
            batchId: this.state.myId,
            remaining: z,
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
                            <th>Selected Batch Values</th>
                            <th>Remaining in Batch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.blanks.map(
                            ({ _id, remaining, batchValues, advisorCode }) => {
                                return (
                                    <tr key={_id}>
                                        <td>{batchValues}</td>
                                        <td>{remaining + ', '}</td>
                                        <td>{advisorCode}</td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </Table>

                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Batch Values </FormLabel>
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
                        this.updateRemaining();
                    }}
                >
                    Re-Assign Blanks
                </Button>
            </Container>
        );
    }
}
