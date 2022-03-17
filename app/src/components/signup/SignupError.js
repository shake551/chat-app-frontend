
function SignupError(props) {
  if (props.error) {
    return (
      <h3>サインアップに失敗しました</h3>
    );
  }
  else {
    return (<span></span>)
  }
}

export default SignupError
