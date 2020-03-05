import React, { Component, Fragment } from 'react';
import { Container, Table, Button } from 'reactstrap';

export default class TableOfData extends Component {
    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        this.props.getCalculations();
    }

    render() {
        /* need to pull all the data into a const*/

        /**
         * Will return a Fragment to be used when mapping in the render function.
         * Allows to break down the data into rows and TD.
         * CHANGE the params as this was used in the MERN_CALC app
         * @param {The MongoDB ID of the object in the collection} _id
         */
        const row = (_id, calculationString, date, userEmail) => (
            <Fragment>
                <tr key={_id}>
                    <td>{_id}</td>
                    <td>{calculationString}</td>
                    <td>{date}</td>
                    <td>{userEmail}</td>
                    <td>
                        <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={this.onDeleteClick.bind(this, _id)}
                        >
                            &times;
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
                            <th width="10%">ID</th>
                            <th width="40%">Calculation String</th>
                            <th>Date-Time</th>
                            <th width="10%">UserEmail</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
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
