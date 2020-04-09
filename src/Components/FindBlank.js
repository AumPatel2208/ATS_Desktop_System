import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Container} from "reactstrap";
import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';

let apiLinks = require('../api/config.json');

class FindBlank extends Component {

    state = {
        batchValues: '',
        myID: "",
        find: "",
        blanksf: [],
        blanksu: [],
        blanksa: [],
        result: "",
        findCode: ""
    };


    componentDidMount() {
        this.setState({find: ""});

        axios.get(apiLinks.BLANKS).then(res => {
            const blanks = res.data;
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
        if (this.state.blanksf[0].remaining == undefined) {
            alert("This value does not exist in the system");
            return;
        } else {
            for (var i = 0; i < this.state.blanksf[0].remaining.length; i++) {
                if ((parseInt(this.state.blanksf[0].remaining[i].start) <= x) && (parseInt(this.state.blanksf[0].remaining[i].end) >= x)) {
                    break;
                }
            }
            if ( this.state.blanksf !== undefined && i !== this.state.blanksf[0].remaining.length) {
                alert(this.state.find + " is available and unassigned in batch " + this.state.blanksf[0].remaining[0].start + "-" + this.state.blanksf[0].remaining[0].end);
                return;

            } else {
                if (this.state.blanksa[0] == undefined) {
                    alert("This value does not exist in the system");
                    return;
                }
                for (var l = 0; l < this.state.blanksa[0].remaining.length; l++) {
                    if (this.state.blanksa[0].remaining[l] === x) {
                        break;
                    }
                }
                if (l === this.state.blanksa[0].remaining.length) {
                    if (this.state.blanksu[0] == undefined) {
                        alert("This value does not exist in the system");
                        return;
                    }
                    alert(this.state.find + " has been used by advisor " + this.state.blanksu[0].advisorCode + " and sold to " + this.state.blanksu[0].custName)

                } else {
                    alert(this.state.find + " has been assigned to advisor " + this.state.blanksa[0].advisorCode)
                }
            }

        }

    }


    render() {
        return (
            <Container>

                <h3>Find Blank</h3>
                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Blank Number</FormLabel>
                    <FormControl
                        autoFocus
                        type="batchValues"
                        value={this.state.find}
                        onChange={e =>
                            this.setState({find: e.target.value})
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
        ) }}

export default withRouter(FindBlank);