import { baseURL, request } from "./index"

export function getAllUser(config: {}) {
    return request({
        url: "/system/user/list",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function queryUserInfo(config: { account: string }) {
    return request({
        url: "/system/user/queryByAccount{account}",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function updateUserInfo(data: UpdateUserInfoData) {
    return request({
        url: "/system/user/update",
        baseURL,
        data,
        method: "PUT"
    })
}

export function searchUserInfo(data: SearchUserInfoData) {
    return request({
        url: "/system/user/vague",
        baseURL,
        data,
        method: "POST"
    })
}

