import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from "styled-components";

import LoginError from "./LoginError";
import userToken from "../user/UserToken";

const LoginFormArea = styled.form`
  text-align: center;
`;

const ButtonArea = styled.div`
  margin-top: 40px;
`;

const InputArea = styled.input`
  width: 60%;
  border-radius: 30px;
  padding: 10px;
  margin: 2vh 0;
  font-size: 30px;
  text-align: center;
  border: 1px solid #707070;
`;

const LoginButton = styled.input`
  width: 65%;
  border-radius: 30px;
  padding: 15px 20px;
  font-size: 30px;
  background-color: #fff;
  color: #707070;
  border: 1px solid #707070;
`;

const HomeLink = styled(Link)`
  width: 65%;
`;

const HomeLinkButton = styled.button`
  width: 65%;
  border-radius: 30px;
  padding: 15px 20px;
  font-size: 30px;
  background-color: #707070;
  color: #fff;
  border: 1px solid #fff;
  margin: 20px;
`;

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
        if (!loginForm.name || !loginForm.password) {
            setError(1);
            event.preventDefault();
            return;
        }

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
            <LoginFormArea onSubmit={(event) => handleSubmit(event)}>
                <label>
                    <InputArea
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={loginForm.name}
                        onChange={(event) => handleChange(event)}/>
                </label>
                <br/>
                <label>
                    <InputArea
                        name="password"
                        type="text"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(event) => handleChange(event)}/>
                </label>
                <br/>
                <ButtonArea>
                    <LoginButton type="submit" value="Login"/>
                    <br/>
                    <HomeLink to={'/'}>
                        <HomeLinkButton>
                            Back
                        </HomeLinkButton>
                    </HomeLink>
                </ButtonArea>
            </LoginFormArea>
        </>
    );
}

export default LoginForm;
