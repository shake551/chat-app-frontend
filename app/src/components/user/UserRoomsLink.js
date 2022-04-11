import {Link} from 'react-router-dom';
import {AiOutlineLeft} from "react-icons/ai";
import styled from "styled-components";

function UserRoomsLink() {
    const UserLink = styled(Link)`
      color: #000;
      margin-left: 3%;
    `;

    return (
        <div>
            <UserLink to='/user/home'>
                <AiOutlineLeft size="2em"/>
            </UserLink>
        </div>
    );
}

export default UserRoomsLink;
