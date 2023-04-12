import { BankOutlined, BranchesOutlined, HomeOutlined, RadarChartOutlined, FileDoneOutlined, SubnodeOutlined, AppstoreOutlined } from "@ant-design/icons"
import { ReactNode } from "react"
import Area from "../components/Neighborhood"
import Command from "../components/Command"
import Home from "../components/Home/index"
import Disposal from "../components/Disposal"
import Follow from "../components/Follow"
import Lib from "../components/Lib"
import Analysis from "../components/Analysis"
import Tekken from "../components/Tekken"
import DutyManage from "../components/DutyManage"
import DutyAnanlysis from "../components/DutyAnanlysis"
import ReqServer from "../components/ReqServer"
import Application from "../components/Application"
import School from "../components/School"
import Wisdom from "../components/Plus"
import WisdomUnit from "../components/WisdomUnit"
import StormThinking from "../components/StormThinking"
import SystemManagement from "../components/SystemManagement"
import UserManage from "../components/UserManage"
import RoleManage from "../components/RoleManage"
import OperateLogs from "../components/OperateLogs"
import { useSession } from "../store"


export interface RouteChild {
    name: string
    path: string
    component: ReactNode
    children?: RoutGrand[]
}

export interface RoutGrand {
    name: string
    path: string
    component: ReactNode
}

export interface Route {
    name: string
    path: string
    component: ReactNode
    children?: RouteChild[]
    icon: ReactNode
}

const routes: Route[] = [
    {
        name: "首页",
        path: "home",
        component: <Home />,
        icon: <HomeOutlined />
    },
    {
        name: "指挥",
        path: "command",
        component: <Command />,
        icon: <RadarChartOutlined />,
        children: [
            {
                name: "警情处置",
                path: "disposal",
                component: <Disposal />,
                children: [
                    {
                        name: "跟进处置",
                        path: "follow",
                        component: <Follow />
                    },
                    {
                        name: "警情库",
                        path: "lib",
                        component: <Lib />
                    },
                    {
                        name: "派警分析",
                        path: "analysis",
                        component: <Analysis />
                    }
                ]
            },
            {
                name: "铁拳勤务",
                path: "tekken",
                component: <Tekken />,
                children: [
                    {
                        name: "勤务管理",
                        path: "dutyManage",
                        component: <DutyManage />
                    },
                    {
                        name: "勤务分析",
                        path: "dutyAnalysis",
                        component: <DutyAnanlysis />
                    }
                ]
            }
        ]
    },
    {
        name: "请求服务",
        path: "reqServer",
        component: <ReqServer />,
        icon: <FileDoneOutlined />
    },
    {
        name: "智慧+",
        path: "plus",
        component: <Wisdom />,
        icon: <SubnodeOutlined />
    },
    {
        name: "智慧单元",
        path: "wisdomUnit",
        component: <WisdomUnit />,
        icon: <BankOutlined />,
        children: [
            {
                name: "智慧应用",
                path: "application",
                component: <Application />
            },
            {
                name: "智慧安防小区",
                path: "area",
                component: <Area />
            },
            {
                name: "智慧安防校园",
                path: "school",
                component: <School />
            }
        ]
    },
    {
        name: "风暴思维",
        path: "stormthinking",
        component: <StormThinking />,
        icon: <BranchesOutlined />
    },
    {
        name: "系统管理",
        path: "systemManagement",
        component: <SystemManagement />,
        icon: <AppstoreOutlined />,
        children: [
            {
                name: "用户管理",
                path: "userManagement",
                component: <UserManage />
            },
            {
                name: "角色管理",
                path: "roleManage",
                component: <RoleManage />
            },
            {
                name: "操作日志",
                path: "operateLogs",
                component: <OperateLogs />
            }
        ]
    }
]

export default routes
