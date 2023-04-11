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

export function searchUser(data: SearchUserData) {
    return request({
        url: "/system/user/vague",
        baseURL,
        data,
        method: "POST"
    })
}

export function getUnitList(config: {}) {
    return request({
        url: "/report/list",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function updatePassword(config: { newPass: string; userId: string }) {
    return request({
        url: "/system/user/modifyPassword",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function delUser(config: { id: string }) {
    return request({
        url: "/system/user/delete/:id",
        baseURL,
        params: config,
        method: "DELETE"
    })
}

export function addUser(data: AddUserData) {
    return request({
        url: "/system/user/add",
        baseURL,
        data,
        method: "POST"
    })
}

export function userInfoExport(config: {}) {
    return request({
        url: "/system/user/export",
        baseURL,
        query: config,
        method: "GET",
        responseType: "blob"
    })
}
