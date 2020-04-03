// create page with table that contains all the people who havent payed, with the table sorted in terms of days left.
// just show total amount to pay, and contact details for the customer.
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

export default class LatePayments extends Component {
    state = {
        sales: [{}]
    };

    filterSales() {
        this.setState({
            sales: this.state.advisors.filter(sale => !sale.hasPayed)
        });
    }

    async componentDidMount() {
        this.mounted = true;

        await axios
            .get('/api/sales')
            .then(async res => {
                if (this.mounted) {
                    const sales = await res.data;
                    this.setState({ sales });
                }
            })
            .catch(err => {
                console.log(err);
            });
        this.filterSales();
    }
    render() {
        return (
            <Container>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Ticket Number</th>
                            <th>Amount due</th>
                            <th>Sale Date</th>
                            <th>Days Left</th>
                            <th>Advisor Code</th>
                            <th>Customer</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.advisors.map(
                            ({
                                _id,
                                firstName,
                                lastName,
                                address,
                                username,
                                advisorCode,
                                commissionRate
                            }) => (
                                <Fragment key={_id}>
                                    {row(
                                        _id,
                                        firstName,
                                        lastName,
                                        address,
                                        username,
                                        advisorCode,
                                        commissionRate
                                    )}
                                </Fragment>
                            )
                        )}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
