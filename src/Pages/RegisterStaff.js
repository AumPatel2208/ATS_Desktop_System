import React, { useState, useEffect } from 'react';
import {
    Button,
    FormGroup,
    FormControl,
    FormLabel,
    Dropdown,
    DropdownButton
} from 'react-bootstrap';
import '../Styles/Login.css';
import Container from 'reactstrap/lib/Container';
import axios from 'axios';
// import { useStoreState } from "pullstate";
// import UserStore from "../store/UserStore";
import CheckStore from '../store/CheckStore';
import { useStoreState } from 'pullstate';
import { UserStore } from '../store/UserStore.js';

let apiLinks = require('../api/config.json');
// "proxy": "http://localhost:5000"

export default function Login(props) {
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
    //validation for form
    function validateForm() {
        return (
            username.length > 0 &&
            password.length > 0 &&
            confirmPassword === password &&
            firstName.length > 0 &&
            lastName.length > 0 &&
            staffType !== 'Choose'
        );
    }

    //Do get request when functional component is mounted/updated
    useEffect(() => {
        axios.get(apiLinks.STAFFMEMBERS).then(res => {
            const tempStaffMembers = res.data;
            setStaffMembers(tempStaffMembers);
        });
    });

    function handleSubmit(event) {
        event.preventDefault();
        console.log('hello');

        const tempStaffMember = {
            firstName,
            lastName,
            address,
            username,
            staffType,
            advisorCode
        };
        // axios
        //     .post('http://localhost:5000/api/staffMembers/', tempStaffMember)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
        // http://localhost:5000/api/staffMembers/
        axios.post(apiLinks.STAFFMEMBERS, tempStaffMember).then(response => {
            console.log(response);
        });
    }

    return (
        <Container>
            <h1>hello</h1>
            <div className="Login">
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
                    <FormGroup controlId="password" bssize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="confirmPassword" bssize="large">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            type="password"
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
                        Register
                    </Button>
                    <Button
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
                    </Button>
                </form>
            </div>
            <CheckStore></CheckStore>
        </Container>
    );
}
