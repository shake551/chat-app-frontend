import styled from "styled-components";
import HomeBase from "../HomeBase";

const CompleteMessage = styled.p`
  font-size: 25px;
  margin: 70px 30px;
  line-height: 2;
`;

const SignupComplete = () => {
    return (
        <div>
            <HomeBase/>
            <CompleteMessage>
                仮登録が完了しました．ご登録のメールアドレスにメールを送信しました．
                添付されているURLにアクセスし、本登録を完了してください．
            </CompleteMessage>
        </div>
    );
}

export default SignupComplete;
