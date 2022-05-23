import React, {useEffect} from 'react';
import axios from 'axios';

import UserRooms from './UserRooms';
import userToken from './UserToken';
import UserFooter from "./UserFooter";

const UserHome = () => {
    useEffect(() => {
        const header = {
            "Authorization": "jwt " + window.localStorage.getItem('access_token'),
        }

        axios.get(process.env.REACT_APP_API_DOMAIN + '/api/accounts/token/', {headers: header})
            .then(res => {
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
    }, []);

    return (
        <div>
            <UserRooms/>
            <UserFooter page={'home'}/>
        </div>
    )
}

export default UserHome;
