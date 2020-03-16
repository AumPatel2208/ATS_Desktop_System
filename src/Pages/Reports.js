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

export default function Reports() {
const [reportType, setReportType] = useState("");
const [reportCode, setReportCode] = useState("");


function handleSubmit(event) {
       /*
        var staff = staffMemebers.filter(
            staffMemeber => staffMemeber.username === username
        );
        staff = { ...staff };
        staff = staff[0];

        UserStore.update(s => {
            s.User = staff;
            s.IsAuthenticated = true; // need to move later after jwtAuthentication

        */
        //});
        event.preventDefault();
    }

    return (
        <Container>
            <h1>Generate Reports</h1>
            <div className="Reports">
                <form onSubmit={handleSubmit}>


                    <FormGroup controlId="reportType" bssize="large">
                        <FormLabel>Staff Type</FormLabel>
                        <Dropdown
                            onSelect={key => {
                                setReportType(key);
                                console.log(key);
                                var temp = Math.floor(
                                    Math.random() * 9999999 + 1000000
                                );

                                setReportCode(temp.toString());
                                if (key === 'Domestic') {
                                    setReportCode('1' + reportCode);
                                } else if (key === 'Interline') {
                                    setReportCode('2' + reportCode);
                                }
                            }}
                        >

                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {reportType}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Domestic">
                                    Domestic
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Interline">
                                    Interline
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FormGroup>

                    <Button
                        block
                        bssize="large"
                        //disabled={!validateForm()}
                        type="submit"
                    >
                        Generate Report
                    </Button>
                </form>
            </div>
            <CheckStore></CheckStore>
        </Container>
    );
}

