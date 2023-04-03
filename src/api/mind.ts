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

// export function addMindEvalution(data:AddMindEvalutaion){
//     return request({
//         url:"/duty/stormMind/addStormMindEvaluate",

//     })
// }
