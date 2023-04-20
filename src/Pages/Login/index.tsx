import { Button, message } from "antd"
import React, { useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { useSession } from "../../store"
import UsernameIcon from "../../assets/usernameIcon.png"
import Captcha from "../../assets/Login/Captcha.png"
import Logo from "../../assets/logo.png"
import Styles from "./index.module.less"
import { getCaptcha, login } from "../../api/login"
import useOperates from "../../utils/operates"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

const Login: React.FC = () => {
    const [userNo, setUserNo] = useState("")
    const sessionStore = useSession()
    const [searchParams] = useSearchParams()
    const from = searchParams.get("from")
    const [captcha, setCaptcha] = useState("")
    const operates = useOperates()

    const submit = () => {
        sessionStore.setState({ token: "123", userNo: userNo })
        // login({
        //     code: captcha,
        //     userNo: userNo
        // }).then(res => {
        //     if (res) {
        //         sessionStorage.setItem("token", res.data.token)
        //         sessionStore.setState({ token: res.data.token })
        //         sessionStore.setState({ userId: res.data.userId })
        //         if (res.data.user === "superAdmin") {
        //             sessionStore.setState({ userType: res.data.user })
        //             console.log(1);

        //             return
        //         }
        //         if (res.data.user instanceof Array) {
        //             sessionStore.setState({
        //                 menu: res.data.user.map(e => {
        //                     if (e.childList && e.childList.length > 0) {
        //                         return {
        //                             name: e.permissionName,
        //                             path: e.permissionPath,
        //                             children: e.childList.map(a => {
        //                                 if (a.childList && a.childList.length > 0) {
        //                                     return {
        //                                         name: a.permissionName,
        //                                         path: a.permissionPath,
        //                                         children: a.childList.map(b => {
        //                                             if (b.childList && b.childList.length > 0) {
        //                                                 return {
        //                                                     name: b.permissionName,
        //                                                     path: b.permissionPath,
        //                                                     children: b.childList.map(c => {
        //                                                         if (c.childList && c.childList.length > 0) {
        //                                                             return {
        //                                                                 name: c.permissionName,
        //                                                                 path: c.permissionPath,
        //                                                                 children: c.childList.map(d => {
        //                                                                     return {
        //                                                                         name: d.permissionName,
        //                                                                         path: d.permissionPath
        //                                                                     }
        //                                                                 })
        //                                                             }
        //                                                         }
        //                                                         return {
        //                                                             name: c.permissionName,
        //                                                             path: c.permissionPath
        //                                                         }
        //                                                     })
        //                                                 }
        //                                             }
        //                                             return {
        //                                                 name: b.permissionName,
        //                                                 path: b.permissionPath
        //                                             }
        //                                         })
        //                                     }
        //                                 }
        //                                 return {
        //                                     name: a.permissionName,
        //                                     path: a.permissionPath
        //                                 }
        //                             })
        //                         }
        //                     }
        //                     return {
        //                         name: e.permissionName,
        //                         path: e.permissionPath
        //                     }
        //                 })
        //             })
        //             operates[0].item = res.data.user.map(e => {
        //                 if (e.childList && e.childList.length > 0) {
        //                     return {
        //                         id: e.id,
        //                         permissionName: e.permissionName,
        //                         children: e.childList.map(a => {
        //                             if (a.childList && a.childList.length > 0) {
        //                                 return {
        //                                     id: a.id,
        //                                     permissionName: a.permissionName,
        //                                     children: a.childList.map(b => {
        //                                         if (b.childList && b.childList.length > 0) {
        //                                             return {
        //                                                 id: b.id,
        //                                                 permissionName: b.permissionName,
        //                                                 children: b.childList.map(c => {
        //                                                     if (b.childList && b.childList.length > 0) {
        //                                                         return {
        //                                                             id: c.id,
        //                                                             permissionName: c.permissionName,
        //                                                             children: c.childList
        //                                                         }
        //                                                     }
        //                                                     return {
        //                                                         id: c.id,
        //                                                         permissionName: c.permissionName
        //                                                     }
        //                                                 })
        //                                             }
        //                                         }
        //                                         return {
        //                                             id: b.id,
        //                                             permissionName: b.permissionName
        //                                         }
        //                                     })
        //                                 }
        //                             }
        //                             return {
        //                                 id: a.id,
        //                                 permissionName: a.permissionName
        //                             }
        //                         })
        //                     }
        //                 }
        //                 return {
        //                     id: e.id,
        //                     permissionName: e.permissionName
        //                 }
        //             })
        //             console.log(2,operates[0].item);

        //             return
        //         }
        //     }
        // })
    }

    const [captchaBtnDisable, setCaptchaBtnDisable] = useState(false)
    const [captchaBtnText, setCaptchaBtnText] = useState("获取验证码")

    const queryCaptcha = () => {
        if (userNo.split("").length === 6) {
            getCaptcha({
                userNo: userNo
            }).then(res => {
                res && setCaptcha(res.data)
            })
            setCaptchaBtnDisable(true)
            CaptchaCountdown()
            return
        }
        return message.warning("请输入合法的账号！")
    }

    const CaptchaCountdown = () => {
        let time = 5
        const timer = setInterval(() => {
            if (time == 0) {
                clearInterval(timer)
                setCaptchaBtnDisable(false)
                setCaptchaBtnText("获取验证码")
                return
            }
            setCaptchaBtnText(`${time}s 后重新获取`)
            time--
        }, 1000)
    }

    return sessionStore.token ? (
        <Navigate to={from ? decodeURIComponent(from) : "/"} replace={true} />
    ) : (
        <div className={c("login")}>
            <div className={c("top-part")}></div>
            <div className={c("bottom-part")}></div>
            <div className={c("center")}>
                <div className={c("left")}></div>
                <div className={c("right")}>
                    <div className={c("login-form")}>
                        <img className={c("logo")} src={Logo} alt="" />
                        <div className={c("title")}>深海后台管理系统</div>
                        <div className={c("input-css")}>
                            <img src={UsernameIcon} alt="" />
                            <div className={c("box")}>
                                <input type="text" placeholder="请输入账号" value={userNo} onChange={e => setUserNo(e.target.value)} />
                            </div>
                        </div>
                        <div className={c("input-css")}>
                            <img src={Captcha} alt="" />
                            <div className={c("box")}>
                                <input className={c("captcha-input")} placeholder="请输入验证码" onKeyDown={e => e.key === "Enter" && submit()} value={captcha} onChange={e => setCaptcha(e.target.value)} />
                            </div>
                            <Button className={c("query-captcha-button")} disabled={captchaBtnDisable} onClick={queryCaptcha}>
                                {captchaBtnText}
                            </Button>
                        </div>
                        <Button onClick={submit} className={c("login-btn")}>
                            登录
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
