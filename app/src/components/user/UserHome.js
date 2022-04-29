import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import UserRooms from './UserRooms';
import userToken from './UserToken';
import UserFooter from "./UserFooter";

const UserHome = () => {
    const [user_id, setUserId] = useState('')
    const [user_name, setUserName] = useState('')

    useEffect(() => {
        const header = {
            "Authorization": "jwt " + window.localStorage.getItem('access_token'),
        }

        axios.get('http://0.0.0.0:8000/api/accounts/token/', {headers: header})
            .then(res => {
                setUserId(res.data.user.id);
                setUserName(res.data.user.name);

                const success = userToken(res.data.token);
                if (!success) {
                    throw new Error();
                }
            })
            .catch(err => {
                if (err.response.status === 403) {
                    window.location.href = '/login';
                }
            })
    })

    return (
        <div>
            <h1>User ID: {user_id}</h1>
            <h1>User Name: {user_name}</h1>
            <h3>
                <Link to={'/room/create'}>Create New Room!</Link>
            </h3>
            <UserRooms/>
            <UserFooter page={'home'}/>
        </div>
    )
}

export default UserHome;
