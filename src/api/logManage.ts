import { request, baseURL } from "./index"

export function searchLoginLog(data: SearchLoginLogData) {
    return request({
        url: "/monitor/loginLog/query",
        baseURL,
        data,
        method: "POST"
    })
}

export function searchOperateLog(data: SearchOperateLogData) {
    return request({
        url: "/monitor/operationLog/query",
        baseURL,
        data,
        method:"POST"
    })
}
