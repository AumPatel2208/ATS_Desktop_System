import React, { useState, Fragment } from 'react';
import { Container } from 'reactstrap';
import ReportTurnoverT from '../Components/ReportTurnoverT';
// import {
//     Button,
//     Dropdown,
//     Form,
//     FormControl,
//     FormGroup,
//     FormLabel
// } from 'react-bootstrap';

import axios from 'axios';
import DatePicker from 'react-datepicker';
import AddBlanks from '../Components/AddBlanks';
import AssignBlanks from '../Components/AssignBlanks';
import { useStoreState } from 'pullstate';
import { UserStore } from '../store/UserStore';
import FindBlank from "../Components/FindBlank";
let apiLinks = require('../api/config.json');

export default function Blanks(props) {
    const manager = (
        <Container>
            <AssignBlanks></AssignBlanks>
            <br />
        </Container>
    );
    const admin = (
        <Container>
            <AddBlanks></AddBlanks>
            <br />
            <FindBlank></FindBlank>
        </Container>
    );

    function displayHandler() {

        var ad;
        {props.staff !== undefined
            ? ad =`${props.staff.staffType}`
            : ad = "undefined"}

        if (ad === 'SystemAdministrator') {
            return <Fragment>{admin}</Fragment>;
        } else if (ad === 'OfficeManager') {
            return <Fragment>{manager}</Fragment>;
        }
    }

    return (
        <Container>
            <Fragment>{displayHandler()}</Fragment>
        </Container>
    );
}
