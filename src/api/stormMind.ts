import { baseURL, request } from "./index"

export function addMindQuestion(data: AddMindQuestionData) {
    return request({
        url: "/duty/stormMind/addStormMindQuestion",
        baseURL,
        data,
        method: "POST"
    })
}

export function addMindSolution(data: AddMindSolutionData) {
    return request({
        url: "/duty/stormMind/addStormMindPlan",
        baseURL,
        data,
        method: "POST"
    })
}

export function addMindEvalution(data: AddMindEvalutaionData) {
    return request({
        url: "/duty/stormMind/addStormMindEvaluate",
        baseURL,
        data,
        method: "POST"
    })
}

export function updateMindQuestion(data: UpdateMindQuestionData) {
    return request({
        url: "/duty/stormMind/updateStormMindQuestion",
        baseURL,
        data,
        method: "POST"
    })
}

export function updateMindSolution(data: UpdateMindSolution) {
    return request({
        url: "/duty/stormMind/updateStormMindPlan",
        baseURL,
        data,
        method: "POST"
    })
}

export function updataeMindEvaluation(data: UpdateMindEvaluationData) {
    return request({
        url: "/duty/stormMind/updateStormMindEvaluate",
        baseURL,
        data,
        method: "POST"
    })
}

export function searchMind(data: SearchMindData) {
    return request({
        url: "/duty/stormMind/selectStormMindQuestion",
        baseURL,
        data,
        method: "POST"
    })
}

export function delMindQuestion(data: { id: string }) {
    return request({
        url: "/duty/stormMind/delStormMindQuestion",
        baseURL,
        data,
        method: "POST"
    })
}

export function delMindEvaluation(data: {id:string}) {
    return request({
        url: "/duty/stormMind/delStormMindEvaluate",
        baseURL,
        data,
        method: "POST"
    })
}

export function delMindSolution(data: {id:string}) {
    return request({
        url: "/duty/stormMind/delStormMindPlan",
        baseURL,
        data,
        method: "POST"
    })
}
