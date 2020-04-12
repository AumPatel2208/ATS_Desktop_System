import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { Container } from 'reactstrap';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

let apiLinks = require('../api/config.json');

class FindBlank extends Component {
    state = {
        batchValues: '',
        myID: '',
        find: '',
        blanksf: [],
        blanksu: [],
        blanksa: [],
        result: '',
        findCode: '',
    };

    componentDidMount() {
        this.setState({ find: '' });

        axios.get(apiLinks.BLANKS).then((res) => {
            const blanks = res.data;
            this.setState({ blanksf: blanks });
        });

        axios.get(apiLinks.ASSIGN).then((res) => {
            const blanksa = res.data;
            this.setState({ blanksa });
        });

        axios.get(apiLinks.USED).then((res) => {
            const blanksu = res.data;
            this.setState({ blanksu });
        });
    }

    async handleSearch() {
        //x is the value being looked for
        let x = parseInt(this.state.find);
        let i2;
        let i3;

        //searching the unassigned blanks to find if the value has ever been added
        for (i = 0; i < this.state.blanksf.length; i++) {
            if (
                this.state.blanksf[i].batchStart <= x &&
                this.state.blanksf[i].batchEnd >= x
            ) {
                i3 = i;
                break;
            }
        }

        //checking in assigned blanks
        for (i = 0; i < this.state.blanksa.length; i++) {
            if (
                this.state.blanksa[i].batchStart <= x &&
                this.state.blanksa[i].batchEnd >= x
            ) {
                i2 = i;
                break;
            }
        }

        //if it's not in any of the blank batches, it's not in the system
        if (this.state.blanksf[i3] == undefined) {
            alert('This value does not exist in the system');
            return;
        } else {
            for (var i = 0; i < this.state.blanksf[i3].remaining.length; i++) {
                if (
                    parseInt(this.state.blanksf[i3].remaining[i].start) <= x &&
                    parseInt(this.state.blanksf[i3].remaining[i].end) >= x
                ) {
                    break;
                }
            }
            if (
                this.state.blanksf !== undefined &&
                i !== this.state.blanksf[i3].remaining.length
            ) {
                alert(
                    this.state.find +
                        ' is available and unassigned in batch ' +
                        this.state.blanksf[i3].remaining[0].start +
                        '-' +
                        this.state.blanksf[i3].remaining[0].end
                );
                return;
            } else {
                for (
                    var l = 0;
                    l < this.state.blanksa[i2].remaining.length;
                    l++
                ) {
                    if (this.state.blanksa[i2].remaining[l] === x) {
                        break;
                    }
                }
                //if it exists, but isn't in remaining in assigned or available, it's used
                if (l === this.state.blanksa[i2].remaining.length) {
                    let i4 = 0;
                    for (i = 0; i < this.state.blanksu.length; i++) {
                        if (this.state.blanksu[i].batchValues == x) {
                            i4 = i;
                            break;
                        }
                    }
                    alert(
                        this.state.find +
                        ' has been used by advisor ' +
                        this.state.blanksu[i4].advisorCode +
                        ' and sold to ' +
                        this.state.blanksu[i4].custName
                    );
                } else {
                    alert(
                        this.state.find +
                        ' has been assigned to advisor ' +
                        this.state.blanksa[i2].advisorCode
                    );
                }
            }
        }
    }

    render() {
        return (
            <Container>
                <h3>
                    <strong>Find Blank</strong>
                </h3>
                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Blank Number</FormLabel>
                    <FormControl
                        autoFocus
                        type="batchValues"
                        value={this.state.find}
                        onChange={(e) =>
                            this.setState({ find: e.target.value })
                        }
                    />
                </FormGroup>
                <Button
                    onClick={(e) => {
                        this.handleSearch();
                    }}
                >
                    Find Blank
                </Button>
            </Container>
        );
    }
}

export default withRouter(FindBlank);
