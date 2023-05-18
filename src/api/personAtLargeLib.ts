import { baseURL, request } from "./index"

export function searchPersonsAtLarge(data: searchPersonsAtLargeData) {
    return request({
        baseURL,
        url: "/library/selectRunningPerson",
        data,
        method: "POST"
    })
}
