import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStoreState } from 'pullstate';
import { UserStore } from './store/UserStore';
import CheckStore from './store/CheckStore.js';

let apiLinks = require('./api/config.json');

export const Authenticate = () => {
    const User = useStoreState(UserStore, s => s.User);
    const IsAuthenticated = useStoreState(UserStore, s => s.IsAuthenticated);

    const [userID, setUserID] = useState('');
    useEffect(() => {
        let mounted = true;

        // return () => (mounted = false);
        fetchData();
    });
    async function fetchData() {
        await axios
            .get('api/secure/staff')
            .then(res => {
                // if (mounted) {
                setUserID(res.data);
                // }
            })
            .catch(err => console.log('Error code: ', err));
        await axios
            .get(apiLinks + '/' + userID)
            .then(res => {
                UserStore.update(s => {
                    s.User = res.data;
                    s.IsAuthenticated = true; // need to move later after jwtAuthentication
                });
            })
            .catch(err => console.log('Error code: ', err));
    }
    return (
        <>
            <CheckStore></CheckStore>
        </>
    );
};
