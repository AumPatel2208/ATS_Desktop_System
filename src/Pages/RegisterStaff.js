import React, { useState, useEffect } from 'react';
import {
    Button,
    FormGroup,
    FormControl,
    FormLabel,
    Dropdown
} from 'react-bootstrap';
import '../Styles/Login.css';
import Container from 'reactstrap/lib/Container';
import axios from 'axios';

import CheckStore from '../store/CheckStore';
import { CommissionUpdate } from '../Components/CommissionUpdate';

let apiLinks = require('../api/config.json');
// "proxy": "http://localhost:5000"

export default function RegisterStaff(props) {
    //state hooks
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [staffType, setStaffType] = useState('Choose');
    const [address, setAddress] = useState('');
    const [staffMembers, setStaffMembers] = useState([{}]);
    const [advisorCode, setAdvisorCode] = useState('');
    const [commissionRate, setCommissionRate] = useState('');
    //validation for form
    function validateForm() {
        return props.isNew
            ? username.length > 0 &&
                  password.length > 0 &&
                  confirmPassword === password &&
                  firstName.length > 0 &&
                  lastName.length > 0 &&
                  address.length > 0 &&
                  commissionRate.length > 0 &&
                  staffType !== 'Choose'
            : username.length > 0 &&
                  firstName.length > 0 &&
                  lastName.length > 0 &&
                  commissionRate > 0 &&
                  staffType !== 'Choose';
    }

    //Do get request when functional component is mounted/updated
    useEffect(() => {
        let mounted = true;
        if (props.isNew) {
            axios
                .get(apiLinks.STAFFMEMBERS)
                .then(async res => {
                    if (mounted) {
                        const tempStaffMembers = await res.data;
                        setStaffMembers(tempStaffMembers);
                    }
                })
                .catch(err => console.log('Error code: ', err));
        } else {
            const getLink = apiLinks.STAFFMEMBERS + '/' + props.match.params.id;
            axios
                .get(getLink)
                .then(async res => {
                    const tempStaffMember = await res.data;
                    setUsername(tempStaffMember.username);
                    setFirstName(tempStaffMember.firstName);
                    setLastName(tempStaffMember.lastName);
                    setStaffType(tempStaffMember.staffType);
                    setAddress(tempStaffMember.address);
                    setAdvisorCode(tempStaffMember.advisorCode);
                    setCommissionRate(tempStaffMember.commissionRate);
                })
                .catch(err => console.log('Error code: ', err));
        }
        return () => (mounted = false);
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        // console.log('hello');

        // const tempStaffMember = props.isNew
        //     ? [
        //           {
        //               firstName,
        //               lastName,
        //               address,
        //               username,
        //               password,
        //               staffType,
        //               advisorCode,
        //               commissionRate
        //           }
        //       ]
        //     : [
        //           {
        //               firstName,
        //               lastName,
        //               address,
        //               username,
        //               staffType,
        //               commissionRate
        //           }
        //       ];
        const tempStaffMember = [
            {
                firstName,
                lastName,
                address,
                username,
                password,
                staffType,
                advisorCode,
                commissionRate
            }
        ];

        // axios
        //     .post('http://localhost:5000/api/staffMembers/', tempStaffMember)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
        // http://localhost:5000/api/staffMembers/

        const getLink = !props.isNew
            ? apiLinks.STAFFMEMBERS + '/' + props.match.params.id
            : null;
        console.log(getLink);

        props.isNew
            ? axios
                  .post(apiLinks.STAFFMEMBERS, tempStaffMember)
                  .then(response => {
                      console.log(response);
                  })
            : axios
                  .put(getLink, tempStaffMember)
                  .then(res => {
                      console.log(res);
                  })
                  .catch(err => console.log('Error code: ', err));
    }

    return (
        <Container>
            {/* <CommissionUpdate></CommissionUpdate> */}

            <div className="RegisterStaff">
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="username" bssize="large">
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            autoFocus
                            type="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="firstName" bssize="large">
                        <FormLabel>First Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="string"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="lastName" bssize="large">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="string"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="address" bssize="large">
                        <FormLabel>Address</FormLabel>
                        <FormControl
                            autoFocus
                            type="string"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </FormGroup>
                    {props.isNew ? (
                        <FormGroup controlId="password" bssize="large">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </FormGroup>
                    ) : null}
                    {props.isNew ? (
                        <FormGroup controlId="confirmPassword" bssize="large">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl
                                value={confirmPassword}
                                onChange={e =>
                                    setConfirmPassword(e.target.value)
                                }
                                type="password"
                            />
                        </FormGroup>
                    ) : null}
                    <FormGroup controlId="commissionRate" bssize="large">
                        <FormLabel>Commission Rate</FormLabel>
                        <FormControl
                            value={commissionRate}
                            onChange={e => setCommissionRate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="staffType" bssize="large">
                        <FormLabel>Staff Type</FormLabel>
                        <Dropdown
                            onSelect={key => {
                                setStaffType(key);
                                console.log(key);
                                var temp = Math.floor(
                                    Math.random() * 9999999 + 1000000
                                );
                                setAdvisorCode(temp.toString());
                                if (key === 'SystemAdministrator') {
                                    setAdvisorCode('1' + advisorCode);
                                } else if (key === 'OfficeManager') {
                                    setAdvisorCode('2' + advisorCode);
                                } else if (key === 'TravelAdvisor') {
                                    setAdvisorCode('3' + advisorCode);
                                }
                            }}
                        >
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {staffType}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="OfficeManager">
                                    Office Manager
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="SystemAdministrator">
                                    System Administrator
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="TravelAdvisor">
                                    Travel Advisor
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FormGroup>
                    <Button
                        block
                        bssize="large"
                        disabled={!validateForm()}
                        type="submit"
                    >
                        {props.isNew ? 'Register' : 'Update'}
                    </Button>
                    {/* <Button
                        onClick={e => {
                            e.preventDefault();
                            console.log(staffMembers);
                        }}
                    >
                        LOG CURRENT USERS
                    </Button>
                    <Button
                        onClick={e => {
                            e.preventDefault();
                            axios.post(
                                'http://localhost:5000/api/staffMembers/',
                                {
                                    firstName: 's',
                                    lastName: 'B',
                                    address: '34 Center',
                                    username: 'tutu1',
                                    staffType: 'TravelAdvisor',
                                    password: '12',
                                    advisorCode: '13345678'
                                }
                            );
                        }}
                    >
                        ADD MA BOI
                    </Button> */}
                </form>
            </div>
            {/* <CheckStore></CheckStore> */}
        </Container>
    );
}
