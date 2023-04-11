import { Button } from "antd"
import React, { useEffect, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { useLocal,useSession } from "../../store"
import UsernameIcon from "../../assets/usernameIcon.png"
import Captcha from "../../assets/Login/Captcha.png"
import Logo from "../../assets/logo.png"
import styles from "./index.module.less"
import { getCaptcha } from "../../api/login"

const Login: React.FC = () => {
    const [userNo, setUserNo] = useState("082845")
    const localStore = useLocal()
    const sessionStore = useSession()
    const [searchParams] = useSearchParams()
    const from = searchParams.get("from")
    const [captcha, setCaptcha] = useState("")

    const getImgUrl = () => {
        getCaptcha({
            userNo: userNo
        }).then(res => {
            res && console.log(res.data);
        })
    }

    useEffect(() => {
        getImgUrl()
    }, [userNo])

    const submit = () => {
        sessionStore.setState({ token: "ssssssasas12121212" })
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
