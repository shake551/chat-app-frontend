import React from 'react';
import styled from "styled-components"

import DecodeJwt from '../../util/DecodeJwt';

const MessageItemRightWrapper = styled.div`
  text-align: right;
  margin-right: 10px;
`;

const MessageItemLeftWrapper = styled.div`
  text-align: left;
  margin-left: 10px;
`;

const MessageItemStyle = styled.div`
  background-color: #faebd7;
  padding: 0.5em 1em;
  margin: 5px 0;
  font-weight: bold;
  border: solid 3px #ffefd5;
  border-radius: 10px;
  display: inline-block;
  text-align: left;
  max-width: 200px;
`;

const MessageItem = (props) => {
    const jwt = window.localStorage.getItem('access_token');
    const decoded = DecodeJwt(jwt);

    if (props.send_by === decoded.name) {
        return (
            <MessageItemRightWrapper>
                <MessageItemStyle>
                    {props.message}
                </MessageItemStyle>
            </MessageItemRightWrapper>
        )
    } else {
        return (
            <MessageItemLeftWrapper>
                <MessageItemStyle>
                    {props.message}
                </MessageItemStyle>
            </MessageItemLeftWrapper>
        )
    }
}

export default MessageItem;
