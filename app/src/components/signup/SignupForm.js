import React, {useState} from "react";
import axios from 'axios';

import SignupError from './SignupError';

const SignupForm = () => {
    const [signupForm, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(0);

    const handleChange = (event) => {
        const area_name = event.target.name;
        const value = event.target.value;

        setForm({...signupForm, [area_name]: value});
    }

    const handleSubmit = (event) => {
        if (!signupForm.name || !signupForm.email || !signupForm.password) {
            setError(1);
            event.preventDefault();
            return;
        }

        axios.post('http://0.0.0.0:8000/api/accounts/pre_signup/', signupForm)
            .then(res => {
                window.location.href = '/complete';
            })
            .catch(err => {
                setError(1);
                setForm({
                    name: '',
                    email: '',
                    password: ''
                });
            })
        event.preventDefault();
    }

    return (
        <><SignupError
            error={error}/>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label>
                    Name:
                    <input
                        name="name"
                        type="text"
                        value={signupForm.name}
                        onChange={(event) => handleChange(event)}/>
                </label>
                <br/>
                <label>
                    Email:
                    <input
                        name="email"
                        type="email"
                        value={signupForm.email}
                        onChange={(event) => handleChange(event)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input
                        name="password"
                        type="text"
                        value={signupForm.password}
                        onChange={(event) => handleChange(event)}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </>
    );
}

export default SignupForm;
