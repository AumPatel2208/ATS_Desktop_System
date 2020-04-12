import React, { useRef, Component, Fragment } from 'react';
import { Container } from 'reactstrap';
import { Image, Row, Col, Button, Jumbotron } from 'react-bootstrap';
import logo from '../assets/img/Uni-Verse.png';
import { withRouter } from 'react-router';

// Home page, displays the buttons appropriate for the pages the certain roles can access.
class Home extends Component {
    roleHandler() {
        if (this.props.isAuthenticated) {
            if (this.props.staff.staffType === 'OfficeManager') {
                return (
                    <Fragment>
                        <Row>
                            <Col>
                                {' '}
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/customers');
                                    }}
                                    block
                                >
                                    Customers
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="warning"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/advisors');
                                    }}
                                    block
                                >
                                    Advisors
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push(
                                            '/registerStaff'
                                        );
                                    }}
                                    block
                                >
                                    Register Staff/Commission
                                </Button>{' '}
                            </Col>
                        </Row>

                        <br></br>

                        <Row>
                            <Col>
                                {' '}
                                <Button
                                    variant="warning"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/reports');
                                    }}
                                    block
                                >
                                    Reports
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/blanks');
                                    }}
                                    block
                                >
                                    Blanks
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="warning"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push(
                                            '/exchange-rates'
                                        );
                                    }}
                                    block
                                >
                                    Exchange Rates
                                </Button>{' '}
                            </Col>
                        </Row>
                        <br></br>

                        <Row>
                            <Col>
                                {' '}
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/sales');
                                    }}
                                    block
                                >
                                    Sales
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="warning"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push(
                                            '/latePayments'
                                        );
                                    }}
                                    block
                                >
                                    Late Payments
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="outline-danger"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/logout');
                                    }}
                                    block
                                >
                                    Logout
                                </Button>{' '}
                            </Col>
                        </Row>
                    </Fragment>
                );
            } else if (this.props.staff.staffType === 'SystemAdministrator') {
                return (
                    <Fragment>
                        <Row>
                            <Col>
                                {' '}
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/reports');
                                    }}
                                    block
                                >
                                    Reports
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="warning"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/blanks');
                                    }}
                                    block
                                >
                                    Blanks
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push(
                                            '/backup-restore'
                                        );
                                    }}
                                    block
                                >
                                    Backup-Restore
                                </Button>{' '}
                            </Col>
                        </Row>

                        <br></br>

                        <Row>
                            <Col></Col>
                            <Col></Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="outline-danger"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/logout');
                                    }}
                                    block
                                >
                                    Logout
                                </Button>{' '}
                            </Col>
                        </Row>
                    </Fragment>
                );
            } else if (this.props.staff.staffType === 'TravelAdvisor') {
                return (
                    <Fragment>
                        <Row>
                            <Col>
                                {' '}
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/customers');
                                    }}
                                    block
                                >
                                    Customers
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="warning"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/reports');
                                    }}
                                    block
                                >
                                    Reports
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push(
                                            '/exchange-rates'
                                        );
                                    }}
                                    block
                                >
                                    Exchange Rates
                                </Button>{' '}
                            </Col>
                        </Row>

                        <br></br>

                        <Row>
                            <Col>
                                {' '}
                                <Button
                                    variant="warning"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/sale');
                                    }}
                                    block
                                >
                                    Sell Ticket
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/sales');
                                    }}
                                    block
                                >
                                    Sales
                                </Button>{' '}
                            </Col>
                            <Col>
                                {' '}
                                <Button
                                    variant="outline-danger"
                                    size="lg"
                                    onClick={() => {
                                        this.props.history.push('/logout');
                                    }}
                                    block
                                >
                                    Logout
                                </Button>{' '}
                            </Col>
                        </Row>
                    </Fragment>
                );
            }
        } else {
            return (
                <Button
                    variant="outline-primary"
                    size="lg"
                    onClick={() => {
                        this.props.history.push('/login');
                    }}
                    block
                >
                    Login
                </Button>
            );
        }
    }

    // Renders them
    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Image src={logo} fluid></Image>
                    </Col>
                    <Col></Col>
                </Row>
                <br></br>
                <br></br>
                <Jumbotron>{this.roleHandler()}</Jumbotron>
            </Container>
        );
    }
}

export default withRouter(Home);
