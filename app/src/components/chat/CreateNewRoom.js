import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";

import userToken from '../user/UserToken';
import DecodeJwt from '../../util/DecodeJwt';
import UserRoomsLink from '../user/UserRoomsLink';

const CreateRoomList = styled.ul`
  list-style: none;
`

const CreateRoomLinkButton = styled.button`
  display: table;
  background-color: #fff;
  border-color: #000;
  border-radius: 20px;
  width: 80%;
  height: 50px;
  margin: 20px;
  padding: 10px;
  overflow: hidden;
`;

const CreateRoomLinkElement = styled.div`
  font-size: 20px;
`;

function SelectNewRoom() {
    const [users, setUsers] = useState([]);

    const header = {
        "Authorization": "jwt " + window.localStorage.getItem('access_token'),
    }

    const api_domain = process.env.REACT_APP_API_DOMAIN;

    useEffect(() => {
        axios.get(api_domain + '/api/accounts/all_users/', {headers: header})
            .then(res => {
                const success = userToken(res.data.token);
                if (!success) {
                    throw new Error();
                }

                setUsers(res.data.users);
            })
            .catch(err => {
                if (err.response.status === 403) {
                    window.location.href = '/login';
                }
            })
    }, [])

    function handleClick(talkWithId, talkWithName, event) {
        const token = window.localStorage.getItem('access_token');

        const decoded = DecodeJwt(token);

        const data = {
            "room_name": talkWithName + ' + ' + decoded.name,
            "room_members": [decoded.userid, talkWithId]
        }

        const header = {
            "Authorization": "jwt " + token,
        }

        axios.post(api_domain + '/api/chat/new/', data, {headers: header})
            .then(res => {
                const success = userToken(res.data.token);
                if (!success) {
                    throw new Error();
                }

                window.location.href = '/chat/' + res.data.room.id;
            })
            .catch(err => {
                if (err.response.status === 403) {
                    window.location.href = '/login';
                }
            });

        event.preventDefault();
    }

    return (
        <div>
            <h1>トークルーム作成</h1>
            <UserRoomsLink/>
            <CreateRoomList>
                {users.map((user, i) => (
                    <li key={i}>
                        <CreateRoomLinkButton onClick={(event) => handleClick(user.id, user.name, event)}>
                            <CreateRoomLinkElement>
                                {user.name}
                            </CreateRoomLinkElement>
                        </CreateRoomLinkButton>
                    </li>
                ))}
            </CreateRoomList>
        </div>
    )
}

export default SelectNewRoom;
