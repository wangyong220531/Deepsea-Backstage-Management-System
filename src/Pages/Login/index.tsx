import { Button } from "antd"
import React, { useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { useSession } from "../../store"
import UsernameIcon from "../../assets/usernameIcon.png"
import Captcha from "../../assets/Login/Captcha.png"
import Logo from "../../assets/logo.png"
import Styles from "./index.module.less"
import { getCaptcha, login } from "../../api/login"
import useOperates from "../../store/operates"
import { handlePermission, handleOperates } from "../../utils/recursive"

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

    const submit = async () => {
        // sessionStore.setState({token:"123"})
        const res = await login({
            code: captcha,
            userNo,
            source: 1
        })
        if (res) {
            sessionStore.setState({ token: res.data.token, userNo: userNo, userId: res.data.userId })
            if (res.data.user === "superAdmin") {
                sessionStore.setState({ userType: res.data.user })
                return
            }
            if (res.data.user instanceof Array) {
                sessionStore.setState({
                    menu: handlePermission(res.data.user)
                })
                operates[0].item = handleOperates(res.data.user)
                return
            }
            if (!res.data.user) {
                sessionStore.setState({
                    menu: [{ name: "首页", path: "home" }]
                })
                return
            }
        }
    }

    const [captchaBtnDisable, setCaptchaBtnDisable] = useState(false)
    const [captchaBtnText, setCaptchaBtnText] = useState("获取验证码")

    const queryCaptcha = () => {
        getCaptcha({
            param: userNo
        }).then(res => {
            res && setUserNo(res.data.userNo)
        })
        setCaptchaBtnDisable(true)
        CaptchaCountdown()
    }

    const CaptchaCountdown = () => {
        let time = 60
        const timer = setInterval(() => {
            if (time == 0) {
                clearInterval(timer)
                setCaptchaBtnDisable(false)
                setCaptchaBtnText("重新发送")
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
