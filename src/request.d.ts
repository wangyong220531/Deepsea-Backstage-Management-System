type ResponseResult = {
    "/mind/newMind": string
    "/mind/selectMindList": SearchMindResult
    "/policeSituation/selectAlarmList": AllPSResult
    "/policeSituation/selectNewAlarm": LatestPSResult
    "/policeSituation/selectOldAlarm": HistoryPSResult
    "/duty/totalAssign": DutySResult
    "/duty/myFollowUpAppointTeam": ForceFollowListResult
    "/duty/myFollowUpPoliceSituation": CaseFollowListResult
    "/serve/ask/addAskInfo": AddReqServerResult
    "/serve/ask/delAskInfo": string
    "/serve/ask/downloadFile": string
    "/serve/ask/selectAskInfo": ReqServerResult
    "/serve/ask/updateAskInfo": string
    "/OneStandAndManyFacts/addCommunity": string
    "/OneStandAndManyFacts/changeCommunity": string
    "/wisdom/school/addSchool": string
    "/wisdom/school/updateSchool": string
    "/wisdom/school/deleteSchool": string
    "/wisdom/school/queryScProPerList": GuardListResult
    "/duty/manage/addDutyManage": string
    "/duty/manage/deleteDutyManage": string
    "/duty/manage/updateDutyManage": string
    "/duty/manage/vagueSelect": SearchManageResult
    "/wisdom/apply/addWisdomApply": string
    "/wisdom/apply/deleteWisdomApply": string
    "/wisdom/apply/updateWisdomApply": string
    "/wisdom/apply/vagueSelect": string
    "/pointAreas/getPointAreaList": KeyPosition
    "/policeSituation/selectAllTeam": GetAllPoliceTeamResult
    "/OneStandAndManyFacts/queryCommunitys": GetAllNeighborsResult
    "/wisdom/school/selectSchoolList": SearchCampusResult
    "/duty/stormMind/addStormMindQuestion": AddMindQuestionResult
    "/duty/stormMind/addStormMindPlan": AddMindSolutionResult
    "/duty/totalPlayClock": AllDutyResult
    "/system/user/list": AllUserResult
    "/system/user/queryByAccount{account}": QueryUserByAccountResult
    "/system/user/update": { success: Boolean }
    "/system/user/vague": QueryUserInfoResult
    "/system/role/add": { success: Boolean }
    "/system/role/delete2": { success: Boolean }
    "/system/role/list": GetAllRolesResult
}
type RequestQuery = {
    "/serve/ask/delAskInfo": { id: string }
    "/serve/ask/downloadFile": { askId: string; type: 1 | 2 }
    "/wisdom/school/deleteSchool": { id: string }
    "/wisdom/school/queryScProPerList": {}
    "/duty/manage/deleteDutyManage": { id: string }
    "/wisdom/apply/deleteWisdomApply": { id: string }
    "/pointAreas/getPointAreaList": {}
    "/policeSituation/selectAllTeam": {}
    "/system/user/list": {}
    "/system/user/queryByAccount{account}": { account: string }
    "/system/role/delete2": { id: string }
    "/system/role/list": {}
}
type RequestData = {
    "/policeSituation/selectNewAlarm": QueryLatestPS
    "/policeSituation/selectOldAlarm": QueryHistoryPS
    "/policeSituation/selectAlarmList": QueryAllPS
    "/mind/newMind": Mind | Page
    "/mind/selectMindList": SearchMind
    "/duty/totalAssign": DutyStatisticsData
    "/duty/myFollowUpAppointTeam": ForceFollowListData
    "/duty/myFollowUpPoliceSituation": CaseFollowListData
    "/serve/ask/addAskInfo": AddReqServerData
    "/serve/ask/selectAskInfo": QueryReqServerData
    "/serve/ask/updateAskInfo": UpdateReqServerData
    "/OneStandAndManyFacts/addCommunity": AddNeighbData
    "/OneStandAndManyFacts/changeCommunity": UpdateNeighbData
    "/wisdom/school/addSchool": AddSchoolData
    "/wisdom/school/updateSchool": UpdateSchoolData
    "/duty/manage/addDutyManage": AddDutyManageData
    "/duty/manage/updateDutyManage": UpdateDutyManageData
    "/duty/manage/vagueSelect": SearchManageData
    "/wisdom/apply/addWisdomApply": AddSmartAppData
    "/wisdom/apply/updateWisdomApply": UpdateSmartAppData
    "/wisdom/apply/vagueSelect": SearchSmartAppData
    "/OneStandAndManyFacts/queryCommunitys": GetAllNeighborData
    "/wisdom/school/selectSchoolList": SearchCampusData
    "/duty/stormMind/addStormMindQuestion": AddMindQuestionData
    "/duty/stormMind/addStormMindPlan": AddMindSolutionData
    "/duty/totalPlayClock": GetAllDuty
    "/system/user/update": UpdateUserInfoData
    "/system/user/vague": SearchUserInfoData
    "/system/role/add": AddRoleData
}

type UrlList = keyof ResponseResult

type IsParams<T extends string> = T extends `${infer First}:${infer Rest}` ? true : false

type GetFirstParams<T extends string> = T extends `${infer First}/${infer Rest}` ? First : T

type GetParamsList<T extends string, K = never> = T extends `${infer First}/:${infer Rest}` ? GetParamsList<Rest, K | GetFirstParams<Rest>> : K

type MindType = "MODEL" | "BATTLE"

type Mind = {
    content: string
    createPerson: string
    mindNo: string
    model: string
    name: string
    remark: string
    target: string
    time: string
    type: MindType
    unitName: string
    unitNo?: string
    status?: string
}

interface SearchMind {
    createPerson?: string
    mindNo?: string
    model?: string
    name?: string
    pageNum: number
    pageSize: number
    type: MindType
    unitNo?: string
}

interface SearchMindResult {
    list: Mind[]
    total: number
}

interface QueryAllPS {
    pageNum: number
    pageSize: number
    psReportTimeStart: string | undefined
    psReportTimeStartEnd: string | undefined
    psStatus: string
    queryType: "NEW" | "HISTORY" | ""
}

interface AllPSResult {
    data: {
        list: APSRListItem[]
        pageNum: number
        pageSize: number
        total: number
    }
}

interface APSRListItem {
    appointTeamVos: [
        {
            ptPresentTime: string
            ptTeamNo: string
        }
    ]
    psStatus: string
    psNo: string
    psType: string
    psDiscription: string
    psPlace: string
    psFirstDispatchTime: string
    psSecondDispatchTime: string
    psEndTime: string
}

type LPSType = "ALL" | "SELECT"

interface QueryLatestPS {
    time: string
    type: LPSType
}

interface LatestPSResult {
    id: string
    psChujingType: string
    psEndTime: string
    psFirstDispatchTime: string
    psNo: string
    psPlace: string
    psType: string
    psSecondDispatchTime: string
}

interface QueryHistoryPS {
    pageNum: number
    pageSize: number
}

interface HistoryPSResult {
    list: HPSRListItem[]
    pageNum: number
    pageSize: number
    total: number
}

interface HPSRListItem {
    id: string
    psChujingType: string
    psEndTime: string
    psFirstDispatchTime: string
    psNo: string
    psPlace: string
    psType: string
    psSecondDispatchTime: string
}

type DSDtype = 0 | 1 | 2

interface DutyStatisticsData {
    assignPerName: string
    pageNum: number
    pageSize: number
    totalEndTime: string | undefined
    totalStartTime: string | undefined
    type: DSDtype
}

interface DutySResult {
    pageNum: number
    pageSize: number
    size: number
    totalAssignVos: TotalAV[]
}

interface TotalAV {
    operateUserName: string
    operateUserNo: string
    totalAssign: number
}

interface ForceFollowListData {
    pageNum: number
    pageSize: number
    sortType: string
    teamNo: string
    teamStatus: string
}

interface ForceFollowListResult {
    code: string
    data: {
        myFollowUpAppointTeamVos: mfuatv[]
        pageNum: number
        pageSize: number
        size: number
    }
    message: string
    success: Boolean
    timestamp: string
}

interface mfuatv {
    teamNo: string
    teamStatus: string
    car: string[]
    mPolice: police[]
    fPolice: police[]
    psNo: string
}

interface police {
    userIdCode: string
    userName: string
    userType: string
}

interface CaseFollowListData {
    endTime: string
    pageNum: number
    pageSize: number
    psStatus: string
    startTime: string
}

interface CaseFollowListResult {
    data: {
        pageNum: number
        pageSize: number
        situtationVos: Situation[]
        size: number
    }
}

interface Situation {
    psNo: string
    psStatus: string
    psPlace: string
    psReportTime: string
    psFirstDispatchTime: string
    psSecondDispatchTime: string
    teams: [
        {
            ptTeamNo: string
        }
    ]
}

interface AddReqServerData {
    askInfo: string
    askNo: string
    askTime: string
    askUser: string
    remark: string
    base64File: string | null | undefined
    base64FileName: string
    replyOrNot: 0 | 1
    respondent: string
    status: string
}

interface QueryReqServerData {
    askNo: string
    askUser: string
    endTime: string | undefined
    respondent: string
    startTime: string | undefined
    pageNum: number
    pageSize: number
}

interface ReqServerResult {
    data: {
        pageSize: number
        pageNum: number
        size: number
        voList: QueryReqServer[]
    }
}

interface QueryReqServer {
    id: string
    askFile: string
    askFileName: string
    askInfo: string
    askNo: string
    askTime: string
    askUser: string
    remark: string
    replyFile: string
    replyFileName: string
    replyOrNot: 0 | 1
    respondent: string
    status: string
}

interface UpdateReqServerData {
    askFile: string
    askInfo: string
    askNo: string
    askTime: string
    askUser: string
    createOperator: string
    createTime: string
    id: string
    remark: string
    replyFile: string
    replyOrNot: string
    respondent: string
    status: string
    updateOperator: string
    updateTime: string
}

interface AddNeighbData {
    adress: number
    code: string
    daliyLivePopulation: number
    deviceBall: number
    deviceEtc: number
    deviceInfrared: number
    devicePortrait: number
    deviceTag: number
    flowLivePopulation: number
    focusPopulation: number
    importPopulation: number
    jurisdiction: string
    name: string
    plId: string
    remark: string
    societyName: string
    societyPoliceman: string
}

interface UpdateNeighbData {
    adress: number
    code: string
    daliyLivePopulation: number
    deviceBall: number
    deviceEtc: number
    deviceInfrared: number
    devicePortrait: number
    deviceTag: number
    flowLivePopulation: number
    focusPopulation: number
    importPopulation: number
    jurisdiction: string
    name: string
    plId: string
    remark: string
    societyName: string
    societyPoliceman: string
}

interface AddSchoolData {
    communityPolice: string
    deviceBall: number
    deviceEtc: number
    deviceInfrared: number
    devicePortrait: number
    deviceTag: number
    introduction: string
    lat: string
    lnt: string
    name: string
    remark: string
    type: string
}

interface UpdateSchoolData {
    communityPolice: string
    createOperator: string
    createTime: string
    deviceBall: number
    deviceEtc: number
    deviceInfrared: number
    devicePortrait: number
    deviceTag: number
    id: string
    introduction: string
    lat: string
    lnt: string
    name: string
    remark: string
    type: string
    updateOperator: string
    updateTime: string
}

interface GuardListResult {
    endRow: number
    hasNextPage: true
    hasPreviousPage: true
    isFirstPage: true
    isLastPage: true
    list: Guard[]
    navigateFirstPage: number
    navigateLastPage: number
    navigatePages: number
    navigatepageNums: []
    nextPage: number
    pageNum: number
    pageSize: number
    pages: number
    prePage: number
    size: number
    startRow: number
    total: number
}

interface Guard {
    createOperator: string
    createTime: string
    id: string
    name: string
    phone: string
    remark: string
    schoolId: string
    schoolName: string
    sex: string
    type: string
    updateOperator: string
    updateTime: string
}

interface AddDutyManageData {
    checkSituation: string
    checkTime: string
    checkUser: string
    location: string
    mdutyNo: string
    teamName: string | undefined
    teamNo: string
    toPointTime: string
}

interface UpdateDutyManageData {
    checkSituation: string
    checkTime: string
    checkUser: string
    createOperator: string
    createTime: string
    id: string
    location: string
    mdutyNo: string
    status: number
    teamName: string | undefined
    teamNo: string
    toPointTime: string
    updateOperator: string
    updateTime: string
    status: 0 | 1
}

interface SearchManageData {
    checkEndTime: Dayjs | null
    checkStartTime: Dayjs | null
    location: string
    mdutyNo: string
    pageNum: number
    pageSize: number
}

interface SearchManageResult {
    code: string
    data: SearchManageResultData
    message: string
    success: boolean
    timestamp: string
}

interface SearchManageResultData {
    pageNum: number
    pageSize: number
    size: number
    voList: Vo[]
}

interface Vo {
    checkSituation: string
    checkTime: string
    checkUser: string
    id: string
    location: string
    mdutyNo: string
    status: 0 | 1
    teamNo: string
    teamUsers: TeamUser[]
    toPointTime: string
    createOperator: string
    createTime: string
    updateOperator: string
    updateTime: string
}

interface TeamUser {
    reportRole: string
    reportStatus: string
    reportTeamNo: string
    reportTeamType: string
    reportUserNo: string
    userName: string
    userType: string
}

interface AddSmartAppData {
    applyNo: string
    bmNo: string
    info: string
    managerArea: string
    policeKind: string
    remark: string
    status: string
    time: string
    toUser: string
    type: string
    wisdomUnit: string
}

interface UpdateSmartAppData {
    applyNo: string
    bmNo: string
    createOperator: string
    createTime: string
    id: string
    info: string
    managerArea: string
    policeKind: string
    remark: string
    status: string
    time: string
    toUser: string
    type: string
    updateOperator: string
    updateTime: string
    wisdomUnit: string
}

interface SearchSmartAppData {
    applyNo: string
    etime: string
    managerArea: string
    pageNum: number
    pageSize: number
    status: string
    stime: string
    toUser: string
    type: string
}

interface KeyPosition {
    success: boolean
    code: string
    message: string
    data: KP[]
    timestamp: string
}

interface KP {
    address: string
    areaClass: number
    createOperator: string
    createTime: string
    description: string
    id: number
    isOverlay: number
    isPicture: number
    name: string
    shotInfo: string
    sort: number
    type: number
    updateOperator: string
    updateTime: string
}

interface GetAllPoliceTeamResult {
    code: string
    data: PoliceTeam[]
    message: string
    timestamp: string
}

interface PoliceTeam {
    reportTeamName: string
    reportTeamNo: string
    reportTeamType: string
    reportUnitNo: string
}

interface GetAllNeighborData {
    jurisdiction: string
    name: string
    pageNum: number
    pageSize: number
    plId: string
    societyName: string
    status: string
}

interface GetAllNeighborsResult {
    code: string
    data: {
        endRow: number
        hasNextPage: boolean
        hasPreviousPage: boolean
        isFirstPage: boolean
        isLastPage: boolean
        list: Neigbor[]
        navigateFirstPage: number
        navigateLastPage: number
        navigatePages: number
        nextPage: number
        pageNum: number
        pageSize: number
        pages: number
        prePage: number
        size: number
        startRow: number
        total: number
    }
    message: string
    success: boolean
    timestamp: string
}

interface Neigbor {
    addressAmount: number
    code: string
    dailyLivePopulation: number
    deviceBall: number
    deviceEtc: number
    deviceInfrared: number
    devicePortrait: number
    deviceTag: number
    flowLivePopulation: number
    focusPopulation: number
    importPopulation: number
    jurisdiction: string
    name: string
    plId: string
    remark: string
    societyName: string
    societyPoliceman: string
    status: string
}

interface SearchCampusData {
    communityPolice: string
    introduction: string
    name: string
    remark: string
    type: string
    pageNum: number
    pageSize: number
}

interface SearchCampusResult {
    code: string
    data: {
        pageNum: number
        pageSize: number
        size: number
        voList: Campus[]
    }
    message: string
    success: boolean
    timestamp: string
}

interface Campus {
    securityManageName: any
    communityPolice: string
    createOperator: string
    createTime: string
    deviceBall: number
    deviceEtc: number
    deviceInfrared: number
    devicePortrait: number
    deviceTag: number
    id: string
    introduction: string
    lat: string
    lnt: string
    name: string
    remark: string
    type: string
    updateOperator: string
    updateTime: string
    securityNum: number
}

interface AddMindQuestionData {
    content: string
    putMan: string
    queNo: string
}

interface AddMindQuestionResult {
    code: string
    data: string
    message: string
    success: boolean
    timestamp: string
}

interface AddMindSolutionData {
    doneMan: string
    planNo: string
    queId: string
    solutions: string
    status: string
}

interface AddMindSolutionResult {
    code: string
    data: string
    message: string
    success: boolean
    timestamp: string
}

interface GetAllDuty {
    endDate: string | undefined
    startDate: string | undefined
    unitNo: string
    pageSize: number
    pageNum: number
}

interface AllDutyResult {
    code: string
    data: DutyAnalysis[]
    message: string
    success: boolean
    timestamp: string
}

interface DutyAnalysis {
    backTimes: number
    carId: string
    clockTimes: number
    lackTimes: number
    reportDate: string
    stayTimes: number
    stayWaringTimes: number
    teamName: string
    unitName: string
}

interface AllUserResult {
    rows: []
    total: number
}

interface User {
    id: string
    account: string
    userName: string
    userUnitNo: string
    status: 0 | 1
}

interface QueryUserByAccountResult {
    data: {}
}

interface UpdateUserInfoData {
    id: string
    account: string
    userName: string
    userNo: string
    roleId: string
    status: 0 | 1 // 0-禁用 1-启用
}

interface SearchUserInfoData {
    account: string
    userUnitNo: string
    pageNum: number
    pageSize: number
}

interface QueryUserInfoResult {
    data: {
        pageNum: number
        pageSize: number
        rows: UserInfo[]
        total: number
    }
}

interface UserInfo {
    id?: string
    account: string
    identityCode: string
    phone: string
    status: 0 | 1
    unitName: string
    userName: string
    userNo: string
    role: {
        id: string
        roleName: string
    }
    unitNo?: string
}

interface AddRoleData {
    roleName: string
}

interface GetAllRolesResult {
    rows: []
}
