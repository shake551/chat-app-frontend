import React, { useState, useEffect } from 'react';
import axios from 'axios';

import userToken from '../UserToken';

function AllUsers() {
  const [users, setUsers] = useState([]);

  const header = {
    "Authorization": "jwt " + window.localStorage.getItem('access_token'),
  }

  useEffect(() => {
    axios.get('http://0.0.0.0:8000/api/accounts/all_users/', {headers: header})
      .then(res => {
        setUsers(res.data.users);

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

  return (
    <div>
      <ul>
        { users.map((user, i) => (
          <li key={i}>{ user.id } { user.name }</li>
        ))}
      </ul>
    </div>
  )
}

export default AllUsers;
