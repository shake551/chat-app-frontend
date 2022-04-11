import React from "react";
import axios from 'axios';

import SignupError from './SignupError';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
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
            email: this.state.email,
            password: this.state.password,
        };

        axios.post('http://0.0.0.0:8000/api/accounts/pre_signup/', data)
            .then(res => {
                window.location.href = '/complete';
            })
            .catch(err => {
                this.setState({
                    error: 1,
                    name: '',
                    email: '',
                    password: '',
                });
            })
        event.preventDefault();
    }

    render() {
        return (
            <><SignupError
                error={this.state.error}/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Email:
                        <input
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input
                            name="password"
                            type="text"
                            value={this.state.password}
                            onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </>
        )
    }
}

export default SignupForm;
