import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import HomeBase from "../HomeBase";

const VerifyWrapper = styled.div`
  text-align: center;
`;

const ButtonArea = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const LinkButton = styled(Link)`
  width: 65%;
`;

const ButtonBase = styled.button`
  width: 65%;
  border-radius: 30px;
  padding: 15px 20px;
  font-size: 30px;
  margin: 20px;
`;

const LoginButton = styled(ButtonBase)`
  background-color: #fff;
  color: #707070;
  border: 1px solid #707070;
`;

const HomeLinkButton = styled(ButtonBase)`
  background-color: #707070;
  color: #fff;
  border: 1px solid #fff;
`;

const Message = styled.p`
  font-size: 25px;
  margin: 30px;
  line-height: 2;
`;

const VerifyUser = () => {
    const [isError, setError] = useState(false);

    useEffect(() => {
        let token;
        try {
            token = window.location.pathname
                .match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)[0];
        } catch (e) {
            if (!token) {
                window.location.href = '../signup';
            }
        }

        axios.get(process.env.REACT_APP_API_DOMAIN + '/api/accounts/verify?token=' + token)
            .then(() => {
            })
            .catch((err) => {
                setError(true);
            });
    });

    if (isError) {
        return (
            <div>
                <HomeBase/>
                <VerifyWrapper>
                    <Message>本登録できませんでした</Message>
                    <ButtonArea>
                        <LinkButton to={'/signup'}>
                            <LoginButton>
                                Sign Up
                            </LoginButton>
                        </LinkButton>
                        <LinkButton to={'/'}>
                            <HomeLinkButton>
                                Home
                            </HomeLinkButton>
                        </LinkButton>
                    </ButtonArea>
                </VerifyWrapper>
            </div>
        );
    }

    return (
        <div>
            <HomeBase/>
            <VerifyWrapper>
                <Message>本登録が完了しました</Message>
                <ButtonArea>
                    <LinkButton to={'/login'}>
                        <LoginButton>
                            Login
                        </LoginButton>
                    </LinkButton>
                    <LinkButton to={'/'}>
                        <HomeLinkButton>
                            Home
                        </HomeLinkButton>
                    </LinkButton>
                </ButtonArea>
            </VerifyWrapper>
        </div>
    )
}

export default VerifyUser;
