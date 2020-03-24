import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
// import { useStoreState } from "pullstate";
// import { UserStore } from "../store/UserStore.js";
import NavItemsAuth from './NavItemsAuth';
import '../Styles/Nav.css';
// import logo from '../assets/img/Uni-Verse Logo Straight.png';
// const User = useStoreState(UserStore, s => s.UserType);
// const IsAuthenticated = useStoreState(UserStore, s => s.IsAuthenticated);
class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            stats: {}
        };
    }

    componentDidMount = () => {};

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <Navbar className="Navigation" light expand="md">
                <NavbarToggler onClick={this.toggle} />
                <NavbarBrand href="/">
                    <h1>ATS Air VIA</h1>
                    {/* <img src={logo} alt="Uni-Verse Tech"></img> */}
                </NavbarBrand>

                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/customers">
                                Customers
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/registerStaff">
                                Register Staff
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
                            <NavLink tag={Link} to="/backup-restore">
                                Backup-Restore
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
                        {/* <NavItem>
              <NavLink tag={Link} to="/login">
                Login
              </NavLink>
            </NavItem> */}
                        <NavItemsAuth></NavItemsAuth>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
