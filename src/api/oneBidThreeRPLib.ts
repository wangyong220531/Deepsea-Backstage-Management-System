import { request, baseURL } from "./index"

export function queryAddressLib(data: QueryPopulationLibData) {
    return request({
        url: "/OneStandAndManyFacts/queryPLPersonInfo",
        baseURL,
        method: "POST",
        data
    })
}
