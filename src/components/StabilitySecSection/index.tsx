import { FC, ReactNode } from "react"
import styles from "./index.module.less"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

export interface StabilitySecSectionProps {}

const StabilitySecSection: FC = () => {
    const tabClick = (e: EventTarget) => {
        console.log(e)
    }
    return (
        <div className={c("stabilitySecSection")}>
            <div className={c("tabs")}>
                <button className={c("tab-btn")} onClick={e => tabClick(e.target)}>
                    全部
                </button>
                <button className={c("tab-btn")} onClick={e => tabClick(e.target)}>
                    置顶人员
                </button>
                <button className={c("tab-btn")} onClick={e => tabClick(e.target)}>
                    一级人员
                </button>
                <button className={c("tab-btn")} onClick={e => tabClick(e.target)}>
                    二级人员
                </button>
                <button className={c("tab-btn")} onClick={e => tabClick(e.target)}>
                    三级人员
                </button>
            </div>
        </div>
    )
}

export default StabilitySecSection
