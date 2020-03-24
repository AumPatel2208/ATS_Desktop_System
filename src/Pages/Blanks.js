import React, {useState, Fragment} from 'react';
import { Container, Label } from 'reactstrap';
import ReportTurnoverT from "../Components/ReportTurnoverT";
import {Button, Dropdown, Form, FormControl, FormGroup, FormLabel,} from "react-bootstrap";

import axios from 'axios';
import DatePicker from "react-datepicker";
import AddBlanks from "../Components/AddBlanks";
let apiLinks = require('../api/config.json');

export default function Blanks() {

    const [batchValues, setBatchValues] = useState("");
    const [date, setDate] = useState(0);



    return (
        <Container>
<AddBlanks></AddBlanks>
            <br/>
                <h3>Blank Stock</h3>
                <ReportTurnoverT></ReportTurnoverT>
        </Container>
    );
}


