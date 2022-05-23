import React, {useState} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from "styled-components";

import SignupError from './SignupError';
import HomeBase from "../HomeBase";

const SignupFormArea = styled.form`
  text-align: center;
`;

const ButtonArea = styled.div`
  margin-top: 30px;
`;

const InputArea = styled.input`
  width: 60%;
  border-radius: 30px;
  padding: 10px;
  margin: 0.5vh 0;
  font-size: 30px;
  text-align: center;
  border: 1px solid #707070;
`;

const SignupButton = styled.input`
  width: 65%;
  border-radius: 30px;
  padding: 15px 20px;
  font-size: 30px;
  background-color: #fac46f;
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
  margin: 10px;
`;

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

        axios.post(process.env.REACT_APP_API_DOMAIN + '/api/accounts/pre_signup/', signupForm)
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

            <HomeBase/>

            <SignupFormArea onSubmit={(event) => handleSubmit(event)}>
                <label>
                    <InputArea
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={signupForm.name}
                        onChange={(event) => handleChange(event)}/>
                </label>
                <br/>
                <label>
                    <InputArea
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={signupForm.email}
                        onChange={(event) => handleChange(event)}/>
                </label>
                <br/>
                <label>
                    <InputArea
                        name="password"
                        type="text"
                        placeholder="Password"
                        value={signupForm.password}
                        onChange={(event) => handleChange(event)}/>
                </label>
                <ButtonArea>
                    <SignupButton type="submit" value="Sign Up"/>
                    <HomeLink to={'/'}>
                        <HomeLinkButton>
                            Back
                        </HomeLinkButton>
                    </HomeLink>
                </ButtonArea>
            </SignupFormArea>
        </>
    );
}

export default SignupForm;
