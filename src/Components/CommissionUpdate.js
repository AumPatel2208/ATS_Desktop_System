import React, { Component, Fragment } from 'react';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import axios from 'axios';
import {
    Button,
    Dropdown,
    FormGroup,
    FormLabel,
    FormControl,
    Container
} from 'react-bootstrap';

let apiLinks = require('../api/config.json');
const _ = require('lodash'); //Library to Change Cases of things

export class CommissionUpdate extends Component {
    state = {
        staff: ""

    };
/*
    componentDidMount() {
        const st = this.state.staff.advisorCode;
            axios.get(apiLinks.STAFFMEMBERS + '/commission', {params:{st}}).then(res => {
                const staff = res.data;
                this.setState({staff});
            });
    }
    */

     updateCommission(e) {
        e.preventDefault();
         const st = this.state.staff.advisorCode;
        axios.put(apiLinks.STAFFMEMBERS + '/commission', {params:{st}},
            this.state.staff.commissionRate
        )
            .then(res => {
                console.log(res);
            });
    }



    render() {
        return (
            <Container>
                <form>
                    {/*
                     //onSubmit={this.updateCommission().bind(this)}>
                     {console.log(this.state.customer)} */}

                    <FormGroup controlId="commissionRate" bssize="large">
                        <FormLabel>Enter Advisor Code</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.staff.advisorCode}
                            onChange={e =>
                                this.setState({
                                    staff: {
                                        ...this.state.staff,
                                        advisorCode: e.target.value
                                    }
                                })
                            }
                        />
                    </FormGroup>


                    <FormGroup controlId="commissionRate" bssize="large">
                    <FormLabel>Enter New Commission Rate</FormLabel>
                    <FormControl
                        autoFocus
                        type="String"
                        value={this.state.staff.commissionRate}
                        onChange={e =>
                            this.setState({
                                staff: {
                                    ...this.state.staff,
                                    commissionRate: e.target.value
                                }
                            })
                        }
                    />
                </FormGroup>
                    <Button
                        block
                        bssize="large"
                        type="submit"
                        onClick={e => {
                            console.log("hit");
                            this.updateCommission(e)
                        }}
                    >
                        Update Rate
                    </Button>

                    <FormLabel>New Rate for {this.state.staff.advisorCode} is {this.state.staff.commissionRate}</FormLabel>


                </form>
            </Container>
        );
    }
}
