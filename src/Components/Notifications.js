import React from 'react';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { withRouter } from 'react-router';
import axios from 'axios';

// Notifications component
class Notifications extends React.Component {
    state = {
        tempCustomer: {},
        sales: this.props.sales,
    };

    // Creates notificattion
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

    // Calculates the number of days since the sale has been made.
    numberOfDaysSinceSale(date) {
        const saleDate = new Date(date);
        const todaysDate = new Date();

        var diff = Math.abs(todaysDate.getTime() - saleDate.getTime());

        return diff / (1000 * 60 * 60 * 24);
    }

    // Checks what notifications need to be made based on the properties passed through.
    componentDidUpdate() {
        this.props.sales.map((sale) => {
            if (
                Math.floor(30 - this.numberOfDaysSinceSale(sale.saleDate)) <=
                    0 &&
                sale.hasPayed === false
            ) {
                setTimeout(async () => {
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

    // Render the Notification Container
    render() {
        return (
            <div>
                <NotificationContainer />
            </div>
        );
    }
}

export default withRouter(Notifications);
