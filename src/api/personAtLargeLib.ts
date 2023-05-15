import { baseURL, request } from "./index"

export function searchPersonsAtLarge(data: searchPersonsAtLargeData) {
    return request({
        baseURL,
        url: "/personAtLarge",
        data,
        method: "POST"
    })
}
