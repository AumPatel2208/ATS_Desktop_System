import React from 'react';
import { Container } from 'reactstrap';
import PaymentForm from '../Components/PaymentForm';
function Home() {
    return (
        <Container>
            <h1>Home</h1>
            <PaymentForm></PaymentForm>
        </Container>
    );
}

export default Home;
