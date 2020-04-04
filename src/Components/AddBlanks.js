import { Container } from 'reactstrap';
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

let apiLinks = require('../api/config.json');

class AddBlanks extends Component {
    state = {
        batchValues: '',
        enteredDate: new Date(),
        blanks: [],
        myID :"",
        toDelete: ""
    };
    //runs when component mounts, use to gets the data from db


    componentDidMount() {

        axios.get( apiLinks.BLANKS ).then(res => {
            const blanks = res.data;
            this.setState({blanks});




        });
    }


    async handleDelete(e) {
        let x = this.state.blanks[0].remaining;
        let y = this.state.myIndex;

        let zzz = this.state.toDelete.split('-');

        let z = parseInt(zzz[0]);
        let z2 = parseInt(zzz[1]);
        console.log(x[y].start);

        let st = parseInt(x[y].start);
        let en = parseInt(x[y].end);

        if (z < st || z > en || z2 > en || z2 < st) return;

        if (z !== st) {
            if (z - 1 === st) {
                x.push({start: st, end: st});
            } else {
                x.push({start: st, end: z - 1});
            }
        }
        if (z2 !== en) {
            if (z2 + 1 === en) {
                x.push({start: en, end: en});
            } else {
                x.push({start: z2 + 1, end: en});
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
            remaining: x
        };

        axios
            .put(apiLinks.BLANKS + '/' + this.state.myId, updatedBlank)
            .catch(err => console.log('Error code: ', err));
    }




    async handleSubmit(event) {
        event.preventDefault();
        console.log('hello');

        let dt = new Date(this.state.enteredDate);
        dt.setHours(0, 0, 0, 0);

        const newblanks = {
            batchValues: this.state.batchValues,
            date: dt
        };
        await axios
            .post(apiLinks.BLANKS, newblanks)
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log('Error code: ', err));
        this.props.history.push('./blanks');
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
                        onChange={e =>
                            this.setState({ batchValues: e.target.value })
                        }
                    />
                </FormGroup>
                <FormGroup controlId="date" bssize="large">
                    <FormLabel>Receipt Date:</FormLabel>
                    <DatePicker
                        selected={this.state.enteredDate}
                        onChange={date => {
                            this.setState({
                                enteredDate: date
                            });
                        }}
                    />
                    <br />
                </FormGroup>
                <Button
                    onClick={e => {
                        this.handleSubmit(e);
                    }}
                >
                    Add Blanks
                </Button>

<br/>
<br/>
<br/>

                <h3>Delete Blanks</h3>
                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Batch</FormLabel>
                    <FormControl
                        autoFocus
                        type="batchValues"
                        value={this.state.toDelete}
                        onChange={e =>
                            this.setState({ toDelete: e.target.value })
                        }
                    />
                </FormGroup>

                <Button
                    onClick={e => {
                        this.handleDelete(e);
                    }}
                >
                    Delete Blanks
                </Button>

            </Container>
        );
    }
}

export default withRouter(AddBlanks);
