import React, { useState, useEffect } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import '../Styles/Login.css';
import Container from 'reactstrap/lib/Container';
import axios from 'axios';

let apiLinks = require('../api/config.json');

export default function Login(props) {
    //state hooks
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [staffMemebers, setStaffMembers] = useState([{}]);
    const [isSignedIn, setIsSignedIn] = useState(false);

    //validation for form
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }
    // var isDone = false;
    //Do get request when functional component is mounted/updated
    useEffect(() => {
        let mounted = true;

        axios
            .get(apiLinks.STAFFMEMBERS)
            .then(async (res) => {
                if (mounted) {
                    const tempStaffMemebers = await res.data;
                    setStaffMembers(tempStaffMemebers);
                }
            })
            .catch((err) => console.log('Error code: ', err));
        return () => (mounted = false);
    }, []);

    function handleSubmit(event) {
        // Headers
        const headersConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios
            .post(apiLinks.SECURE, { username, password }, headersConfig)
            .then((res) => {
                var staff = staffMemebers.filter(
                    (staffMemeber) => staffMemeber._id === res.data.staff.id
                );
                staff = { ...staff };
                staff = staff[0];

                setIsSignedIn(true);
            })
            .catch((err) => {
                alert('Login Failed! \n Error: ' + err);
            });
        event.preventDefault();
    }

    return (
        <Container>
            {isSignedIn || props.isAuthenticated
                ? window.location.replace('./')
                : null}
            <div className="Login">
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="username" bssize="large">
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            autoFocus
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bssize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bssize="large"
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
