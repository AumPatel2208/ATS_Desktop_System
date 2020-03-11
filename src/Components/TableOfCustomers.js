import React, { Component, Fragment } from "react";
import { Container, Table, Button } from "reactstrap";
import axios from "axios";
let apiLinks = require("../api/config.json");
export default class TableOfCustomers extends Component {
  //Set the state to an empty list of objects that will be taken from the database
  state = {
    customers: []
  };

  //runs when component mounts, use to gets the data from db
  componentDidMount() {
    axios.get(apiLinks.CUSTOMERS).then(res => {
      const customers = res.data;
      this.setState({ customers });
    });
  }

  onOpenClick(e, _id) {
    console.log(e, _id);
  }

  render() {
    /**
     * Will return a Fragment to be used when mapping in the render function.
     * Allows to break down the data into rows and TD.
     * @param {The MongoDB ID of the object in the collection} _id
     */
    const row = (
      _id,
      firstName,
      lastName,
      address,
      phoneNumber,
      customerType
    ) => (
      <Fragment>
        <tr key={_id}>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{address}</td>
          <td>{phoneNumber}</td>
          <td>{customerType}</td>
          <td>
            <Button
              className="open-btn"
              color="primary"
              size="sm"
              onClick={this.onOpenClick.bind(this, _id)}
            >
              open
            </Button>
          </td>
        </tr>
      </Fragment>
    );

    return (
      <Container>
        <Table className="mt-4">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Customer Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.map(
              ({
                _id,
                firstName,
                lastName,
                address,
                phoneNumber,
                customerType
              }) => (
                <Fragment key={_id}>
                  {row(
                    _id,
                    firstName,
                    lastName,
                    address,
                    phoneNumber,
                    customerType
                  )}
                </Fragment>
              )
            )}

            {/* 
                        //calculations.map is used to map all the data from calculations (contains the collection from mongo) into seperate elments
                        {calculations.map( 
                            ({ _id, calculationString, date, userEmail }) => (
                                <Fragment>
                                // only uses the data of that user. 
                                //THIS IS ESSENTIALLY A FILTER. COULD BE USED IN A METHOD TO PROVIDE FILTERING IN ATS
                                    {userEmail === user.email
                                        ? row(
                                              _id,
                                              calculationString,
                                              date,
                                              userEmail
                                          )
                                        : null}
                                </Fragment>
                            )
                        )} */}
          </tbody>
        </Table>
      </Container>
    );
  }
}
