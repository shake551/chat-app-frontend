import styled from "styled-components";
import {AiOutlineReload, AiOutlineLoading3Quarters} from "react-icons/ai";

const LoadButtonWrapper = styled.div`
  text-align: center;
`

const LoadButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

const LoadMessage = (props) => {
    if (props.isLoading) {
        return (
            <AiOutlineLoading3Quarters/>
        )
    }

    if (props.isEnd) {
        return (
            <span/>
        )
    }

    return (
        <LoadButtonWrapper>
            <LoadButton onClick={props.click}>
                <AiOutlineReload size="2em"/>
            </LoadButton>
        </LoadButtonWrapper>
    )
}

export default LoadMessage;
