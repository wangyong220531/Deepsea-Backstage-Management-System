import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import styles from "./index.module.less"

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className={styles["not-found"]}>
            <div className={styles["main"]}>
                <div className={styles["text"]}>页面找不到</div>
                <Button onClick={() => navigate(-1)} type="primary" className={styles["goback"]}>
                    返回上一页
                </Button>
            </div>
        </div>
    )
}
