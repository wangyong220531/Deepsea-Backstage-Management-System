import { baseURL, request } from "./index"

export function addSmartApp(data: AddSmartAppData) {
    return request({
        url: "/wisdom/apply/addWisdomApply",
        baseURL,
        data,
        method: "POST"
    })
}

export function delSmartApp(config: { id: string }) {
    return request({
        url: "/wisdom/apply/deleteWisdomApply",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function updateSmartApp(data: UpdateSmartAppData) {
    return request({
        url: "/wisdom/apply/updateWisdomApply",
        baseURL,
        data,
        method: "POST"
    })
}

export function searchSmartApp(data: SearchSmartAppData) {
    return request({
        url: "/wisdom/apply/vagueSelect",
        baseURL,
        data,
        method: "POST"
    })
}

export function appOperate(data: AppOperateData) {
    return request({
        url: "/wisdom/apply/feedback",
        baseURL,
        data,
        method: "POST"
    })
}

export function delOperate(config: { id: string }) {
    return request({
        url: "/wisdom/apply/deleteFeedback",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function searchPlan(config: { planNo: string }) {
    return request({
        url: "/duty/stormMind/selectPlanByNo",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function getPlanNoList(config: {}) {
    return request({
        url: "/duty/stormMind/getPlanNoList",
        baseURL,
        query: config,
        method: "GET"
    })
}
