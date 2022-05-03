function LoginError(props) {
    if (props.error) {
        return (
            <h3>ログインに失敗しました</h3>
        );
    } else {
        return (<div/>);
    }
}

export default LoginError;
