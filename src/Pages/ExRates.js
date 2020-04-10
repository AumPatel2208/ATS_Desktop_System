import React from 'react';
import { Container } from 'reactstrap';
import RatesForm from '../Components/RatesForm';
// import PaymentForm from '../Components/PaymentForm';
// import TableOfCustomers from '../Components/TableOfCustomers';
export default function ExRates() {
    return (
        <Container>
            <h1>
                <strong>Exchange Rates</strong>
            </h1>
            <br></br>
            <RatesForm></RatesForm>
        </Container>
    );
}
