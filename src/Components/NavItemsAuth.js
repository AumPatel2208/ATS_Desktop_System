import React, { Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { useStoreState } from 'pullstate';
import { UserStore } from '../store/UserStore';
import { Link } from 'react-router-dom';

export default function NavItemsAuth() {
    //Global State
    const User = useStoreState(UserStore, s => s.User);
    const IsAuthenticated = useStoreState(UserStore, s => s.IsAuthenticated);
    const authLinks = (
        <NavItem>
            <span className="navbar-text mr-3">
                <strong>{`Welcome ${User.username}`}</strong>
            </span>
        </NavItem>
    );
    const guestLinks = (
        <NavItem>
            <NavLink tag={Link} to="/login">
                Login
            </NavLink>
        </NavItem>
    );
    return <Fragment>{IsAuthenticated ? authLinks : guestLinks}</Fragment>;
}
