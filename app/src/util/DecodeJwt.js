/**
 * JWTトークンをデコードする
 * @param {String} token JWTトークン
 * @returns
 */
function DecodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
}

export default DecodeJwt;
