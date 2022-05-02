import React, {useState, useEffect} from 'react';
import styled from "styled-components";

import DecodeJwt from "../../util/DecodeJwt";
import UserFooter from "./UserFooter";

const ProfileWrapper = styled.div`
  text-align: center;
`;

const Profile = styled.img`
  width: 50vw;
`;

const UserName = styled.h1`
  text-align: center;
  font-size: 50px;
`;

const UserId = styled.h1`
  text-align: center;
`;

const UserProfile = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const jwt = window.localStorage.getItem('access_token');
        const decoded = DecodeJwt(jwt);

        setUser({
            id: decoded.userid,
            name: decoded.name
        })
    }, []);

    return (
        <div>
            <ProfileWrapper>
                <Profile src={`${process.env.PUBLIC_URL}/profile.png`} alt="profile"/>
            </ProfileWrapper>
            <UserName>{user.name}</UserName>
            <UserId>User ID: {user.id}</UserId>

            <UserFooter page={'profile'}/>
        </div>
    )
}

export default UserProfile;
