
/**
 * トークンセットからローカルストレージに保存する
 * @param {Object} token_set access_token、refresh_token
 * @returns 成功判定(0:false, 1:true)
 */
function userToken(token_set) {
  if (!(token_set.access_token && token_set.refresh_token)) {
    return 0;
  }

  window.localStorage.setItem('refresh_token', token_set.refresh_token);
  window.localStorage.setItem('access_token', token_set.access_token);
  return 1;
}

export default userToken;
