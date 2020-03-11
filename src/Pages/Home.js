import React from "react";
import { Container } from "reactstrap";
// import PaymentForm from '../Components/PaymentForm';
import TableOfCustomers from "../Components/TableOfCustomers";
function Home() {
  return (
    <Container>
      <h1>Home</h1>
      {/* <PaymentForm></PaymentForm> */}
      <TableOfCustomers></TableOfCustomers>
    </Container>
  );
}

export default Home;
