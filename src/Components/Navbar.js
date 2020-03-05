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

import '../Styles/Nav.css';
import logo from '../assets/img/Uni-Verse Logo Straight.png';

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
                            <NavLink tag={Link} to="/collections">
                                Collections
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/login">
                                Login
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Navigation;