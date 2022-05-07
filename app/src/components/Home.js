import {Link} from 'react-router-dom';
import styled from "styled-components";

import HomeBase from "./HomeBase";

const ButtonArea = styled.div`
  margin-top: 100px;
  text-align: center;
`;

const LinkBase = styled(Link)`
  width: 65%;
`;

const ButtonBase = styled.button`
  width: 65%;
  border-radius: 30px;
  padding: 15px 20px;
  font-size: 30px;
`;

const SignupButton = styled(ButtonBase)`
  background-color: #fac46f;
  color: #707070;
  border: 1px solid #707070;
`;

const LoginButton = styled(ButtonBase)`
  background-color: #fff;
  color: #707070;
  border: 1px solid #707070;
  margin: 20px;
`;

function Home() {
    return (
        <div>
            <HomeBase/>
            <ButtonArea>
                <LinkBase to={'/signup'}>
                    <SignupButton>
                        Sign Up
                    </SignupButton>
                </LinkBase>
                <LinkBase to={'/login'}>
                    <LoginButton>
                        Login
                    </LoginButton>
                </LinkBase>
            </ButtonArea>
        </div>
    );
}

export default Home;
