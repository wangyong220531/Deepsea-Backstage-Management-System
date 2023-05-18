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
    "/wisdom/apply/addWisdomApply": { success: Boolean }
    "/wisdom/apply/deleteWisdomApply": string
    "/wisdom/apply/updateWisdomApply": { success: Boolean }
    "/wisdom/apply/vagueSelect": SearchAppResult
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
    "/system/role/delete2/:id": { success: Boolean }
    "/system/role/list": GetAllRolesResult
    "/report/queryAllUnit": GetUnitListResult
    "/system/user/modifyPassword": { success: Boolean }
    "/system/user/delete/:id": { success: Boolean }
    "/system/permission/list/:parentId": GetPermissionTreeResult
    "/system/role/vague": SearchRoleResult
    "/system/user/add": { success: Boolean }
    "/monitor/loginLog/query": SearchLoginLogResult
    "/captcha2/mobileCaptcha": GetCaptchaResult
    "/monitor/operationLog/query": SearchOperateLogResult
    "/system/user/distributeRole2/:roleId/:userIds": { success: Boolean }
    "/system/role/distributePSet/:roleId/:pSetId": { success: Boolean }
    "/system/user/distributeRole2": { success: Boolean }
    "/system/role/distributePSet": { success: Boolean }
    "/monitor/loginLog/export": LoginLogExportResult
    "/monitor/operationLog/export": OperateLogExportResult
    "/system/user/export": UserExportResult
    "/login": LoginResult
    "/logout": { success: Boolean }
    "/system/user/getUserPathTree/:roleId": GetRolePermissionResult
    "/system/role/update": UpdateRoleResult
    "/duty/stormMind/selectStormMindQuestion": SearchMindResult
    "/duty/stormMind/updateStormMindQuestion": { success: Boolean }
    "/duty/stormMind/updateStormMindPlan": { success: Boolean }
    "/duty/stormMind/addStormMindEvaluate": { success: Boolean }
    "/duty/stormMind/updateStormMindEvaluate": { success: Boolean }
    "/duty/stormMind/delStormMindEvaluate": { success: Boolean }
    "/duty/stormMind/delStormMindPlan": { success: Boolean }
    "/duty/stormMind/delStormMindQuestion": { success: Boolean }
    "/wisdom/apply/feedback": { success: Boolean }
    "/wisdom/apply/deleteFeedback": { success: Boolean }
    "/report/queryAllUnit": GetAllUnitResult
    "/duty/stormMind/selectPlanByNo": SearchPlanResult
    "/duty/stormMind/getPlanNoList": PlanListResult
    "/OneStandAndManyFacts/queryPLPersonInfo": QueryPopulationLibResult
    "/OneStandAndManyFacts/queryPLAddress": QueryAddressLibResult
    "/policeSituation/updateDisPatchSheet": ForceOperateResult
    "/library/selectRunningPerson": searchPersonsAtLargeResult
    "/searchDrugAddictors": SearchDrugAddictorsResult
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
    "/system/role/list": {}
    "/report/list": {}
    "/system/user/modifyPassword": { newPass: string; userId: string }
    "/captcha2/mobileCaptcha": { param: string }
    "/monitor/loginLog/export": {}
    "/monitor/operationLog/export": {}
    "/system/user/export": {}
    "/logout": {}
    "/wisdom/apply/deleteFeedback": { id: string }
    "/report/queryAllUnit": {}
    "/duty/stormMind/selectPlanByNo": { planNo: string }
    "/duty/stormMind/getPlanNoList": {}
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
    "/system/user/vague": SearchUserData
    "/system/role/add": AddRoleData
    "/system/role/vague": SearchRoleData
    "/system/user/add": AddUserData
    "/monitor/loginLog/query": SearchLoginLogData
    "/monitor/operationLog/query": SearchOperateLogData
    "/system/user/distributeRole2": AssignMultiUsersData
    "/system/role/distributePSet": AssignPermissionsData
    "/login": LoginData
    "/system/role/update": UpdateRoleData
    "/duty/stormMind/selectStormMindQuestion": SearchMindData
    "/duty/stormMind/updateStormMindQuestion": UpdateMindQuestionData
    "/duty/stormMind/updateStormMindPlan": UpdateMindSolution
    "/duty/stormMind/addStormMindEvaluate": AddMindEvalutaionData
    "/duty/stormMind/updateStormMindEvaluate": UpdateMindEvaluationData
    "/duty/stormMind/delStormMindEvaluate": { id: string }
    "/duty/stormMind/delStormMindPlan": { id: string }
    "/duty/stormMind/delStormMindQuestion": { id: string }
    "/wisdom/apply/feedback": AppOperateData
    "/OneStandAndManyFacts/queryPLPersonInfo": QueryPopulationLibData
    "/OneStandAndManyFacts/queryPLAddress": QueryAddressLibData
    "/policeSituation/updateDisPatchSheet": ForceOperateData
    "/library/selectRunningPerson": searchPersonsAtLargeData
    "/searchDrugAddictors": SearchDrugAddictorsData
}

type RequestParams = {
    "/system/permission/list/:parentId": { parentId: string }
    "/system/user/delete/:id": { id: string }
    "/system/role/distributePSet/:roleId/:pSetId": { roleId: string; pSetId: string }
    "/system/user/getUserPathTree/:userId": { roleId: string }
    "/system/role/delete2/:id": { id: string }
}

type UrlList = keyof ResponseResult

type IsParams<T extends string> = T extends `${infer First}:${infer Rest}` ? true : false

type GetFirstParams<T extends string> = T extends `${infer First}/${infer Rest}` ? First : T

type GetParamsList<T extends string, K = never> = T extends `${infer First}/:${infer Rest}` ? GetParamsList<Rest, K | GetFirstParams<Rest>> : K

interface QueryAllPS {
    pageNum: number
    pageSize: number
    psReportTimeStart: number
    psReportTimeStartEnd: number
    psStatus: string | undefined | number
    queryType: "" | "NEW" | "HISTORY"
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
    psReportUserName: string
    psReportTime: string
    psResportUserPhone: string
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

type DSDtype = string | 1 | 2

interface DutyStatisticsData {
    assignPerName: string
    pageNum: number
    pageSize: number
    totalEndTime: number
    totalStartTime: number
    type: DSDtype
}

interface DutySResult {
    data: {
        pageNum: number
        pageSize: number
        size: number
        totalAssignVos: TotalAV[]
    }
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
        myFollowUpAppointTeamVos: Mfuatv[]
        pageNum: number
        pageSize: number
        size: number
    }
    message: string
    success: Boolean
    timestamp: string
}

interface Mfuatv {
    appointTeamId: string
    psId: string
    teamNo: string
    teamStatus: number
    carNo: string[]
    polices: Police[]
    mPolice: Police[]
    fPolice: Police[]
    psNo: string
}

interface Police {
    userIdCode: string
    userName: string
    userType: string
}

interface CaseFollowListData {
    endTime: number
    pageNum: number
    pageSize: number
    psStatus: string
    startTime: number
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
    psReportUserName: string
    psReportTime: string
    psResportUserPhone: string
    psFirstDispatchTime: string
    psSecondDispatchTime: string
    teams: PsTeam[]
}

interface PsTeam {
    ptPsId: string
    ptTeamNo: string
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
    id?: string
    applyNo: string
    bmNo: string
    info: string
    managerArea: string
    policeKind: string
    remark: string
    status: string
    toUser: string
    type: "模型" | "技战法"
    wisdomUnit: string
}

interface UpdateSmartAppData {
    applyNo: string
    bmNo: string
    id: string | undefined
    info: string
    managerArea: string
    policeKind: string
    remark: string | undefined
    status: string
    toUser: string
    type: "1" | "2" | "3" | "模型" | "技战法"
    wisdomUnit: string
}

interface SearchSmartAppData {
    applyNo: string
    stime: string
    etime: string
    manageArea: string
    pageNum: number
    pageSize: number
    policeKind: string
    toUser: string
    status: string
    wisdomUnitType: string
}

interface SearchAppResult {
    success: Boolean
    data: {
        size: number
        voList: App[]
    }
}

interface App {
    id?: string
    type: "1" | "2" | "3" | "模型" | "技战法"
    applyNo: string
    info: string
    toUser: string
    wisdomUnit: string
    policeKind: string
    managerArea: string
    status: string
    bmNo: string
    remark?: string
    createTime?: string
    createOperator?: string
    feedbackVos?: []
    operate?: ReactNode
}

interface Feedback {
    id: string
    wpId: string
    context: string
    type: string
    remark: string
    createTime: string
    createOperator: string
}

interface AppOperateData {
    context: string
    type: string
    wpId: string | undefined
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
    success: Boolean
    data: string
}

interface AddMindSolutionData {
    doneMan: string
    planNo: string
    policeKind: string
    queId: string
    solutions: string
    status: string
    wisdomUnit: string
}

interface AddMindSolutionResult {
    success: Boolean
}

interface GetAllDuty {
    endDate: number
    startDate: number
    unitNo: string
    pageSize: number
    pageNum: number
}

interface AllDutyResult {
    code: string
    data: {
        total: number
        infoList: DutyAnalysis[]
    }
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
    // account: string
    // userName: string
    // userNo: string
    // roleId: string
    phone: string
    status: 0 | 1 // 0-禁用 1-启用
}

interface SearchUserData {
    account: string
    roleName?: string
    unitName: string
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
    id: string
    account: string
    identityCode: string
    phone: string
    status?: 0 | 1
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
    roleComment: string
}

interface GetAllRolesResult {
    rows: Role[]
}

interface Role {
    id: string
    roleName: string
    createTime: string
    status: 0 | 1
}

interface GetUnitListResult {
    success: Boolean
    data: {
        unitInfos: Unit[]
    }
}

interface Unit {
    unitName: string
    unitNo: string
}

interface GetPermissionTreeResult {
    data: MenuChild[]
}

interface MenuChild {
    id: string
    permissionName: string
    permissionPath: string
    parentId: string
    childList?: MenuChild[]
}

interface SearchRoleData {
    pageNum: number
    pageSize: number
    roleName: string
}

interface SearchRoleResult {
    success: Boolean
    data: {
        pageNum: number
        pageSize: number
        rows: Role[]
        total: number
    }
}

interface AddUserData {
    phone: string
    status: 0
    userName: string
    userNo: string
    userUnitNo: string
}

interface SearchLoginLogData {
    endTime: string | undefined
    pageNum: number
    pageSize: number
    startTime: string | undefined
    userName: string
}

interface SearchLoginLogResult {
    data: {
        pageNum: number
        pageSize: number
        rows: LoginLog[]
        total: number
    }
}

interface LoginLog {
    id: string
    userNo: string
    userName: string
    loginIp: string
    loginTime: string
    status: 0 | 1
    remark: "Login" | "Logout"
}

interface GetCaptchaResult {
    data: {
        phone: string
        userNo: string
    }
}

interface SearchOperateLogData {
    endTime: string | undefined
    pageNum: number
    pageSize: number
    startTime: string | undefined
    userName: string
}

interface SearchOperateLogResult {
    data: {
        pageNum: number
        pageSize: number
        rows: Operate[]
        total: number
    }
}

interface Operate {
    id: string
    account: string
    userName: string
    operationIp: string
    operationTitle: string
    operationType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
    operationTime: string
}

interface AssignMultiUsersData {
    roleId: string
    userIds: React.Key[]
}

interface AssignPermissionsData {
    roleId: string
    permissionIds: string[]
}

interface LoginData {
    code: string
    userNo: string
    source: 1 | 2
}

interface LoginResult {
    data: {
        token: string
        user: MenuChild[] | string
        userId: string
    }
}

interface UserExportResult {
    success: Boolean
    data: ExcelHead[]
}

interface LoginLogExportResult {
    success: Boolean
    data: LoginExcelHead[]
}

interface LoginExcelHead {
    account: string
    userName: string
    loginIp: string
    loginTime: string
    remark: string
}

interface OperateLogExportResult {
    success: Boolean
    data: OperateExcelHead[]
}

interface OperateExcelHead {
    account: string
    userName: string
    operationTime: string
    operationType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
}

interface GetRolePermissionResult {
    data: RolePermission[]
}

interface RolePermission {
    id: string
    parentId: string
}

interface UpdateRoleData {
    id: string
    roleName: string
    status: 0 | 1
}

interface AddMindEvalutaionData {
    vos: Evaluate[]
}

interface Evaluate {
    content: string
    planId: string
    type: "模型" | "技战法"
}

interface UpdateMindQuestionData {
    id: string
    content: string
    putMan: string
    queNo: string
}

interface UpdateMindSolution {
    id: string
    policeKind: string
    solutions: string
    status: string
    wisdomUnit: string
}

interface UpdateMindEvaluationData {
    content: string
    id: string
    type: "模型" | "技战法"
}

interface SearchMindData {
    content: string
    pageNum: number
    pageSize: number
    policeKind: string
    putMan: string
    queNo: string
    wisdomUnit: string
    startTime: string
    endTime: string
}

interface SearchMindResult {
    success: Boolean
    data: {
        size: number
        voList: []
    }
}

interface Mind {
    id: string
    queNo: string
    content: string
    createTime: string
    createOperator: string
    planVoList: Plan[]
}

interface Plan {
    id: string
    queId: string
    planNo: string
    solutions: string
    status: string
    wisdomUnit: string
    policeKind: string
    createTime: string
    createOperator: string
    evaluateVo: Evaluation | null
}

interface Evaluation {
    id: string
    planId: string
    planNo: string
    content: string
    type: "模型" | "技战法"
    createTime: string
    createOperator: string
}

interface GetAllUnitResult {
    success: Boolean
    data: Unit[]
}

interface SearchPlanResult {
    success: Boolean
    data: {
        id: string
        policeKind: string
        wisdomUnit: string
    }
}

interface PlanListResult {
    success: Boolean
    data: string[]
}

interface QueryPopulationLibData {
    pageNum: number
    pageSize: number
}

interface QueryPopulationLibResult {
    success: Boolean
    data: {
        rows: Person[]
        total: number
    }
}

interface Person {
    /**出生地籍贯*/
    CSDGJ: string
    /**出生地省市县*/
    CSDSSX: string
    /**出生日期*/
    CSRQ: string
    /**曾用名*/
    CYM: string
    /**国籍*/
    GJ?: string
    /**公民身份证号码*/
    GMSFHM: string
    /**户籍地址详址*/
    HJDZXZ: string
    /**婚姻状况*/
    HYZK: string
    /**联系方式*/
    LXFS: string
    /**民族*/
    MZ: string
    /**人员类别*/
    RYLB: string
    /**身高*/
    SG?: string
    /**实有人口核实结果，1-新登记；2-已离开；3-死亡；4-无变化*/
    SYRKHSJG: "1" | "2" | "3" | "4"
    /**文化程度*/
    WHCD: string
    /**性别*/
    XB: string
    /**姓名*/
    XM: string
    /**现住址区划*/
    XZZQH: string
    /**现住址详址*/
    XZZXZ: string
    /**证件号码*/
    ZJHM: string
    /**证件类型，111-身份证*/
    ZJLX: string
    /**宗教信仰*/
    ZJXY: string
}

interface QueryAddressLibData {
    pageNum: number
    pageSize: number
}

interface QueryAddressLibResult {
    success: Boolean
    data: {
        rows: Address[]
        total: number
    }
}

interface Address {
    /**标准层更新时间*/
    bzcGxsj?: string
    /**标准层入库时间*/
    bzcRksj?: string
    /**创建时间:地址创建的时间*/
    cjsj?: string
    /**创建人*/
    createBy?: string
    /**创建单位*/
    createOrgCode?: string
    /**创建时间*/
    createTime?: string
    /**幢楼编号:(二级编号)：0至3843*/
    dlbh: string
    /**幢楼副号:(二级副号)：0至61*/
    dlfh?: string
    /**幢楼量词:(二级量词)*/
    dllc?: string
    /**地名编码:取地名表中地名编码*/
    dmdm?: string
    /**单元楼层编号:(三级编号)： -61至 3843*/
    dylcbh: string
    /**单元楼层量词:(三级量词)*/
    dylclc?: string
    /**地址:由编码段合成的地址字符串*/
    dz: string
    /**临时编号*/
    dzid?: string
    /**地址类型:0未确定、1建筑地址*/
    dzlx: string
    /**地址全称 */
    dzmc: string
    /**地址特征码 */
    dztzm: string
    /**地址状态：0待建、1有效、2冻结、3待替换、4替换、5消亡、6无效*/
    dzzt: string
    /**公安部-表名*/
    gabBm?: string
    /**公安部-备注*/
    gabBz?: string
    /**公安部-采集地*/
    gabCjd?: string
    /**公安部-记录唯一标识*/
    gabJlwybs?: string
    /**公安部-数据库服务标识F*/
    gabSjkfwbs?: string
    /**公安部-数据来源系统分类代码*/
    gabSjlyxtfldm?: string
    /**公安部-数据记录敏感级别*/
    gabSjmgjb?: string
    /**编号*/
    id: string
    /**建筑的地址id*/
    jzdzid: string
    /**建筑的最大单元数*/
    jzjgdy: sting
    /**最大层数*/
    jzjglc: string
    /**所属区域id*/
    plAreaId?: string
    /**所属社区*/
    plCommunity: string
    /**类型，VILLA-独栋,HOUSE-房间,UNIT-单元,BUILD-楼栋,AREA-区域*/
    plType: "VILLA" | "HOUSE" | "UNIT" | "BUILD" | "AREA"
    /**是否标注：0-未；1-已*/
    sfbz: "0" | "1"
    /**是否确认：0-未；1-已*/
    sfconfirm: "0" | "1"
    /**是否门楼牌*/
    sfmlp?: string
    /**室号编号*/
    shbh?: string
    /**所属县区*/
    ssxq?: string
    /**室位置：单元位置*/
    swzdy?: string
    /**室位置：层位置*/
    swzlc?: string
    /**室位置：室位置*/
    swzs?: string
    /**室位置：室号*/
    swzsh?: string
    /**坐标X*/
    x?: string
    /**坐标Y*/
    y?: string
    /**刑事责任区*/
    xszrq?: string
    /**行政区划：(取12位社区代码)F*/
    xzqh: string
    /**治安责任区：(取12位责任区代码)*/
    zazrq?: string
}

interface ForceOperateData {
    appointTeamId: string
    id: string
    operatedId: null
    points: null
    remark: null
    status: "POLICE_END" | "POLICE_PRESENT"
}

interface searchPersonsAtLargeData {
    pageNum: number
    pageSize: number
}

interface searchPersonsAtLargeResult {
    success: Boolean
    data: {
        runPerVos: PLRecord[]
        size: number
    }
}

interface PLRecord {
    /**在逃人员编号*/
    ztrybh: string
    /**在逃人员类型代码*/
    ztrylxdm: string
    /**案事件编号*/
    asjbh: string
    /**立案日期*/
    larq: string
    /**立案单位_公安机关机构代码*/
    ladw_gajgjgdm: string
    /**立案单位_公安机关名称*/
    ladw_gajgmc: string
    /**案件类别代码*/
    ajlbdm: string
    /**简要案情*/
    jyaq: string
    /**部督捕_判断标识*/
    bdb_pdbz: string
    /**抓逃奖金*/
    ztjj: string
    /**犯罪嫌疑人到案状态代码*/
    fzxyrdaztdm: string
    /**姓名*/
    xm: string
    /**常用证件代码*/
    cyzjdm: string
    /**证件号码*/
    zjhm: string
    /**出生日期*/
    csrq: string
    /**性别代码*/
    xbdm: string
    /**国籍代码*/
    gjdm: string
    /**籍贯省市县代码*/
    jgdm: string
    /**民族代码*/
    mzdm: string
    /**户籍地址_行政区划代码*/
    hjdz_xzqhdm: string
    /**户籍地址_地址名称*/
    hjdz_dzmc: string
    /**现住址_行政区划代码*/
    xzz_xzqhdm: string
    /**现住址_地址名称*/
    xzz_dzmc: string
    /**身高下限*/
    sgxx: string
    /**身高上限*/
    sgsx: string
    /**职业类别代码*/
    zylbdm: string
    /**抓获犯罪嫌疑人_判断标识*/
    zhfzxyr_pdbz: string
    /**抓获日期*/
    zhrq: string
    /**抓获地点_行政区划代码*/
    zhdd_xzqhdm: string
    /**抓获地点_地址名称*/
    zhdd_dzmc: string
    /**抓获单位_公安机关机构代码*/
    zhdw_gajgjgdm: string
    /**抓获单位_公安机关名称*/
    zhdw_gajgmc: string
    /**抓获方式代码*/
    zhfsdm: string
    /**登记审批单位_公安机关机构代码/采用GA 380《全国公安机关机构代码编码规则》统一编制的代码/CODE_GXS*/
    djspdw_gajgjgdm: string
    /**登记审批单位_公安机关名称*/
    djspdw_gajgmc: string
    /**登记审批人_姓名*/
    djspr_xm: string
    /**登记审批人_公民身份号码/符合GB11643《公民身份号码》*/
    djspr_gmsfhm: string
    /**登记审批人_联系电话*/
    djspr_lxdh: string
    /**登记审批_审批时间*/
    djsp_spsj: string
    /**信息登记单位_公安机关机构代码采用GA 380《全国公安机关机构代码编码规则》统一编制的代码/CODE_GXS*/
    xxdjdw_gajgjgdm: string
    /**更新时间*/
    gxsj: string
    /**信息入部库时间*/
    xxrbksj_rqsj: string
    /**业务状态（0：待审批，1：审批不通过，2：审批通过，3：草稿）*/
    ryzt: "0" | "1" | "2" | "3"
    /**移交标识（1：移交，0：未移交, 2:被其他单位移交）*/
    yjbz: "0" | "1" | "2"
    /**主办单位_公安机关机构代码*/
    zbdw_gajgjgdm: string
    /**主办单位_公安机关名称*/
    zbdw_gajgmc: string
    /**主办人_姓名*/
    zbr_xm: string
    /**主办人_联系电话*/
    zbr_lxdh: string
    /**抓获单位分类/CODE_DWFL*/
    zhdwfldm: string
    /**信息主键编号*/
    xxzjbh: string
    /**主办单位分类*/
    zbdwfldm: string
    /**在逃审批人*/
    ztspr: string
    /**口音/CODE_KY*/
    ky: string
    /**主办单位联系电话*/
    zbdw_lxdh: string
    /**省厅入库时间*/
    strksj: string
    /**公安部-表名*/
    gab_bm: string
    /**公安部-采集地*/
    gab_cjd: string
    /**公安部-数据库服务标识*/
    gab_sjkfwbs: string
    /**公安部-数据来源系统分类代码*/
    gab_sjlyxtfldm: string
    /**汇集层更新时间*/
    hjc_gxsj: string
}

interface SearchDrugAddictorsData {
    pageNum: number
    pageSize: number
}

interface SearchDrugAddictorsResult {
    success: Boolean
    data: {
        list: DrugAddict[]
        size: number
    }
}

interface DrugAddict {
    /**姓名*/
    XM: string
    /**公民身份号码*/
    GMSFHM: string
    /**吸毒编号*/
    XDBH: string
    /**现住地详址*/
    XZDXZ: string
    /**备注*/
    BZ: string
    /**修改人姓名*/
    XGRXM: string
    /**修改单位名称*/
    XGDWMC: string
    /**人员修改时间*/
    XGSJ: string
    /**填报人*/
    DJR: string
    /**填报单位名称*/
    DJDWMC: string
    /**填报日期*/
    DJSJ: string
}
