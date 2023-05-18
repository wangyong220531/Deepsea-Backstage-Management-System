import { request, baseURL } from "./index"

export function SearchDrugAddictors(data: SearchDrugAddictorsData) {
    return request({
        baseURL,
        url: "/searchDrugAddictors",
        method: "POST",
        data
    })
}
