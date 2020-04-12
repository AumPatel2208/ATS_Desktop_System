import { Container } from 'reactstrap';
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

let apiLinks = require('../api/config.json');

// Component to Add Blanks into the database
class AddBlanks extends Component {
    state = {
        batchValues: '',
        enteredDate: new Date(),
        blanks: [],
        myID: '',
        toDelete: '',
        find: '',
        blanksf: [],
        blanksu: [],
        blanksa: [],
        result: '',
        findCode: '',
    };

    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        this.setState({ find: '' });
        //getting blanks and setting to database values
        axios
            .get(apiLinks.BLANKS)
            .then((res) => {
                const blanks = res.data;
                this.setState({ blanks });
                this.setState({ blanksf: blanks });
            })
            .catch((err) => console.log(err));

        axios
            .get(apiLinks.ASSIGN)
            .then((res) => {
                const blanksa = res.data;
                this.setState({ blanksa });
            })
            .catch((err) => console.log(err));

        axios
            .get(apiLinks.USED)
            .then((res) => {
                const blanksu = res.data;
                this.setState({ blanksu });
            })
            .catch((err) => console.log(err));
    }

    // handling deletion of data from database
    async handleDelete(e) {
        let zzz = this.state.toDelete.split('-');
        let z, z2;
        //filtering blanks to delete based on requested values
        if (zzz !== undefined) {
            z = parseInt(zzz[0]);
            z2 = parseInt(zzz[1]);

            const bl = this.state.blanks.filter((i) => i.batchStart <= z);
            this.setState({ blanks: bl });

            const l = this.state.blanks.filter((i) => i.batchEnd >= z2);
            this.setState({ blanks: l });
        } else {
            z = parseInt(this.state.toDelete);
            z2 = parseInt(this.state.toDelete);
        }

        let myID = this.state.blanks[0]._id;

        let x = this.state.blanks[0].remaining;
        for (var i = 0; i < this.state.blanks[0].remaining.length; i++) {
            if (
                this.state.blanks[0].remaining[i].start <= z &&
                this.state.blanks[0].remaining[i].end >= z2
            ) {
                break;
            }
        }

        if (x[i] === undefined) {
            alert(
                'This value does not exist in available blanks and cannot be deleted'
            );
            return;
        }

        let st = parseInt(x[i].start);
        let en = parseInt(x[i].end);

        //updating the remaining blanks based on start/end values of deleted portion
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

        x.splice(i, 1);

        //putting updated values back into the database
        const updatedBlank = {
            _id: this.state.blanks[0]._id,
            batchValues: this.state.blanks[0].batchValues,
            batchStart: this.state.blanks[0].batchStart,
            batchEnd: this.state.blanks[0].batchEnd,
            date: this.state.blanks[0].date,
            batchType: this.state.blanks[0].batchType,
            amount: this.state.blanks[0].amount,
            remaining: x,
        };

        axios
            .put(apiLinks.BLANKS + '/' + myID, updatedBlank)
            .catch((err) => alert('Error code: ' + err));

        alert('Deleted: ' + this.state.toDelete);
    }

    async handleSubmit(event) {
        //handling the addition of new blanks into the system

        event.preventDefault();
        console.log('hello');

        let dt = new Date(this.state.enteredDate);
        dt.setHours(0, 0, 0, 0);

        const newblanks = {
            batchValues: this.state.batchValues,
            date: dt,
        };
        await axios
            .post(apiLinks.BLANKS, newblanks)
            .then((response) => {
                console.log(response);
                alert('Added: ' + this.state.batchValues);
            })
            .catch((err) => console.log('Error code: ', err));
        this.props.history.push('./blanks');
    }

    // Renders the Forms
    render() {
        return (
            <Container>
                <h3>
                    <strong>Add New Blanks</strong>
                </h3>
                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Batch</FormLabel>
                    <FormControl
                        autoFocus
                        type="batchValues"
                        value={this.state.batchValues}
                        onChange={(e) =>
                            this.setState({ batchValues: e.target.value })
                        }
                    />
                </FormGroup>
                <FormGroup controlId="date" bssize="large">
                    <FormLabel>Receipt Date:</FormLabel>
                    <DatePicker
                        selected={this.state.enteredDate}
                        onChange={(date) => {
                            this.setState({
                                enteredDate: date,
                            });
                        }}
                    />
                    <br />
                </FormGroup>
                <Button
                    onClick={(e) => {
                        this.handleSubmit(e);
                    }}
                >
                    Add Blanks
                </Button>

                <br />
                <br />
                <br />

                <h3>
                    <strong>Delete Blanks</strong>
                </h3>
                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Batch</FormLabel>
                    <FormControl
                        autoFocus
                        type="batchValues"
                        value={this.state.toDelete}
                        onChange={(e) =>
                            this.setState({ toDelete: e.target.value })
                        }
                    />
                </FormGroup>

                <Button
                    onClick={(e) => {
                        this.handleDelete(e);
                    }}
                >
                    Delete Blanks
                </Button>
                <br />
                <br />
            </Container>
        );
    }
}

export default withRouter(AddBlanks);
