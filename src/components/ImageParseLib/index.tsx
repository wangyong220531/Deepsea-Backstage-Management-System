import { FC } from "react"
import styles from "./index.module.less"
import { Tabs, TabsProps } from "antd"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

function o(className: string | undefined | null | boolean) {
    return typeof className === "string" ? `_${className}` : className
}

const ImageParseLib: FC = () => {

    const tabItems: TabsProps["items"] = [
        {
            key: "1",
            label: "实名库"
        },
        {
            key: "2",
            label: "未实名库"
        }
    ]

    const tabChange = () => {

    }

    return (
        <div className={c("imageParseLib")}>
            <div className={c("tabs")}>
                <Tabs defaultActiveKey="1" items={tabItems} onChange={tabChange} />
            </div>
        </div>
    )
}

export default ImageParseLib