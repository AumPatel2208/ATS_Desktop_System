import React, {useState, Fragment} from 'react';
import { Container } from 'reactstrap';
import ReportTurnoverT from "../Components/ReportTurnoverT";
import {Dropdown, FormControl, FormGroup, FormLabel} from "react-bootstrap";




export default function Blanks() {


    const [actionType, setActionType] = useState("Select Action Type");
    const [actionCode, setActionCode] = useState("");


    const add =(
        <Container>
            <form>
                <FormGroup controlId="username" bssize="large">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        //value={username}
                        //onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
            </form>

        </Container>
    );
    const assign =(
        <Container>


        </Container>
    );

function actionHandler() {
        if(actionCode == "A"){
            return <Fragment>{add}</Fragment>
        }
        else{
            return <Fragment>{assign}</Fragment>
        }
}
    return (
        <Container>
            <h1>BLANKS</h1>

            <Dropdown
                onSelect={key => {
                    setActionType(key);
                    if (key === "Add") {
                        setActionCode("A");
                    }
                    actionHandler()
                }}


            >
                <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                >
                    {actionType}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Add">
                        Add
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Assign">
                        Assign
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <FormLabel>Blank Stock</FormLabel>
            <ReportTurnoverT></ReportTurnoverT>
        </Container>
    );
}


