import React, { Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { useStoreState } from 'pullstate';
import { UserStore } from '../store/UserStore';
import { Link } from 'react-router-dom';

export default function NavItemsAuth(props) {
    //Global State
    // const User = useStoreState(UserStore, s => s.User);
    // const IsAuthenticated = useStoreState(UserStore, s => s.IsAuthenticated);
    const authLinks = (
        <Fragment>
            <NavItem>
                {/* <span className="navbar-text mr-3"> */}
                <strong>
                    {props.staff !== undefined
                        ? `Welcome ${props.staff.username}`
                        : 'UsernameNot found'}
                </strong>

                {/* </span> */}
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/logout">
                    Logout
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
