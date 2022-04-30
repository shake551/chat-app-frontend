import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import UserRooms from './UserRooms';
import userToken from './UserToken';

class UserHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            user_name: '',
        }
    }

    componentDidMount() {
        const header = {
            "Authorization": "jwt " + window.localStorage.getItem('access_token'),
        }

        axios.get('http://0.0.0.0:8000/api/accounts/token/', {headers: header})
            .then(res => {
                this.setState({
                    user_id: res.data.user.id,
                    user_name: res.data.user.name,
                });

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
    }

    render() {
        return (
            <div>
                <h1>User ID: {this.state.user_id}</h1>
                <h1>User Name: {this.state.user_name}</h1>
                <h3>
                    <Link to={'/room/create'}>Create New Room!</Link>
                </h3>
                <UserRooms/>
                <Link to='/user/profile'>プロフィール</Link>
            </div>
        )
    }
}

export default UserHome;
