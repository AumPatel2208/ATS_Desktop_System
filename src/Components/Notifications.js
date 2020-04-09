import React from 'react';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { withRouter } from 'react-router';

class Notifications extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.sales);
    }
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
