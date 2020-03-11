import React from "react";
import { Container, Button } from "react-bootstrap";
import { useStoreState } from "pullstate";
import { UserStore } from "./UserStore.js";

//Function Used to display the state variables to the console
export default function CheckStore() {
  //Global State
  const User = useStoreState(UserStore, s => s.User);
  const IsAuthenticated = useStoreState(UserStore, s => s.IsAuthenticated);
  return (
    <Container>
      <Button
        onClick={() => {
          console.log("User: ", User);
          console.log("IsAuthenticated", IsAuthenticated);
        }}
      >
        Check User States
      </Button>
    </Container>
  );
}
