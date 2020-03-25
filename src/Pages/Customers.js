import React from 'react';
import Container from 'reactstrap/lib/Container';
import TableOfCustomers from '../Components/TableOfCustomers';
import Discount from "../Components/Discounts";

export default function Customers() {
    return (
        <Container>
            <Discount></Discount>
            <br/>
            <br/>
            <TableOfCustomers></TableOfCustomers>
        </Container>
    );
}
