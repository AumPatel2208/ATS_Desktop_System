import React, { Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

// Returns the Nav items to be renered based on wether the user is authenticated or now
export default function NavItemsAuth(props) {
    const authLinks = (
        <Fragment>
            <NavItem>
                <NavLink tag={Link} to="/logout">
                    Logout
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                    <strong>
                        {props.staff !== undefined
                            ? `Welcome ${props.staff.username.toUpperCase()}`
                            : 'UsernameNot found'}
                    </strong>
                </NavLink>
            </NavItem>
        </Fragment>
    );
    const guestLinks = (
        <NavItem>
            <NavLink tag={Link} to="/login">
                Login
            </NavLink>
        </NavItem>
    );
    return (
        <Fragment>{props.isAuthenticated ? authLinks : guestLinks}</Fragment>
    );
}
