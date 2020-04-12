import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import AddBlanks from '../Components/AddBlanks';
import AssignBlanks from '../Components/AssignBlanks';
import FindBlank from '../Components/FindBlank';

export default function Blanks(props) {
    const manager = (
        <Container>
            <AssignBlanks></AssignBlanks>
            <br />
        </Container>
    );
    const admin = (
        <Container>
            <h1>
                <strong>Blanks</strong>
            </h1>
            <br />
            <AddBlanks></AddBlanks>
            <br />
            <FindBlank></FindBlank>
        </Container>
    );

    // Handles what to display the appropriate components based on role
    function displayHandler() {
        var ad;
        {
            props.staff !== undefined
                ? (ad = `${props.staff.staffType}`)
                : (ad = 'undefined');
        }

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
