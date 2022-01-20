import React from 'react'
import axios from 'axios'

class LoginUser extends React.Component {
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
        console.log(res.data);
        this.setState({
          user_id: res.data.user.id,
          user_name: res.data.user.name,
        });
      })
      .catch(err => {
        window.location.href = '/login';
      })
  }

  render() {
    return (
      <div>
        <h1>User ID: {this.state.user_id}</h1>
        <h1>User Name: {this.state.user_name}</h1>
      </div>
    )
  }
}


export default LoginUser