import React, { useState, useEffect } from 'react';
import axios from 'axios';

import userToken from '../UserToken';
import UserRoomsLink from '../UserRoomsLink';

const Message = () => {
  const [messages, setMessage] = useState([]);
  const [value, setValue] = useState('');

  const roomName = window.location.pathname;
  const roomId = roomName.split('/')[2];

  const chatSocket = new WebSocket(
    'ws://0.0.0.0:8000/ws'
    + roomName
    + '/'
  )

  chatSocket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log(data);
    setMessage([
      ...messages,
      [data.message, data.send_user]
    ]);
  }

  chatSocket.onerror = function(event) {
    window.location.reload();
  }

  console.log(chatSocket);

  const header = {
    "Authorization": "jwt " + window.localStorage.getItem('access_token'),
  }

  useEffect(() => {
    axios.get('http://0.0.0.0:8000/api/chat/room/' + roomId, {headers: header})
      .then(res => {
        let getMessages = [];
        res.data.messages.map((data) => {
          getMessages.push([data.message, data.send_user]);
        });

        // getしたメッセージをデフォルトにする
        setMessage(getMessages);

        const success = userToken(res.data.token);
        if (!success) {
          throw new Error();
        }
      })
      .catch(err => {
        if (err.response.status == 403) {
          window.location.href = '/login';
        }
      })
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const decodeJwt = (token) => {                                        
    const base64Url = token.split('.')[1];                             
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');    
    return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
  }; 

  const handleSubmit = (event) => {
    const jwt = window.localStorage.getItem('access_token');
    const decoded = decodeJwt(jwt);

    const data = {
      user_id: decoded.userid,
      room_id: roomId,
      msg: value
    }

    axios.post('http://0.0.0.0:8000/api/chat/post/', data, {headers: header})
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
        'send_user': decoded.name
      }));
    }
    catch(e) {
      console.log(e)
    }
    setValue('');
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
            <label>
              Message:
              <input
                name="message"
                type="text"
                value={value}
                onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message[0]} [ {message[1]} ]</li>
        ))}
      </ul>
      <UserRoomsLink />
    </div>
  )
}

export default Message;
