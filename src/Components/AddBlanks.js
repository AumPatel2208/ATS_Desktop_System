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
        enteredDate: new Date()
    };
    //runs when component mounts, use to gets the data from db

    /*
    componentDidMount() {

        axios.get( apiLinks.BLANKS +'/byDate',{params:{start, end}}).then(res => {
            const blanks = res.data;
            this.setState({blanks});
        });
    }

     */

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
            </Container>
        );
    }
}

export default withRouter(AddBlanks);
