import { baseURL, request } from "./index"

export function AddSchool(data: AddSchoolData) {
    return request({
        url: "/wisdom/school/addSchool",
        baseURL,
        data,
        method: "POST"
    })
}

export function UpdateSchool(data: UpdateSchoolData) {
    return request({
        url: "/wisdom/school/updateSchool",
        baseURL,
        data,
        method: "POST"
    })
}

export function DelSchool(config: { id: string }) {
    return request({
        url: "/wisdom/school/deleteSchool",
        baseURL,
        query: config,
        method: "DELETE"
    })
}

export function QueryGuardsList(config: {}) {
    return request({
        url: "/wisdom/school/queryScProPerList",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function SearchCampus(data: SearchCampusData) {
    return request({
        url: "/wisdom/school/selectSchoolList",
        baseURL,
        data,
        method: "POST"
    })
}
