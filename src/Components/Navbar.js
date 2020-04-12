import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
// import { useStoreState } from "pullstate";
// import { UserStore } from "../store/UserStore.js";
import NavItemsAuth from './NavItemsAuth';
import '../Styles/Nav.css';
import Reports from '../Pages/Reports';
import { Image } from 'react-bootstrap';
import logo from '../assets/img/Uni-Verse.png';

// Navbar component
class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            stats: {},
        };
    }

    componentDidMount = () => {};

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    // returns what to render based on the role of the staff member logged in.
    roleHandler() {
        var ad;
        {
            this.props.staff !== undefined
                ? (ad = `${this.props.staff.staffType}`)
                : (ad = 'undefined');
        }
        if (ad === 'TravelAdvisor') {
            return (
                <Nav>
                    <NavItem>
                        <NavLink tag={Link} to="/customers">
                            Customers
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/reports">
                            Reports
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/exchange-rates">
                            Exchange Rates
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/sale">
                            Sell Ticket
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/sales">
                            Sales
                        </NavLink>
                    </NavItem>
                    <NavItemsAuth
                        isAuthenticated={this.props.isAuthenticated}
                        staff={this.props.staff}
                    ></NavItemsAuth>
                </Nav>
            );
        } else if (ad === 'SystemAdministrator') {
            return (
                <Nav>
                    <NavItem>
                        <NavLink tag={Link} to="/reports">
                            Reports
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/blanks">
                            Blanks
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/backup-restore">
                            Backup-Restore
                        </NavLink>
                    </NavItem>
                    <NavItemsAuth
                        isAuthenticated={this.props.isAuthenticated}
                        staff={this.props.staff}
                    ></NavItemsAuth>
                </Nav>
            );
        } else if (ad === 'OfficeManager') {
            return (
                <Nav>
                    <NavItem>
                        <NavLink tag={Link} to="/customers">
                            Customers
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/advisors">
                            Advisors
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/registerStaff">
                            Register Staff/Commission
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/reports">
                            Reports
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/blanks">
                            Blanks
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/exchange-rates">
                            Exchange Rates
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/sales">
                            Sales
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/latePayments">
                            Late Payments
                        </NavLink>
                    </NavItem>

                    <NavItemsAuth
                        isAuthenticated={this.props.isAuthenticated}
                        staff={this.props.staff}
                    ></NavItemsAuth>
                </Nav>
            );
        } else {
            return (
                <Nav>
                    <NavItemsAuth
                        isAuthenticated={this.props.isAuthenticated}
                        staff={this.props.staff}
                    ></NavItemsAuth>
                </Nav>
            );
        }
    }

    // Render the navbar.
    render() {
        return (
            <Navbar className="Navigation" light expand="md">
                <NavbarToggler onClick={this.toggle} />
                <NavbarBrand href="/">
                    <Image
                        src={logo}
                        alt="Uni-Verse Tech"
                        width="130"
                        fluid
                    ></Image>
                </NavbarBrand>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {}
                        {}
                        {this.roleHandler()}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
