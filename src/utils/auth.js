const TOKEN_PREFIX = "ANT-TOKEN"

export function getToken(){
    return localStorage.getItem(TOKEN_PREFIX)
}

export function setToken(token){
    return localStorage.setItem(TOKEN_PREFIX,token)
}

export function removeToken(){
    return localStorage.removeItem(TOKEN_PREFIX)
}