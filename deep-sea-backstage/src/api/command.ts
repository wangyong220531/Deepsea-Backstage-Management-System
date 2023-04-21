import { baseURL, request } from "./index"

export function getAllPS(data: QueryAllPS) {
    return request({
        url: "/policeSituation/selectAlarmList",
        baseURL,
        data,
        method: "POST"
    })
}

export function getLatestPS(data: QueryLatestPS) {
    return request({
        url: "/policeSituation/selectNewAlarm",
        baseURL,
        data,
        method: "POST"
    })
}

export function getHistoryPS(data: QueryHistoryPS) {
    return request({
        url: "/policeSituation/selectOldAlarm",
        baseURL,
        data,
        method: "POST"
    })
}

export function getDuty(data: DutyStatisticsData) {
    return request({
        url: "/duty/totalAssign",
        baseURL,
        data,
        method: "POST"
    })
}

export function forceFollowList(data: ForceFollowListData) {
    return request({
        url: "/duty/myFollowUpAppointTeam",
        baseURL,
        data,
        method: "POST"
    })
}

export function caseFollowList(data: CaseFollowListData) {
    return request({
        url: "/duty/myFollowUpPoliceSituation",
        baseURL,
        data,
        method: "POST"
    })
}

export function addDutyManage(data: AddDutyManageData) {
    return request({
        url: "/duty/manage/addDutyManage",
        baseURL,
        data,
        method: "POST"
    })
}

export function delDutyManage(config: { id: string }) {
    return request({
        url: "/duty/manage/deleteDutyManage",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function updateDutyManage(data: UpdateDutyManageData) {
    return request({
        url: "/duty/manage/updateDutyManage",
        baseURL,
        data,
        method: "POST"
    })
}

export function searchDutyManage(data: SearchManageData) {
    return request({
        url: "/duty/manage/vagueSelect",
        baseURL,
        data,
        method: "POST"
    })
}

export function getAllKeyPositions(config: {}) {
    return request({
        url: "/pointAreas/getPointAreaList",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function getAllPoliceTeam(config: {}) {
    return request({
        url: "/policeSituation/selectAllTeam",
        baseURL,
        query: config,
        method: "GET"
    })
}

export function getAllDutyClock(data: GetAllDuty) {
    return request({
        url: "/duty/totalPlayClock",
        baseURL,
        data,
        method: "POST"
    })
}
