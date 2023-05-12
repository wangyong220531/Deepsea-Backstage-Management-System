import { request, baseURL } from "./index"

export function getCaptcha(config: { param: string }) {
    return request({
        url: "/captcha2/mobileCaptcha",
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