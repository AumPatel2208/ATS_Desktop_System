import React from 'react';
import { Container } from 'reactstrap';
import {SaleForm} from "../Components/SaleForm";
import AddBlanks from "../Components/AddBlanks";
import AdvisorBlanks from "../Components/AdvisorBlanks";
// import PaymentForm from '../Components/PaymentForm';
// import TableOfCustomers from '../Components/TableOfCustomers';
export default function Sale()  {
    return (
        <Container>
            <h2>Select a Blank to Sell</h2>
            <AdvisorBlanks></AdvisorBlanks>
        </Container>
    );
}

