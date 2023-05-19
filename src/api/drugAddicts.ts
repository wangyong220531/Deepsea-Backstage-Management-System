import { request, baseURL } from "./index"

export function SearchDrugAddictors(data: SearchDrugAddictorsData) {
    return request({
        baseURL,
        url: "/library/selectDrugPerson",
        method: "POST",
        data
    })
}
