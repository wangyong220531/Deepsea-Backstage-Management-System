import React, { useEffect, useState } from "react"
import { SettingOutlined } from "@ant-design/icons"
import { Dropdown, Layout, Menu, MenuProps } from "antd"
import styles from "./index.module.less"
import { useLocal, useSession } from "../../store/index"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import routes from "../../routes"
import { getPng } from "../../utils"
import dayjs from "dayjs"

const { Header, Content, Sider } = Layout

type MenuChange = {
    domEvent: any
    key: string
    keyPath: string[]
}

// const Time: React.FC = () => {
//     const [time, setTime] = useState(dayjs())

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setTime(dayjs())
//         }, 1000)
//         return () => {
//             clearTimeout(timer)
//         }
//     }, [time])

//     return (
//         <>
//             <div className={styles["time"]}>{dayjs(time).format("YYYY年MM月DD日 HH:mm:ss")}</div>
//         </>
//     )
// }

const LayoutFC: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [showTitle, setShowTitle] = useState(true)
    // const [breaks, setBreaks] = useState<RouteChild[] | null>(null)
    const local = useLocal()
    const session = useSession()
    const navigate = useNavigate()
    const location = useLocation()

    const menuList: MenuProps["items"] = routes.map(route => {
        return {
            key: route.path,
            label: route.name,
            icon: route.icon,
            children: route.children?.map(r => {
                return {
                    key: r.path,
                    label: r.name,
                    children: r.children?.map(sr => {
                        return {
                            key: sr.path,
                            label: sr.name
                        }
                    })
                }
            })
        }
    })

    // function getBreak(Path: string) {
    //     return routes.map(item => (item.path === Path ? item : item.children?.find(item => item.path === Path))).filter(item => item !== undefined)
    // }

    // useEffect(() => {
    //     setBreaks(
    //         location.pathname
    //             .split("/")
    //             .filter(item => item !== "")
    //             .map(item => getBreak(item))
    //             .flat(2) as RouteChild[]
    //     )
    // }, [location])

    // const BreakMenu: React.FC = () => {
    //     return (
    //         <>
    //             <div className={styles["breaks"]}>
    //                 {breaks &&
    //                     breaks.map((item, index) => {
    //                         return (
    //                             <React.Fragment key={item.path}>
    //                                 {index !== 0 && "/"}
    //                                 {item.name}
    //                             </React.Fragment>
    //                         )
    //                     })}
    //             </div>
    //         </>
    //     )
    // }

    const Title: React.FC = () => {
        return (
            <div className={styles["title"]}>
                <img src={getPng("police-icon")} alt="" />
                {showTitle && <div className={styles["title-text"]}>深海后台管理系统</div>}
            </div>
        )
    }

    const changeRoute = (value: MenuChange) => {
        if (value.keyPath.length === 1) {
            navigate(`/${value.key}`, { replace: true })
            return
        }
        if (value.keyPath.length === 2) {
            navigate(`/${value.keyPath[1]}/${value.key}`, { replace: true })
            return
        }
        if (value.keyPath.length === 3) {
            navigate(`${value.keyPath[2]}/${value.keyPath[1]}/${value.key}`, { replace: true })
            return
        }
    }

    const logout = () => {
        session.setState({ token: undefined })
        navigate(`/login?from=${location.pathname + location.search}`, { replace: true })
    }

    const items: MenuProps["items"] = [
        {
            label: (
                <div className={styles["logout"]} onClick={logout}>
                    退出登录
                </div>
            ),
            key: 0
        }
    ]

    return (
        <Layout>
            <Header style={{ background: "#2a58ad", height: "64px" }} className={styles["header"]}>
                <Title></Title>
                {/* <BreakMenu></BreakMenu> */}
                <Dropdown menu={{ items }} trigger={["click"]}>
                    <SettingOutlined className={styles["setting"]} />
                </Dropdown>
            </Header>

            <Layout hasSider>
                <Sider trigger={null} style={{ width: "200px", background: local.themeColor, height: "100vh" }} collapsed={collapsed} collapsible>
                    <Menu mode="inline" defaultOpenKeys={[location.pathname.split("/")[1]]} selectedKeys={[location.pathname.split("/").slice(-1).toString()]} style={{ height: "calc(100vh-64px)", borderRight: 0 }} items={menuList} onClick={changeRoute} />
                </Sider>
                <Content style={{ margin: "24px", height: "calc(100vh-112px)" }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutFC
