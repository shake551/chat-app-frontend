import React, {useState, useEffect} from 'react';

import DecodeJwt from "../util/DecodeJwt";

const UserProfile = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const jwt = window.localStorage.getItem('access_token');
        const decoded = DecodeJwt(jwt);

        setUser({
            id: decoded.userid,
            name: decoded.name
        })
    }, []);

    return (
        <div>
            <h1>User ID: {user.id}</h1>
            <h1>User Name: {user.name}</h1>
        </div>
    )
}

export default UserProfile;
