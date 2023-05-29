import { FC, useState } from "react"
import styles from "./index.module.less"
import People from "../../assets/Stability/people.png"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

interface Tab {
    no: number
    text: string
}

const StabilitySecSection: FC = () => {
    const [activedTab, setActivedTab] = useState(0)
    const tabList: Tab[] = [
        {
            no: 0,
            text: "全部"
        },
        {
            no: 1,
            text: "置顶人员"
        },
        {
            no: 2,
            text: "一级人员"
        },
        {
            no: 3,
            text: "二级人员"
        },
        {
            no: 4,
            text: "三级人员"
        }
    ]

    const tabClick = (e: Tab) => {
        setActivedTab(e.no)
    }

    return (
        <div className={c("stabilitySecSection")}>
            <div className={c("tabs")}>
                {tabList.map(e => {
                    return (
                        <button key={e.no} className={activedTab === e.no ? c("actived-tab") : c("tab-btn")} onClick={() => tabClick(e)}>
                            {e.text}
                        </button>
                    )
                })}
            </div>
            <div className={c("content")}>
                <div className={c("section")}>
                    <div className={c("title")}>
                        <img className={c("ppl-img")} src={People} alt="" />
                        <div className={c("sub-title")}>置顶人员（5人）</div>
                        <div className={c("see-his-tracks")}>查看本人员轨迹</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StabilitySecSection
