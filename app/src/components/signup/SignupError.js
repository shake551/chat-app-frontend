import styled from "styled-components";

const ErrorDisplay = styled.div`
  text-align: center;
  color: #ff0000;
  background-color: #fccfcf;
  border: 1px solid #ff0000;
  border-radius: 20px;
  margin: 10px;
`;

const SignupError = (props) => {
    if (props.error) {
        return (
            <ErrorDisplay>
                <h3>サインアップに失敗しました</h3>
            </ErrorDisplay>
        );
    } else {
        return (<span/>)
    }
}

export default SignupError;
