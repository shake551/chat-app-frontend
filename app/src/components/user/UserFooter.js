import React from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {AiFillMessage, AiOutlineMessage} from 'react-icons/ai';
import {FaRegUserCircle, FaUserCircle} from "react-icons/fa";

const UserFooterStyle = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 3em;
  text-align: center;
  display: flex;
  justify-content: space-around;
`;

const LinkIcon = styled(Link)`
  color: #000;
`;

const UserFooter = (props) => {
    if (props.page === 'home') {
        return (
            <UserFooterStyle>
                <LinkIcon to={'/user/profile'}>
                    <FaRegUserCircle size={'3em'}/>
                </LinkIcon>
                <AiFillMessage size={'3em'}/>
            </UserFooterStyle>
        )
    } else if (props.page === 'profile') {
        return (
            <UserFooterStyle>
                <FaUserCircle size={'3em'}/>
                <LinkIcon to={'/user/home'}>
                    <AiOutlineMessage size={'3em'}/>
                </LinkIcon>
            </UserFooterStyle>
        )
    } else {
        return <></>
    }
}

export default UserFooter;
