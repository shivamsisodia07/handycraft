import config from '../config'

const TokenService = {
    saveAuthToken(token) {
        window.sessionStorage.setItem(config.TOKEN_KEY, token)

    },
    saveRole(role) {
        window.sessionStorage.setItem("ROLE", role)
    },
    getRole() {
        return window.sessionStorage.getItem("ROLE")
    },
    getAuthToken() {
        return window.sessionStorage.getItem(config.TOKEN_KEY)
    },
    clearAuthToken() {
        window.sessionStorage.removeItem(config.TOKEN_KEY)
        sessionStorage.clear();
    },
    saveIsUpdate(value) {
        window.sessionStorage.setItem("IS_UPDATE", value)
    },
    getIsUpdate() {
        return window.sessionStorage.getItem("IS_UPDATE")
    },
    clearIsUpdate() {
        window.sessionStorage.removeItem("IS_UPDATE")
        sessionStorage.clear();
    },
    clearRole() {
        window.sessionStorage.removeItem("ROLE")
        sessionStorage.clear();
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
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