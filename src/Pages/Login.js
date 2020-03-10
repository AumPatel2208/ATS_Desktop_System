import React, { useState, useEffect } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import '../Styles/Login.css';
import Container from 'reactstrap/lib/Container';
import axios from 'axios';
let apiLinks = require('../api/config.json');

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [staffMemebers, setStaffMembers] = useState([{}]);
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    useEffect(() => {
        axios.get(apiLinks.STAFFMEMBERS).then(res => {
            const tempStaffMemebers = res.data;
            setStaffMembers(tempStaffMemebers);
        });
    });

    function handleSubmit(event) {
        var staff = staffMemebers.filter(
            staffMemeber => staffMemeber.username === username
        );

        event.preventDefault();
    }

    return (
        <Container>
            <div className="Login">
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            autoFocus
                            type="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </Container>
    );
}
