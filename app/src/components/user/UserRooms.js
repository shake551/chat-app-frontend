import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import userToken from './UserToken';

const UserRooms = () => {
    const [rooms, setRoom] = useState([]);

    useEffect(() => {
        const header = {
            "Authorization": "jwt " + window.localStorage.getItem('access_token'),
        }

        axios.get('http://0.0.0.0:8000/api/chat/user_rooms/', {headers: header})
            .then(res => {
                console.log(res.data);
                setRoom(res.data.rooms);

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

    if (rooms.length === 0) {
        return (
            <h3>所属しているroomはありません</h3>
        )
    }
    return (
        <h3>
            room一覧
            <ul>
                {rooms.map((room) => (
                    <li key={room.room_id}>
                        <Link to={'/chat/' + room.room_id}>
                            {room.room_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </h3>
    )
}

export default UserRooms;
