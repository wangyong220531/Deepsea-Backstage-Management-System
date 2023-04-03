import { baseURL, request } from "./index"

export function addReqServer(data: AddReqServerData) {
    return request({
        url: "/serve/ask/addAskInfo",
        baseURL,
        data,
        method: "POST"
    })
}

export function delReqServer(config: { id: string }) {
    return request({
        url: "/serve/ask/delAskInfo",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function dowloadFile(config: { askId: string; type: 1 | 2 }) {
    return request({
        url: "/serve/ask/downloadFile",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function queryReqServer(data: QueryReqServerData) {
    return request({
        url: "/serve/ask/selectAskInfo",
        baseURL,
        data,
        method: "POST"
    })
}

export function updateReqServer(data: UpdateReqServerData) {
    return request({
        url: "/serve/ask/updateAskInfo",
        baseURL,
        data,
        method: "POST"
    })
}
