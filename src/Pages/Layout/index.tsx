import React, { useEffect, useState } from "react"
import { SettingOutlined } from "@ant-design/icons"
import { Dropdown, Layout, Menu, MenuProps } from "antd"
import Styles from "./index.module.less"
import { useLocal, useSession } from "../../store/index"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import routes, { RouteChild } from "../../routes"
import { getPng } from "../../utils"
import BreadcrumbIcon from "../../assets/SystemManagement/BreadcrumbIcon.png"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

const { Header, Content, Sider } = Layout

type MenuChange = {
    domEvent: any
    key: string
    keyPath: string[]
}

const LayoutFC: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [showTitle, setShowTitle] = useState(true)
    const [breaks, setBreaks] = useState<RouteChild[] | null>(null)
    const local = useLocal()
    const session = useSession()
    const navigate = useNavigate()
    const location = useLocation()
    const sessionStore = useSession()
    console.log(sessionStore.menu)

    const menuList: MenuProps["items"] = sessionStore.menu.map(e => {
        if (e.children && e.children.length > 0) {
            return {
                key: e.path,
                label: e.name,
                children: e.children.map(a => {
                    if (a.children && a.children.length > 0 && a.children.find(x => x.children)) {
                        return {
                            key: a.path,
                            label: a.name,
                            children: a.children.map(b => {
                                if (b.children && b.children.length > 0 && b.children.find(x => x.children)) {
                                    return {
                                        key: b.path,
                                        label: b.name
                                    }
                                }
                                return {
                                    key: b.path,
                                    label: b.name
                                }
                            })
                        }
                    }
                    return {
                        key: a.path,
                        label: a.name
                    }
                })
            }
        }
        return {
            key: e.path,
            label: e.name
        }
    })

    function getBreak(Path: string) {
        return routes.map(item => (item.path === Path ? item : item.children?.find(item => item.path === Path))).filter(item => item !== undefined)
    }

    useEffect(() => {
        setBreaks(
            location.pathname
                .split("/")
                .filter(item => item !== "")
                .map(item => getBreak(item))
                .flat(2) as RouteChild[]
        )
    }, [location])

    const BreakMenu: React.FC = () => {
        return (
            <>
                <div className={c("breaks")}>
                    <img src={BreadcrumbIcon} alt="" />
                    <div>
                        {breaks &&
                            breaks.map((item, index) => {
                                return (
                                    <React.Fragment key={item.path}>
                                        {index !== 0 && "/"}
                                        {item.name}
                                    </React.Fragment>
                                )
                            })}
                    </div>
                </div>
            </>
        )
    }

    const Title: React.FC = () => {
        return (
            <div className={c("title")}>
                <img src={getPng("police-icon")} alt="" />
                {showTitle && <div className={c("title-text")}>深海后台管理系统</div>}
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
        navigate(`/login?${encodeURIComponent("from=" + location.pathname + location.search)}`, { replace: true })
    }

    const items: MenuProps["items"] = [
        {
            label: (
                <div className={c("logout")} onClick={logout}>
                    退出登录
                </div>
            ),
            key: 0
        }
    ]

    return (
        <Layout className={c("layout")}>
            <Header style={{ background: "#2a58ad", height: "64px" }} className={c("header")}>
                <Title></Title>
                <Dropdown menu={{ items }} trigger={["click"]}>
                    <SettingOutlined className={c("setting")} />
                </Dropdown>
            </Header>
            <Layout hasSider>
                <Sider trigger={null} style={{ width: "200px", background: local.themeColor, height: "920px" }} collapsed={collapsed} collapsible>
                    <Menu mode="inline" defaultOpenKeys={[location.pathname.split("/")[1]]} selectedKeys={[location.pathname.split("/").slice(-1).toString()]} items={menuList} onClick={changeRoute} />
                </Sider>
                <BreakMenu></BreakMenu>
                <Content className={c("content")}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutFC
