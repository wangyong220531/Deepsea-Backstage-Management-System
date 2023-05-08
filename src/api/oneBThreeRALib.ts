import { request, baseURL } from "./index"

export function queryPopulationLib(data: QueryAddressLibData) {
    return request({
        url: "/OneStandAndManyFacts/queryPLAddress",
        baseURL,
        method: "POST",
        data
    })
}
