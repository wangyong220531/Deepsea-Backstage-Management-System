import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { Button } from "antd"
import React, { useEffect, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { useSession } from "../../store"
import UsernameIcon from "../../assets/usernameIcon.png"
import Captcha from "../../assets/Login/Captcha.png"
import Logo from "../../assets/logo.png"
import styles from "./index.module.less"
import { getCaptcha } from "../../api/login"

const Login: React.FC = () => {
    
    const [userName, setUserName] = useState("082845")

    useEffect(() => {
        getCaptcha({
            userNo: userName
        })
    },[userName])

    const store = useSession()
    const [showPwd, setShowPwd] = useState(false)
    const [password, setPassword] = useState("deepsea")
    const [searchParams] = useSearchParams()
    const from = searchParams.get("from")
    const submit = () => {
        store.setState({ token: "ssssssasas12121212" })
    }
    return store.token ? (
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
                                <input type="text" placeholder="请输入账号" value={userName} onChange={e => setUserName(e.target.value)} />
                            </div>
                        </div>
                        <div className={styles["input-css"]}>
                            <img src={Captcha} alt="" />
                            <div className={styles["box"]}>
                                <input type={showPwd ? "text" : "password"} placeholder="请输入密码" onKeyDown={e => e.key === "Enter" && submit()} value={password} onChange={e => setPassword(e.target.value)} />
                                {/* <div className={styles["password"]} onClick={() => setShowPwd(!showPwd)}>
                                    {showPwd ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </div> */}
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
