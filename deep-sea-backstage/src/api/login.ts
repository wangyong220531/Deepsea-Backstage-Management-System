import { request, baseURL } from "./index"

export function getCaptcha(config: { userNo: string }) {
    return request({
        url: "/captcha2",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function login(data: LoginData) {
    return request({
        url: "/login",
        baseURL,
        data,
        method: "POST",
    })
}


export function logoutQuery(config: {}){
    return request({
        url:"/logout",
        baseURL,
        query:config,
        method:"GET"
    })
}