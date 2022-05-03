import React, {useState} from 'react';
import axios from 'axios';

import LoginError from "./LoginError";
import userToken from "../user/UserToken";

const LoginForm = () => {
    const [loginForm, setForm] = useState({
        name: '',
        password: ''
    });
    const [error, setError] = useState(0);

    const handleChange = (event) => {
        const area_name = event.target.name;
        const value = event.target.value;

        setForm({...loginForm, [area_name]: value});
    }

    const handleSubmit = (event) => {
        axios.post('http://0.0.0.0:8000/api/accounts/login/', loginForm)
            .then(res => {
                const success = userToken(res.data.token);
                if (!success) {
                    throw new Error();
                }

                // 画面遷移
                window.location.href = '/user/home';
            })
            .catch(err => {
                setError(1);
                setForm({
                    name: '',
                    password: ''
                });
            })
        event.preventDefault();
    }

    return (
        <><LoginError
            error={error}/>
            <form onSubmit={(event ) => handleSubmit(event)}>
                <label>
                    Name:
                    <input
                        name="name"
                        type="text"
                        value={loginForm.name}
                        onChange={(event) => handleChange(event)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input
                        name="password"
                        type="text"
                        value={loginForm.password}
                        onChange={(event) => handleChange(event)}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </>
    );
}

export default LoginForm;
