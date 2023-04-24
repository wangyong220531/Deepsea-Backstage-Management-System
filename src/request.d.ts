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
    "/captcha2": GetCaptchaResult
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
    "/captcha2": { userNo: string }
    "/monitor/loginLog/export": {}
    "/monitor/operationLog/export": {}
    "/system/user/export": {}
    "/logout": {}
    "/wisdom/apply/deleteFeedback": { id: string }
    "/report/queryAllUnit": {}
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
    remark: string
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
    id: string
    type: string
    applyNo: string
    info: string
    toUser: string
    wisdomUnit: string
    policeKind: string
    manageArea: string
    status: string
    bmNo: string
    remark: string
    createTime: string
    createOperator: string
    feedbackVos: []
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
    remark: "Login" | "Logout"
}

interface GetCaptchaResult {
    data: string
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
    data: Evaluate[]
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
