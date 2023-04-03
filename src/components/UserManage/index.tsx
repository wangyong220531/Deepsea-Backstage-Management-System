import { FC } from "react"
import styles from "./index.module.less"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

const UserManage: FC = () => {

    return (
        <div className={c("userManage")}>
            
        </div>
    )
}

export default UserManage