// create page with table that contains all the people who havent payed, with the table sorted in terms of days left.
// just show total amount to pay, and contact details for the customer.
import React, { Component, Fragment } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router';
class LatePayments extends Component {
    state = {
        sales: [{}],
        customers: [{}],
        toDisplay: [{}],
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
            .then(async (res) => {
                if (this.mounted) {
                    const sales = await res.data;
                    this.setState({ sales });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // this.filterSales();
        //get customers and match using customerID on the data

        await axios.get('/api/customers').then((res) => {
            this.setState({ customers: res.data });
        });

        //mapping into data to display
        var tempToDisplay = [];
        this.state.sales.map((sale) => {
            var money =
                Number(sale.fare) +
                (sale.localTax !== 'Empty.' && sale.localTax !== undefined
                    ? Number(sale.localTax)
                    : 0) +
                (sale.otherTax !== 'Empty.' && sale.otherTax !== undefined
                    ? Number(sale.otherTax)
                    : 0);
            var tempCust = this.state.customers.find(
                (cust) => String(cust._id) === String(sale.custName)
            );

            tempToDisplay.push({
                saleID: sale._id,
                ticketNumber: sale.ticketNumber,
                amountDue: money,
                saleDate: sale.saleDate,
                daysLeft: Math.floor(
                    30 - this.numberOfDaysSinceSale(sale.saleDate)
                ),
                customer: tempCust,
                custName:
                    tempCust.firstName +
                    tempCust.lastName.toUpperCase().charAt(0),
            });
        });
        console.log(tempToDisplay);

        this.setState({ toDisplay: tempToDisplay });
    }
    render() {
        function row(
            saleID,
            ticketNumber,
            amountDue,
            saleDate,
            daysLeft,
            custName
        ) {
            return (
                <Fragment>
                    <tr key={custName}>
                        <td>{ticketNumber}</td>
                        <td>{amountDue}</td>
                        <td>{saleDate}</td>
                        <td>{daysLeft}</td>
                        <td>{custName}</td>
                        <td>
                            <Button
                                onClick={() => {
                                    this.props.history.push(
                                        './sale_edit/' + saleID
                                    );
                                }}
                                variant="outline-warning"
                            >
                                Pay
                            </Button>
                        </td>
                    </tr>
                </Fragment>
            );
        }
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
                        {this.state.toDisplay.map(
                            ({
                                saleID,
                                ticketNumber,
                                amountDue,
                                saleDate,
                                daysLeft,
                                custName,
                            }) => (
                                <Fragment key={custName}>
                                    {row(
                                        saleID,
                                        ticketNumber,
                                        amountDue,
                                        saleDate,
                                        daysLeft,
                                        custName
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
export default withRouter(LatePayments);
