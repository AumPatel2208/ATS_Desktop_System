import React, { Component } from 'react';
import {
    Container,
    Form,
    FormLabel,
    FormGroup,
    FormControl,
    Button,
    Dropdown,
} from 'react-bootstrap';
import axios from 'axios';

// Edit a sale to either pay for it or to refund it.
export default class SaleEditor extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        sale: {},
    };
    componentDidMount() {
        let mounted = true;

        axios
            .get(
                'http://localhost:5000/api/sales/' + this.props.match.params.id
            )
            .then((res) => {
                if (mounted) {
                    const tempSale = res.data;
                    console.log(res);

                    this.setState({ sale: tempSale });
                }
            })
            .catch((err) => console.log('Error code: ', err));
        return () => (mounted = false);
    }
    handleSubmit(e) {
        e.preventDefault();
        axios
            .put('/api/sales/pay/' + this.state.sale._id, this.state.sale)
            .then((res) => {
                alert('Payed. Res: ', res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Render the forms.
    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="currency" bssize="large">
                        <FormLabel>currency</FormLabel>
                        <FormControl
                            autoFocus
                            type="currency"
                            value={this.state.sale.currency}
                            onChange={(e) => {
                                var tempSale = this.state.sale;
                                tempSale.currency = e.target.value;
                                this.setState({
                                    sale: tempSale,
                                });
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="USDExchangeRate" bssize="large">
                        <FormLabel>USDExchangeRate</FormLabel>
                        <FormControl
                            autoFocus
                            type="USDExchangeRate"
                            value={this.state.sale.USDExchangeRate}
                            onChange={(e) => {
                                var tempSale = this.state.sale;
                                tempSale.USDExchangeRate = e.target.value;
                                this.setState({
                                    sale: tempSale,
                                });
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="paymentMethod" bssize="large">
                        <FormLabel>paymentMethod</FormLabel>
                        <Dropdown
                            onSelect={(key) => {
                                this.setState({
                                    sale: {
                                        ...this.state.sale,
                                        paymentMethod: key,
                                    },
                                });
                            }}
                        >
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {this.state.sale.paymentMethod}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Cash">
                                    Cash
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="CreditCard">
                                    Credit card
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FormGroup>

                    <FormGroup controlId="creditCardNum" bssize="large">
                        <FormLabel>creditCardNum</FormLabel>
                        <FormControl
                            autoFocus
                            type="creditCardNum"
                            value={this.state.sale.creditCardNum}
                            onChange={(e) => {
                                var tempSale = this.state.sale;
                                tempSale.creditCardNum = e.target.value;
                                this.setState({
                                    sale: tempSale,
                                });
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="expDate" bssize="large">
                        <FormLabel>expDate</FormLabel>
                        <FormControl
                            autoFocus
                            type="date"
                            value={this.state.sale.expDate}
                            onChange={(e) => {
                                var tempSale = this.state.sale;
                                tempSale.expDate = e.target.value;
                                this.setState({
                                    sale: tempSale,
                                });
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="securityCode" bssize="large">
                        <FormLabel>securityCode</FormLabel>
                        <FormControl
                            autoFocus
                            type="securityCode"
                            value={this.state.sale.securityCode}
                            onChange={(e) => {
                                var tempSale = this.state.sale;
                                tempSale.securityCode = e.target.value;
                                this.setState({
                                    sale: tempSale,
                                });
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="paymentDate" bssize="large">
                        <FormLabel>paymentDate</FormLabel>
                        <FormControl
                            autoFocus
                            type="date"
                            value={this.state.sale.paymentDate}
                            onChange={(e) => {
                                var tempSale = this.state.sale;
                                tempSale.paymentDate = e.target.value;
                                this.setState({
                                    sale: tempSale,
                                });
                            }}
                        />
                    </FormGroup>
                    <Button block bssize="large" type="submit">
                        'PAY'
                    </Button>
                </Form>
            </Container>
        );
    }
}
