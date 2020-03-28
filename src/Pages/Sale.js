import React from 'react';
import { Container } from 'reactstrap';
import {SaleForm} from "../Components/SaleForm";
// import PaymentForm from '../Components/PaymentForm';
// import TableOfCustomers from '../Components/TableOfCustomers';
export default function Sale()  {
    return (
        <Container>
            <h1>SELL SHIT</h1>
            <SaleForm></SaleForm>
        </Container>
    );
}

