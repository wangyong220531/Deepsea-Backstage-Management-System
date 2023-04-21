import { baseURL, request } from "./index"

export function addNeighb(data: AddNeighbData) {
    return request({
        url: "/OneStandAndManyFacts/addCommunity",
        baseURL,
        data,
        method: "POST"
    })
}

export function updateNeighb(data: UpdateNeighbData) {
    return request({
        url: "/OneStandAndManyFacts/changeCommunity",
        baseURL,
        data,
        method: "POST"
    })
}

export function getAllNeighbor(data: GetAllNeighborData) {
    return request({
        url: "/OneStandAndManyFacts/queryCommunitys",
        baseURL,
        data,
        method: "POST"
    })
}
