import React, { Fragment } from 'react';
import Container from 'reactstrap/lib/Container';
import TableOfCustomers from '../Components/TableOfCustomers';
import Discount from '../Components/Discounts';
import AssignDiscount from '../Components/AssignDiscount';

export default function Customers(props) {
    const officeManager = (
        <Fragment>
            <h1>
                <strong>Discounts</strong>
            </h1>

            <br />
            <AssignDiscount />
            <br />
            <br />
            <Discount></Discount>
        </Fragment>
    );
    function displayHandler() {
        var role;
        {
            props.staff !== undefined
                ? (role = `${props.staff.staffType}`)
                : (role = 'not working');
        }
        if (role === 'OfficeManager') {
            return <Fragment>{officeManager}</Fragment>;
        }
    }
    return (
        <Container>
            <h1>
                <strong>Customers</strong>
            </h1>
            <br></br>
            <TableOfCustomers></TableOfCustomers>

            <br />
            <br />
            <Fragment>{displayHandler()}</Fragment>
            <br />
            <br />
            <br />
            <br />
        </Container>
    );
}
