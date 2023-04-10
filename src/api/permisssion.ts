import { request, baseURL } from "./index"

export function getPermissionTree(config: { parentId: string }) {
    return request({
        url: "/system/permission/list/:parentId",
        baseURL,
        params: config,
        method: "GET"
    })
}
