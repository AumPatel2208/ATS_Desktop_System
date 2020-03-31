import React, { useState, Fragment } from 'react';
import { FormGroup, Dropdown, Form } from 'react-bootstrap';
import '../Styles/Login.css';
import Container from 'reactstrap/lib/Container';
import ReportTableI from '../Components/ReportTableI';
import ReportTurnoverT from '../Components/ReportTurnoverT';
import ReportTableG from '../Components/ReportTableG';
import ReportTableGRate from '../Components/ReportTableGRate';

// let apiLinks = require('../api/config.json');

export default function Reports() {
    const [tableType, setTableType] = useState('Select Report Type');
    const [tableCode, setTableCode] = useState('');

    const globalA = (
        <Container>
            <ReportTableG></ReportTableG>
        </Container>
    );
    const globalR = (
        <Container>
            <ReportTableGRate></ReportTableGRate>
        </Container>
    );
    const individual = (
        <Container>
            <ReportTableI></ReportTableI>
        </Container>
    );
    const blanks = (
        <Container>
            <ReportTurnoverT></ReportTurnoverT>
        </Container>
    );

    function reportHandler() {
        if (tableCode === 'A') {
            return <Fragment>{individual}</Fragment>;
        } else if (tableCode === 'B') {
            return <Fragment>{globalA}</Fragment>;
        } else if (tableCode === 'C') {
            return <Fragment>{globalR}</Fragment>;
        } else if (tableCode === 'D') {
            return <Fragment>{blanks}</Fragment>;
        } else {
            return 'Please Select A Report Type';
        }
    }

    //add in handling here to determine the form that shows up
    return (
        <Container>
            <h2>Generate Reports</h2>
            <br></br>
            <div className="Reports"></div>
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
                                setTableCode('A');
                            } else if (key === 'Global by Advisor') {
                                setTableCode('B');
                            } else if (key === 'Global by Rate') {
                                setTableCode('C');
                            } else if (key === 'Ticket Turnover') {
                                setTableCode('D');
                            }
                            reportHandler();
                        }}
                    >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {tableType}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Individual">
                                Individual
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Global by Advisor">
                                Global By Advisor
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Global by Rate">
                                Global By Rate
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
