import React, { useEffect, useState } from "react"
import { SettingOutlined } from "@ant-design/icons"
import { Dropdown, Layout, Menu, MenuProps } from "antd"
import Styles from "./index.module.less"
import { useSession } from "../../store/index"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import routes from "../../routes"
import { getPng } from "../../utils/index"
import BreadcrumbIcon from "../../assets/SystemManagement/BreadcrumbIcon.png"
import { logoutQuery } from "../../api/login"
import useOperates from "../../store/operates"
import getBreaks from "../../utils/getBreaks"
import { nanoid } from "nanoid"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

const { Header, Content, Sider } = Layout

type MenuChange = {
    domEvent: any
    key: string
    keyPath: string[]
}

interface Break {
    id: string
    name: string | undefined
}

const LayoutFC: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [showTitle, setShowTitle] = useState(true)
    const [breaks, setBreaks] = useState<Break[]>([])
    const navigate = useNavigate()
    const location = useLocation()
    const sessionStore = useSession()
    const operates = useOperates()

    const superAdminMenu: MenuProps["items"] = sessionStore.menu.map(e => {
        if (e.children && e.children.length > 0 && e.children.find(x => x.children)) {
            return {
                key: e.path,
                label: e.name,
                children: e.children.map(a => {
                    if (a.name === "日志") {
                        return {
                            key: a.path,
                            label: a.name
                        }
                    }
                    if (a.children && a.children.length && a.children.find(x => x.children)) {
                        return {
                            key: a.path,
                            label: a.name,
                            children: a.children.map(b => {
                                if (b.children && b.children.length && b.children.find(x => x.children)) {
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

    const menuList: MenuProps["items"] = routes.map(e => {
        return {
            key: e.path,
            label: e.name,
            icon: e.icon,
            children: e.children?.map(a => {
                return {
                    key: a.path,
                    label: a.name,
                    children: a.children?.map(b => {
                        return {
                            key: b.path,
                            label: b.name
                        }
                    })
                }
            })
        }
    })

    useEffect(() => {
        setBreaks(
            location.pathname
                .split("/")
                .filter(e => e !== "")
                .map(e => getBreaks(e))
                .flat()
                .filter(e => e)
                .map(e => {
                    return {
                        id: nanoid(),
                        name: e
                    }
                })
        )
    }, [location])

    const BreakMenu: React.FC = () => {
        return (
            <>
                <div className={c("breaks")}>
                    <img src={BreadcrumbIcon} alt="" />
                    <div className={c("text-group")}>
                        {breaks.map((e, index) => {
                            return (
                                <div key={e.id} className={index == breaks.length - 1 ? c("current") : c("prev")}>
                                    {index !== 0 && "/ "}
                                    {e.name}
                                </div>
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

    const logout = async () => {
        const res = await logoutQuery({})
        res && res.success && ((operates[0].item = []), sessionStore.setState({ token: undefined, menu: [] }), sessionStorage.removeItem("token"), navigate(`/login?${encodeURIComponent("from=" + location.pathname + location.search)}`, { replace: true }))
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
                <Sider trigger={null} style={{ width: "200px", background: "#FFF", height: "920px" }} collapsed={collapsed} collapsible>
                    <Menu mode="inline" defaultOpenKeys={[location.pathname.split("/")[1]]} selectedKeys={[location.pathname.split("/").slice(-1).toString()]} items={sessionStore.menu.length ? superAdminMenu : menuList} onClick={changeRoute} />
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
