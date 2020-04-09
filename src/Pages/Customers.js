import React, {Fragment} from 'react';
import Container from 'reactstrap/lib/Container';
import TableOfCustomers from '../Components/TableOfCustomers';
import Discount from "../Components/Discounts";

export default function Customers(props) {
const officeManager = (
    <Fragment>  <Discount></Discount></Fragment>
);
    function displayHandler() {
        var role;
        {
            props.staff !== undefined
                ? role = `${props.staff.staffType}`
                : role = "not working"
        }
        if (role === "OfficeManager") {
            return <Fragment>{officeManager}</Fragment>
        }
    }
    return (
        <Container>
            <TableOfCustomers></TableOfCustomers>

            <br/>
            <br/>
            <Fragment>{displayHandler()}</Fragment>
<br/>
<br/>
            <br/>
            <br/>
        </Container>
    );
}
