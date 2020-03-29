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
        staff: [],
        code: '',
        rate: ''
    };

    componentDidMount() {
        const st = this.state.staff.advisorCode;
        axios
            .get(apiLinks.STAFFMEMBERS + '/commission', { params: { st } })
            .then(res => {
                const staff = res.data;
                this.setState({ staff });
            });
    }

    // componentDidMount() {
    //     axios.get(apiLinks.STAFFMEMBERS).then(res => {
    //         const staff = res.data;
    //         this.setState({staff});
    //         console.log(staff)
    //     });

    // }

    updateCommission(e) {
        e.preventDefault();
        const st = this.state.staff.advisorCode;

        const bl = this.state.staff.filter(i => String(i.advisorCode) === st);
        console.log(bl);

        const updatedStaff = {
            username: this.state.staff.username,
            firstName: this.state.staff.firstName,
            lastName: this.state.staff.lastName,
            address: this.state.staff.address,
            //password: bcrypt.hashSync(staff.password, salt),
            staffType: this.state.staff.staffType,
            advisorCode: this.state.staff.advisorCode,
            commissionRate: this.state.staff.commissionRate
        };

        axios
            .put(
                apiLinks.STAFFMEMBERS + '/' + this.state.staff._id,
                updatedStaff
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

                    <FormGroup controlId="advisorCode" bssize="large">
                        <FormLabel>Enter Advisor Code</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.code}
                            onChange={e =>
                                this.setState({
                                    code: e.target.value
                                })
                            }
                        />
                    </FormGroup>

                    <FormGroup controlId="commissionRate" bssize="large">
                        <FormLabel>Enter New Commission Rate</FormLabel>
                        <FormControl
                            autoFocus
                            type="String"
                            value={this.state.rate}
                            onChange={e =>
                                this.setState({
                                    rate: e.target.value
                                })
                            }
                        />
                    </FormGroup>
                    <Button
                        block
                        bssize="large"
                        type="submit"
                        onClick={e => {
                            console.log('hit');
                            this.updateCommission(e);
                        }}
                    >
                        Update Rate
                    </Button>
                </form>
            </Container>
        );
    }
}
