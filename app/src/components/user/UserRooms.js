import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import {AiOutlinePlus} from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroller";

import userToken from './UserToken';

const RoomLinkWrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 85vh;
  overflow-y: scroll;
`;

const RoomLink = styled(Link)`
  display: inline-flex;
  vertical-align: top;
  text-decoration: none;
`;

const RoomLinkButton = styled.button`
  display: table;
  background-color: #fff;
  border-color: #000;
  border-radius: 30px;
  width: 150px;
  height: 150px;
  margin: 10px;
  padding: 10px;
  overflow-wrap: break-word;
`;

const RoomLinkElement = styled.div`
  font-size: 20px;
`;

const UserRooms = () => {
    const loadCount = 20;

    const [rooms, setRoom] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = () => {
        const header = {
            "Authorization": "jwt " + window.localStorage.getItem('access_token'),
        }

        axios.get(process.env.REACT_APP_API_DOMAIN + '/api/chat/user_rooms/?start=' + rooms.length + '&size=' + loadCount, {headers: header})
            .then(res => {
                console.log(res.data);
                setRoom(rooms.concat(res.data.rooms));

                if (res.data.rooms.length < loadCount) {
                    setHasMore(false);
                }

                const success = userToken(res.data.token);
                if (!success) {
                    throw new Error();
                }
            })
            .catch(err => {
                if (err.response.status === 403) {
                    window.location.href = '/login';
                }
            })
    }

    const loader = <div className="loader" key={0}>Loading ...</div>;

    return (
        <RoomLinkWrapper>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={loader}
                useWindow={false}
            >
                <RoomLink to={'/room/create'} key={'new'}>
                    <RoomLinkButton>
                        <RoomLinkElement>
                            <AiOutlinePlus size={'3em'}/>
                        </RoomLinkElement>
                    </RoomLinkButton>
                </RoomLink>
                {rooms.map((room) => (
                    <RoomLink to={'/chat/' + room.room_id} key={room.room_id}>
                        <RoomLinkButton>
                            <RoomLinkElement>
                                {room.room_name}
                            </RoomLinkElement>
                        </RoomLinkButton>
                    </RoomLink>
                ))}
            </InfiniteScroll>
        </RoomLinkWrapper>
    )
}

export default UserRooms;
