const TokenService = {
    saveAuthToken(token) {
        localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, token)

    },
    saveRole(role) {
       localStorage.setItem("ROLE", role)
    },
    getRole() {
        return localStorage.getItem("ROLE")
    },
    getAuthToken() {
        return localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)
    },
    clearAuthToken() {
        localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY)
        localStorage.clear();
    },
    saveIsUpdate(value) {
        localStorage.setItem("IS_UPDATE", value)
    },
    getIsUpdate() {
        return localStorage.getItem("IS_UPDATE")
    },
    clearIsUpdate() {
        localStorage.removeItem("IS_UPDATE")
        localStorage.clear();
    },
    clearRole() {
        localStorage.removeItem("ROLE")
        localStorage.clear();
    },
    hasAuthToken() {
        return TokenService.getAuthToken()
    },
    // makeBasicAuthToken(userName, password) {
    //     return window.btoa(`${userName}:${password}`)
    // },
    // saveUserId(userId) {
    //     return window.sessionStorage.setItem('user_id', userId);
    // },
    // getUserId(user_id) {
    //     return window.sessionStorage.getItem('user_id');
    // }

}

export default TokenService