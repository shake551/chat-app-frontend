import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import {AiOutlineSend} from "react-icons/ai";

import userToken from '../user/UserToken';
import UserRoomsLink from '../user/UserRoomsLink';
import DecodeJwt from '../../util/DecodeJwt';
import MessageItem from './MessageItem';

const Header = styled.div`
  background-color: #FAC46F;
  width: 100%;
  padding: 3vh 0;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

const MessageArea = styled.div`
  padding: 3px;
  margin: 10px;
  height: 70vh;
  overflow: scroll;
`;

const MessageForm = styled.form`
  text-align: center;
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-around;
`;

const MessageTextArea = styled.textarea`
  width: 75%;
  border-radius: 15px;
  padding: 10px;
  margin: 2vh 0 1vh 0;
`;

const SubmitButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 2vh 0 1vh 0;
`;

const MessageList = () => {
    const [messages, setMessage] = useState([]);
    const [value, setValue] = useState('');
    const [room, setRoom] = useState('');

    const roomName = window.location.pathname;
    const roomId = roomName.split('/')[2];

    const chatSocket = new WebSocket(
        'ws://0.0.0.0:8000/ws'
        + roomName
        + '/'
    )

    chatSocket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log(data);
        setMessage([
            ...messages,
            [data.message, data.user]
        ]);
    }

    chatSocket.onerror = function (event) {
        window.location.reload();
    }

    console.log(chatSocket);

    const header = {
        "Authorization": "jwt " + window.localStorage.getItem('access_token'),
    }

    const api_domain = process.env.REACT_APP_API_DOMAIN;

    useEffect(() => {
        axios.get(api_domain + '/api/chat/room/' + roomId, {headers: header})
            .then(res => {
                let getMessages = [];
                res.data.messages.map((data) => {
                    getMessages.push([data.message, data.user]);
                });

                // getしたメッセージをデフォルトにする
                setMessage(getMessages);

                setRoom({
                    'id': res.data.room.room_id,
                    'name': res.data.room.name
                })

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
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        const jwt = window.localStorage.getItem('access_token');
        const decoded = DecodeJwt(jwt);

        const data = {
            user_id: decoded.userid,
            room_id: roomId,
            message: value
        }

        axios.post(api_domain + '/api/chat/post/', data, {headers: header})
            .then(res => {
                console.log(res.data);
            })
            .catch(e => {
                window.location.reload();
            })

        setMessage([
            ...messages,
            [value, decoded.name]
        ]);
        console.log(messages);

        try {
            chatSocket.send(JSON.stringify({
                'message': value,
                'user': decoded.name
            }));
        } catch (e) {
            console.log(e)
        }
        setValue('');
        event.preventDefault();
    }

    return (
        <div>
            <Header>
                {room.name}
            </Header>
            <MessageArea>
                {messages.map((message, i) => (
                    <MessageItem
                        key={i}
                        message={message[0]}
                        send_by={message[1]}
                    />
                ))}
            </MessageArea>
            <MessageForm onSubmit={handleSubmit}>
                <MessageTextArea
                    name="message"
                    rows="1"
                    value={value}
                    onChange={handleChange}/>

                <SubmitButton type="submit">
                    <AiOutlineSend size="2.5em"/>
                </SubmitButton>
            </MessageForm>
            <UserRoomsLink/>
        </div>
    )
}

export default MessageList;
