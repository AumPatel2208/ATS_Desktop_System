import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../Styles/Login.css";
import Container from "reactstrap/lib/Container";
import axios from "axios";
// import { useStoreState } from "pullstate";
// import UserStore from "../store/UserStore";
import CheckStore from "../store/CheckStore";
import { useStoreState } from "pullstate";
import { UserStore } from "../store/UserStore.js";

let apiLinks = require("../api/config.json");

export default function Login(props) {
  //state hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [staffMemebers, setStaffMembers] = useState([{}]);

  //validation for form
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  //Do get request when functional component is mounted/updated
  useEffect(() => {
    axios.get(apiLinks.STAFFMEMBERS).then(res => {
      const tempStaffMemebers = res.data;
      setStaffMembers(tempStaffMemebers);
    });
  });

  //Global State
  const User = useStoreState(UserStore, s => s.UserType);
  const IsAuthenticated = useStoreState(UserStore, s => s.IsAuthenticated);

  // const { UserID, UserType, isLoggedIn } = useStoreState(UserStore, s => ({
  //   UserID: s.UserID,
  //   UserType: s.UserType,
  //   isLoggedIn: false
  // }));

  function handleSubmit(event) {
    var staff = staffMemebers.filter(
      staffMemeber => staffMemeber.username === username
    );
    staff = { ...staff };
    staff = staff[0];

    UserStore.update(s => {
      s.User = staff;
      s.IsAuthenticated = true; // need to move later after jwtAuthentication
    });

    // UserStore.update(s => {
    //   s.UserID = staff.id;
    //   s.UserType = staff.staffType;
    // });

    // console.log(UserID);
    // console.log(UserType);
    // console.log(isLoggedIn);

    event.preventDefault();
  }

  return (
    <Container>
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="username" bssize="large">
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              type="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block bssize="large" disabled={!validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>
      <CheckStore></CheckStore>
    </Container>
  );
}
