import React from 'react';
import { Container } from 'reactstrap';
import RatesForm from '../Components/RatesForm';

// Render Exchange Rates
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
