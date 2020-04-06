import {Container, Table} from 'reactstrap';
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
        myID: "",
        toDelete: "",
        find: "",
        blanksf: [],
        blanksu: [],
        blanksa: [],
        result: "",
        findCode:""
    };

    //runs when component mounts, use to gets the data from db


    componentDidMount() {

        axios.get(apiLinks.BLANKS).then(res => {
            const blanks = res.data;
            this.setState({blanks});
            this.setState({blanksf: blanks})

        });

        axios.get(apiLinks.ASSIGN).then(res => {
            const blanksa = res.data;
            this.setState({blanksa});
        });

        axios.get(apiLinks.USED).then(res => {
            const blanksu = res.data;
            this.setState({blanksu});
        });
    }


    async handleDelete(e) {
        let zzz = this.state.toDelete.split('-');
        let z, z2;

        if (zzz !== undefined) {
            z = parseInt(zzz[0]);
            z2 = parseInt(zzz[1]);


            const bl = this.state.blanks.filter(
                i => i.batchStart <= z
            );
            this.setState({blanks: bl});

            const l = this.state.blanks.filter(
                i => i.batchEnd >= z2
            );
            this.setState({blanks: l});
        } else {
            z = parseInt(this.state.toDelete);
            z2 = parseInt(this.state.toDelete)

        }

        let myID = this.state.blanks[0]._id;

        let x = this.state.blanks[0].remaining;
        for (var i = 0; i < this.state.blanks[0].remaining.length; i++) {
            if (this.state.blanks[0].remaining[i].start <= z && this.state.blanks[0].remaining[i].end >= z2) {
                break;
            }
        }

        if (x[i] === undefined) {
            alert("This value does not exist in available blanks and cannot be deleted");
            return;
        }

        let st = parseInt(x[i].start);
        let en = parseInt(x[i].end);

        //  if (z < st || z > en || z2 > en || z2 < st) return;

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

        x.splice(i, 1);

        const updatedBlank = {
            _id: this.state.blanks[0]._id,
            batchValues: this.state.blanks[0].batchValues,
            batchStart: this.state.blanks[0].batchStart,
            batchEnd: this.state.blanks[0].batchEnd,
            date: this.state.blanks[0].date,
            batchType: this.state.blanks[0].batchType,
            amount: this.state.blanks[0].amount,
            remaining: x
        };

        axios
            .put(apiLinks.BLANKS + '/' + myID, updatedBlank)
            .catch(err => alert('Error code: ' + err));
    }

    async handleSearch() {
        let x = parseInt(this.state.find);
        const bl = this.state.blanksf.filter(
            i => i.batchStart <= x && i.batchEnd >= x
        );
        this.setState({blanksf: bl});

        const b = this.state.blanksa.filter(
            i => i.batchStart <= x && i.batchEnd >= x
        );
        this.setState({blanksa: b});

        //if it's not in any of the blank batches, it's not in the system
        if (this.state.blanksf[0].remaining === undefined) {
            alert("This value does not exist in the system");
            return;
        } else {
            for (var i = 0; i < this.state.blanksf[0].remaining.length; i++) {
                if ((parseInt(this.state.blanksf[0].remaining[i].start) <= x) && (parseInt(this.state.blanksf[0].remaining[i].end) >= x)) {
                    break;
                }
            }
            if (i !== this.state.blanks[0].remaining.length && this.state.blanks[0].remaining !== undefined) {
                alert(this.state.find + " is available and unassigned in batch " + this.state.blanksf[0].remaining[0].start +"-"+ this.state.blanksf[0].remaining[0].end);
                return;

            }else {
                if (this.state.blanksa[0] == undefined) {
                    alert("This value does not exist in the system");
                    return;
                }
                for (var l = 0; l < this.state.blanksa[0].remaining.length; l++) {
                    if (this.state.blanksa[0].remaining[l] === x) {
                        break;
                    }
                }
                if (l === this.state.blanks[0].remaining.length) {
                    alert(this.state.find + " has been used by " + this.state.blanksu[0].advisorCode + "and sold to" + this.state.blanksu[0].custName)

                } else {
                    alert(this.state.find + " has been assigned to " + this.state.blanksa[0].advisorCode)
                }
            }

        }

    }

    async handleDisplay(){

        if (this.state.result !== ""){
           return <Fragment>
                <h5>Blank {String(this.state.find)} is {String(this.state.result)} by {String(this.state.findCode)}</h5>
            </Fragment>
        }
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
<br/>
<br/>
                <h3>Find Blank</h3>
                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Blank Number</FormLabel>
                    <FormControl
                        autoFocus
                        type="batchValues"
                        value={this.state.find}
                        onChange={e =>
                            this.setState({ find: e.target.value })
                        }
                    />
                </FormGroup>
                <Button
                    onClick={e => {
                        this.handleSearch();
                    }}
                >
                    Find Blank
                </Button>



            </Container>
        );
    }
}

export default withRouter(AddBlanks);
