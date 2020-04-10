import React from 'react';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { withRouter } from 'react-router';
import axios from 'axios';
class Notifications extends React.Component {
    state = {
        tempCustomer: {},
        sales: this.props.sales,
    };

    // constructor(props) {
    //     super(props);
    // }

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'latePayment':
                    NotificationManager.error(
                        'Late Payment Alert',
                        'Open Sale',
                        4000,
                        () => {
                            this.props.history.push(`/latePayments`);
                        }
                    );
                    break;
                default:
                    break;
            }
        };
    };
    numberOfDaysSinceSale(date) {
        const saleDate = new Date(date);
        const todaysDate = new Date();

        var diff = Math.abs(todaysDate.getTime() - saleDate.getTime());

        return diff / (1000 * 60 * 60 * 24);
    }
    componentDidUpdate() {
        this.props.sales.map((sale) => {
            if (
                Math.floor(30 - this.numberOfDaysSinceSale(sale.saleDate)) <= 0
            ) {
                setTimeout(async () => {
                    // await axios
                    //     .get('api/customers/' + sale.custName)
                    //     .then((res) => {
                    //         this.setState({ tempCustomer: res.data });
                    //     });
                    // var tempName =
                    //     this.state.tempCustomer.firstName +
                    //     this.state.tempCustomer.lastName
                    //         .toUpperCase()
                    //         .charAt(0);
                    // this.createNotification('latePayment');
                    NotificationManager.error(
                        'Late Payment Alert for Ticket Number: ' +
                            sale.ticketNumber,
                        'Open Sale.',
                        4000,
                        () => {
                            this.props.history.push(`/latePayments`);
                        }
                    );
                }, 1000);
            }
        });
    }

    render() {
        return (
            <div>
                {/* <button
                    className="btn btn-danger"
                    onClick={this.createNotification('latePayment')}
                >
                    Late Payment
                </button> */}

                <NotificationContainer />
            </div>
        );
    }
}

export default withRouter(Notifications);
