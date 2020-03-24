import React, {useState, Fragment} from 'react';
import { Container, Label } from 'reactstrap';
import ReportTurnoverT from "../Components/ReportTurnoverT";
import {Button, Dropdown, Form, FormControl, FormGroup, FormLabel,} from "react-bootstrap";

import axios from 'axios';
import DatePicker from "react-datepicker";
import AddBlanks from "../Components/AddBlanks";
import AssignBlanks from "../Components/AssignBlanks";
import {useStoreState} from "pullstate";
import {UserStore} from "../store/UserStore";
let apiLinks = require('../api/config.json');

export default function Blanks() {
    const User = useStoreState(UserStore, s => s.User);
    const type = String(User.staffType);
    const manager = (
        <Container>
            <AssignBlanks></AssignBlanks>
            <br/>
        </Container>
    );
    const admin = (
        <Container>
            <AddBlanks></AddBlanks>
            <br/>
        </Container>
    );

    function displayHandler() {
        if (type === 'SystemAdministrator') {
            return <Fragment>{admin}</Fragment>
        } else if (type === 'OfficeManager') {
            return <Fragment>{manager}</Fragment>
        }
    }


    return (
        <Container>
            <Fragment>{displayHandler()}</Fragment>
            <br/>
                <h2>Blank Stock</h2>
                <ReportTurnoverT></ReportTurnoverT>
        </Container>
    );
}


