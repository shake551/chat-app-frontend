import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

const VerifyUser = () => {
    const [isVerify, setVerify] = useState(false);
    const [isError, setError] = useState(false);

    useEffect(() => {
        let token;
        try {
            token = window.location.pathname
                .match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)[0];
        } catch (e) {
            if (!token) {
                window.location.href = '../signup';
            }
        }

        axios.get('http://0.0.0.0:8000/api/accounts/verify?token=' + token)
            .then(() => {
                setVerify(true);
            })
            .catch((err) => {
                setError(true);
            });
    })

    let verify = '';
    if (isVerify) {
        verify = <div><h2>本登録が完了しました</h2><Link to='../login'>ログインする</Link></div>;
    }

    let error = '';
    if (isError) {
        error = <div>なんらかの理由で本登録できませんでした</div>
    }

    return (
        <div>
            <h1>ユーザー本登録ページ</h1>
            {verify}
            {error}
        </div>
    )
}

export default VerifyUser;
