// create page with table that contains all the people who havent payed, with the table sorted in terms of days left.
// just show total amount to pay, and contact details for the customer.
import React, { Component, Fragment } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

export default class LatePayments extends Component {
    state = {
        sales: [{}],
        customers: [{}],
        toDisplay: [{}]
    };

    filterSales() {
        this.setState({
            sales: this.state.advisors.filter(sale => !sale.hasPayed)
        });
    }
    numberOfDaysSinceSale(date) {
        var diff = Math.abs(new Date().getTime() - date.getTime());
        return diff / (1000 * 60 * 60 * 24);
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
        //get customers and match using customerID on the data

        //mapping into data to display
        var tempToDisplay = [];
        this.sales.map(sale => {
            tempToDisplay.push({
                ticketNumber: sale.ticketNumber,
                amountDue:
                    Number(sale.fare) +
                    Number(sale.localTax) +
                    Number(sale.otherTax),
                saleDate: sale.saleDate,
                daysLeft: 30 - this.numberOfDaysSinceSale(sale.saleDate)
            });
        });
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
                            <th>Customer</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.advisors.map(
                            ({
                                ticketNumber,
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
