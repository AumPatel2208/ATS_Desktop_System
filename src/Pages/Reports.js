import React, {useState, useEffect, Fragment} from 'react';
import {
    Button,
    FormGroup,
    Dropdown,
     Form
} from 'react-bootstrap';
import '../Styles/Login.css';
import Container from 'reactstrap/lib/Container';
import ReportHandler from "../Components/ReportHandler";
import TableOfCustomers from "../Components/TableOfCustomers";
import ReportTableI from "../Components/ReportTableI";
import TableOfData from "../Components/TableOfData";

let apiLinks = require('../api/config.json');

export default function Reports() {
const [tableType, setTableType] = useState("Select Report Type");
const [tableCode, setTableCode] = useState("A");


    const global = (
        <Container>
            <TableOfCustomers></TableOfCustomers>
        </Container>
    );
    const individual = (
        <Container>
            <ReportTableI></ReportTableI>
        </Container>
    );
    const blanks = (
        <Container>
            <label> BLANKS</label>
        </Container>
    );

function reportHandler() {


    if (tableCode == "A") {
        return <Fragment>{individual}</Fragment>;
    } else if (tableCode == "B") {
        return <Fragment>{global}</Fragment>;
    } else if (tableCode == "C") {
        return <Fragment>{blanks}</Fragment>;
    } else {
        return 0
    }

}

//add in handling here to determine the form that shows up
    return (
        <Container>
            <h1>Generate Reports</h1>
            <div className="Reports">
            </div>
                <Form>

                    <FormGroup controlId="tableType" bssize="large">

                        <Dropdown
                            onSelect={key => {
                                setTableType(key);
                                console.log(key);
                                var temp = Math.floor(
                                    Math.random() * 9999999 + 1000000
                                );
                                setTableCode(temp.toString());
                                if (key === 'Individual') {
                                    setTableCode('A' );
                                } else if (key === 'Global') {
                                    setTableCode('B' );
                                }
                                else if (key === 'Ticket Turnover') {
                                    setTableCode('C');
                                }
                                reportHandler()
                            }}
                        >
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {tableType}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Individual">
                                    Individual
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Global">
                                    Global
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Ticket Turnover">
                                    Ticket Turnover
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FormGroup>
                    <Fragment>{reportHandler()}</Fragment>

                </Form>
        </Container>
    );

}

