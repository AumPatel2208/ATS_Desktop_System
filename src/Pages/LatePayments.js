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
        // this.setState({
        //     sales: this.state.advisors.filter(sale => !sale.hasPayed)
        // });
    }
    numberOfDaysSinceSale(date) {
        console.log(date);
        const saleDate = new Date(date);
        const todaysDate = new Date();

        // var diff = Math.abs(new Date().getTime() - new Date(date).getTime());
        var diff = Math.abs(todaysDate.getTime() - saleDate.getTime());
        // console.log(diff / (1000 * 60 * 60 * 24));

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
        // this.filterSales();
        //get customers and match using customerID on the data

        //mapping into data to display
        var tempToDisplay = [];
        this.state.sales.map(sale => {
            var money =
                Number(sale.fare) +
                (sale.localTax !== 'Empty.' && sale.localTax !== undefined
                    ? Number(sale.localTax)
                    : 0) +
                (sale.otherTax !== 'Empty.' && sale.otherTax !== undefined
                    ? Number(sale.otherTax)
                    : 0);

            tempToDisplay.push({
                ticketNumber: sale.ticketNumber,
                amountDue: money,
                saleDate: sale.saleDate,
                daysLeft: this.numberOfDaysSinceSale(sale.saleDate) - 30,
                custName: sale.custName
            });
        });
        console.log(tempToDisplay);

        this.setState({ toDisplay: tempToDisplay });
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
                        {/*this.state.advisors.map(
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
                                    )*/}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
