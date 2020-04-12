import React, { useState, useEffect } from 'react';
import {
    Button,
    FormGroup,
    FormControl,
    FormLabel,
    Dropdown,
    Tabs,
    Tab,
} from 'react-bootstrap';
import '../Styles/Login.css';
import Container from 'reactstrap/lib/Container';
import axios from 'axios';
import { CommissionUpdate } from '../Components/CommissionUpdate';
import CommissionRates from '../Components/CommissionRates';

let apiLinks = require('../api/config.json');

// Register Staff or update staff based on the properties
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
    const [commissionRate440, setCommissionRate440] = useState('');
    const [commissionRate444, setCommissionRate444] = useState('');
    const [commissionRate420, setCommissionRate420] = useState('');
    const [commissionRate201, setCommissionRate201] = useState('');

    //validation for form
    function validateForm() {
        return props.isNew
            ? username.length > 0 &&
                  password.length > 0 &&
                  confirmPassword === password &&
                  firstName.length > 0 &&
                  lastName.length > 0 &&
                  address.length > 0 &&
                  staffType !== 'Choose'
            : username.length > 0 &&
                  firstName.length > 0 &&
                  lastName.length > 0 &&
                  staffType !== 'Choose';
    }

    //Do get request when functional component is mounted/updated
    useEffect(() => {
        let mounted = true;
        if (props.isNew) {
            axios
                .get(apiLinks.STAFFMEMBERS)
                .then(async (res) => {
                    if (mounted) {
                        const tempStaffMembers = await res.data;
                        setStaffMembers(tempStaffMembers);
                    }
                })
                .catch((err) => console.log('Error code: ', err));
        } else {
            const getLink = apiLinks.STAFFMEMBERS + '/' + props.match.params.id;
            axios
                .get(getLink)
                .then(async (res) => {
                    const tempStaffMember = await res.data;
                    setUsername(tempStaffMember.username);
                    setFirstName(tempStaffMember.firstName);
                    setLastName(tempStaffMember.lastName);
                    setStaffType(tempStaffMember.staffType);
                    setAddress(tempStaffMember.address);
                    setAdvisorCode(tempStaffMember.advisorCode);
                    setCommissionRate440(tempStaffMember.commissionRate440);
                    setCommissionRate444(tempStaffMember.commissionRate444);
                    setCommissionRate420(tempStaffMember.commissionRate420);
                    setCommissionRate201(tempStaffMember.commissionRate201);
                })
                .catch((err) => console.log('Error code: ', err));
        }
        return () => (mounted = false);
    }, [props]);

    // Create Staff member on submit
    function handleSubmit(event) {
        event.preventDefault();

        const tempStaffMember = [
            {
                firstName,
                lastName,
                address,
                username,
                password,
                staffType,
                advisorCode,
                commissionRate440,
                commissionRate420,
                commissionRate201,
            },
        ];

        const getLink = !props.isNew
            ? apiLinks.STAFFMEMBERS + '/' + props.match.params.id
            : null;
        console.log(getLink);

        props.isNew
            ? axios
                  .post(apiLinks.STAFFMEMBERS, tempStaffMember)
                  .then((response) => {
                      console.log(response);
                      alert('User Created');
                  })
            : axios
                  .put(getLink, tempStaffMember)
                  .then((res) => {
                      console.log(res);
                      alert('User Updated');
                  })
                  .catch((err) => console.log('Error code: ', err));
    }

    // Return Form with Tabs for the commision rates
    return (
        <Container>
            <Tabs
                defaultActiveKey="registerStaff"
                transition={false}
                id="uncontrolled-tab-example"
            >
                <Tab
                    eventKey="registerStaff"
                    title={props.isNew ? 'Register Staff' : 'Update Staff'}
                >
                    <div className="RegisterStaff">
                        <br />
                        <h1>
                            <strong>
                                {props.isNew
                                    ? 'Register Staff'
                                    : 'Update Staff'}
                            </strong>
                        </h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <FormGroup controlId="username" bssize="large">
                                <FormLabel>Username</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </FormGroup>
                            <FormGroup controlId="firstName" bssize="large">
                                <FormLabel>First Name</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="string"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </FormGroup>
                            <FormGroup controlId="lastName" bssize="large">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="string"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </FormGroup>
                            <FormGroup controlId="address" bssize="large">
                                <FormLabel>Address</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="string"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </FormGroup>
                            {props.isNew ? (
                                <FormGroup controlId="password" bssize="large">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        type="password"
                                    />
                                </FormGroup>
                            ) : null}
                            {props.isNew ? (
                                <FormGroup
                                    controlId="confirmPassword"
                                    bssize="large"
                                >
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        type="password"
                                    />
                                </FormGroup>
                            ) : null}

                            <FormGroup controlId="advisorCode" bssize="large">
                                <FormLabel>Advisor Code</FormLabel>
                                <FormControl
                                    value={advisorCode}
                                    onChange={(e) =>
                                        setAdvisorCode(e.target.value)
                                    }
                                />
                            </FormGroup>

                            <FormGroup controlId="staffType" bssize="large">
                                <FormLabel>Staff Type</FormLabel>
                                <Dropdown
                                    onSelect={(key) => {
                                        setStaffType(key);
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
                        </form>
                    </div>
                    <br />
                </Tab>
                <Tab eventKey="commissionRates" title="Commission Rates">
                    <br />
                    <h1>
                        <strong>Update Commission Rates</strong>
                    </h1>
                    <br />

                    <CommissionRates></CommissionRates>
                    <br />
                    <CommissionUpdate></CommissionUpdate>
                    <br />
                </Tab>
            </Tabs>

            <br />
            <br />
        </Container>
    );
}
