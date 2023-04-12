import { Button } from "antd"
import React, { useEffect, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { useSession } from "../../store"
import UsernameIcon from "../../assets/usernameIcon.png"
import Captcha from "../../assets/Login/Captcha.png"
import Logo from "../../assets/logo.png"
import styles from "./index.module.less"
import { getCaptcha, login } from "../../api/login"
import useAccount from "../../store/account"

const Login: React.FC = () => {
    const [userNo, setUserNo] = useState("")
    const sessionStore = useSession()
    const [searchParams] = useSearchParams()
    const from = searchParams.get("from")
    const [captcha, setCaptcha] = useState("")
    const [account, setAccount] = useAccount()

    useEffect(() => {
        getImgUrl()
    }, [userNo])

    const getImgUrl = () => {
        getCaptcha({
            userNo: userNo
        }).then(res => {
            res && setCaptcha(res.data)
        })
    }

    const submit = () => {
        login({
            code: captcha,
            userNo: userNo
        }).then(res => {
            if (res) {
                sessionStorage.setItem("token", res.data.token)
                sessionStore.setState({ token: res.data.token })
                setAccount({login: res.data.token})
                if (res.data.user === "superAdmin") {
                    sessionStore.setState({ userType: res.data.user })
                    return
                }
                if (res.data.user instanceof Array) {
                    sessionStore.setState({
                        menu: res.data.user.map(e => {
                            if (e.childList && e.childList.length > 0) {
                                return {
                                    name: e.permissionName,
                                    path: e.permissionPath,
                                    children: e.childList.map(a => {
                                        if (a.childList && a.childList.length > 0) {
                                            return {
                                                name: a.permissionName,
                                                path: a.permissionPath,
                                                children: a.childList.map(b => {
                                                    if (b.childList && b.childList.length > 0) {
                                                        return {
                                                            name: b.permissionName,
                                                            path: b.permissionPath,
                                                            children: b.childList.map(c => {
                                                                if (c.childList && c.childList.length > 0) {
                                                                    return {
                                                                        name: c.permissionName,
                                                                        path: c.permissionPath,
                                                                        children: c.childList.map(d => {
                                                                            return {
                                                                                name: d.permissionName,
                                                                                path: d.permissionPath
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                return {
                                                                    name: c.permissionName,
                                                                    path: c.permissionPath
                                                                }
                                                            })
                                                        }
                                                    }
                                                    return {
                                                        name: b.permissionName,
                                                        path: b.permissionPath
                                                    }
                                                })
                                            }
                                        }
                                        return {
                                            name: a.permissionName,
                                            path: a.permissionPath
                                        }
                                    })
                                }
                            }
                            return {
                                name: e.permissionName,
                                path: e.permissionPath
                            }
                        })
                    })
                    return
                }
            }
        })
    }

    return sessionStore.token ? (
        <Navigate to={from ? decodeURIComponent(from) : "/"} replace={true} />
    ) : (
        <div className={styles["login"]}>
            <div className={styles["top-part"]}></div>
            <div className={styles["bottom-part"]}></div>
            <div className={styles["center"]}>
                <div className={styles["left"]}></div>
                <div className={styles["right"]}>
                    <div className={styles["login-form"]}>
                        <img className={styles["logo"]} src={Logo} alt="" />
                        <div className={styles["title"]}>深海后台管理系统</div>
                        <div className={styles["input-css"]}>
                            <img src={UsernameIcon} alt="" />
                            <div className={styles["box"]}>
                                <input type="text" placeholder="请输入账号" value={userNo} onChange={e => setUserNo(e.target.value)} />
                            </div>
                        </div>
                        <div className={styles["input-css"]}>
                            <img src={Captcha} alt="" />
                            <div className={styles["box"]}>
                                <input placeholder="请输入验证码" onKeyDown={e => e.key === "Enter" && submit()} value={captcha} onChange={e => setCaptcha(e.target.value)} />
                            </div>
                        </div>
                        <Button onClick={submit} className={styles["login-btn"]}>
                            登录
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
