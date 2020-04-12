const TOKEN_PREFIX = "ANT-TOKEN"
const USER_INFO_PREFIX = "ANT-TOKEN-USER-INFO"

export function getToken(){
    return localStorage.getItem(TOKEN_PREFIX)
}

export function getLocalUserInfo(){
    return localStorage.getItem(USER_INFO_PREFIX)
}

export function setToken(token){
    return localStorage.setItem(TOKEN_PREFIX,token)
}

export function setLocalUserInfo(v){
    return localStorage.setItem(USER_INFO_PREFIX,v)
}

export function removeAll(){
    localStorage.removeItem(TOKEN_PREFIX)
    localStorage.removeItem(USER_INFO_PREFIX)
}