import React from 'react';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { withRouter } from 'react-router';

class Notifications extends React.Component {
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
                this.createNotification('latePayment');
                // console.log();
            }
        });
    }

    render() {
        return (
            <div>
                <button
                    className="btn btn-danger"
                    onClick={this.createNotification('latePayment')}
                >
                    Late Payment
                </button>

                <NotificationContainer />
            </div>
        );
    }
}

export default withRouter(Notifications);
