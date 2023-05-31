import { FC } from "react"
import styles from "./index.module.less"
import TitleBg from "../../assets/Stability/titleBg.png"
import BothSideDecor from "../../assets/Stability/bothSideDecor.png"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

const StabilityHeader: FC = () => {
    return (
        <div className={c("stability-header")}>
            <img src={BothSideDecor} alt="" className={c("left-deco")} />
            <div className={c("title")}>
                <img className={c("title-bg")} src={TitleBg} alt="" />
                <div className={c("title-text")}>涉稳重点人员感知轨迹看板</div>
            </div>
            <img src={BothSideDecor} alt="" className={c("right-deco")} />
        </div>
    )
}

export default StabilityHeader
