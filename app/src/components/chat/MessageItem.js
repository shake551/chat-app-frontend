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

const MessageItemBaseStyle = styled.div`
  padding: 0.5em 1em;
  margin: 5px 0;
  font-weight: bold;
  border: solid 1px #000;
  border-radius: 20px;
  display: inline-block;
  text-align: left;
  max-width: 200px;
`;

const MessageRightItemStyle = styled(MessageItemBaseStyle)`
  background-color: #dcdcdc;
`;

const MessageLeftItemStyle = styled(MessageItemBaseStyle)`
  background-color: #FFF;
`;

const MessageItem = (props) => {
    const jwt = window.localStorage.getItem('access_token');
    const decoded = DecodeJwt(jwt);

    if (props.send_by === decoded.name) {
        return (
            <MessageItemRightWrapper>
                <MessageRightItemStyle>
                    {props.message}
                </MessageRightItemStyle>
            </MessageItemRightWrapper>
        )
    } else {
        return (
            <MessageItemLeftWrapper>
                <MessageLeftItemStyle>
                    {props.message}
                </MessageLeftItemStyle>
            </MessageItemLeftWrapper>
        )
    }
}

export default MessageItem;
