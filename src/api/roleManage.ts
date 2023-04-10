import { baseURL, request } from "./index"

export function getAllRoles(config: {}) {
    return request({
        url: "/system/role/list",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function addRole(data: AddRoleData) {
    return request({
        url: "/system/role/add",
        baseURL,
        data,
        method: "POST"
    })
}

export function delRole(config: { id: string }) {
    return request({
        url: "/system/role/delete2",
        baseURL,
        query: config,
        method: "DELETE"
    })
}

export function searchRole(data: SearchRoleData) {
    return request({
        url: "/system/role/vague",
        baseURL,
        data,
        method: "POST"
    })
}

export function AssignMultiUsers(data: AssignMultiUsersData) {
    return request({
        url: "/system/user/distributeRole2",
        baseURL,
        data,
        method: "POST"
    })
}

export function AssignPermission(data: AssignPermissionsData) {
    return request({
        url: "/system/role/distributePSet",
        baseURL,
        data,
        method: "PUT"
    })
}
