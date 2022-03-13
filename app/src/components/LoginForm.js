import React from 'react'
import axios from 'axios'

function LoginError(props) {
  if (props.error) {
    return (
      <h3>ログインに失敗しました</h3>
    );
  }
  else {
    return(<div></div>);
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      error: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    const data = {
      name: this.state.name,
      password: this.state.password,
    };

    axios.post('http://0.0.0.0:8000/api/accounts/login/', data)
      .then(res => {
        // ローカルストレージにtokenを保存
        window.localStorage.setItem('refresh_token', res.data.token.refresh_token);
        window.localStorage.setItem('access_token', res.data.token.access_token);

        // 画面遷移
        window.location.href = '/user';
      })
      .catch(err => {
        this.setState({
          error: 1,
          name: '',
          password: '',
        });
      })
    event.preventDefault();
  }

  render() {
    return (
      <><LoginError
        error={this.state.error} />
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form></>
    );
  }
}

export default LoginForm
