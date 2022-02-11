import React, { useState, useEffect } from 'react';

const Message = () => {
  const [messages, setMessage] = useState([]);
  const [value, setValue] = useState('');

  const roomName = window.location.pathname;

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
      data.message
    ]);
  }

  console.log(chatSocket);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    setMessage([
      ...messages,
      value
    ]);

    try {
      console.log('try')
      chatSocket.send(JSON.stringify({
        'message': value
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
          <li key={i}>{message}</li>
        ))}
      </ul>
    </div>
  )
}

export default Message;