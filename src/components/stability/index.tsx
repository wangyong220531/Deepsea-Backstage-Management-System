import { FC } from "react"
import TitleBg from "../../assets/Stability/titleBg.png"
import BothSideDecor from "../../assets/Stability/bothSideDecor.png"
import SubTitle from "../../assets/Stability/subTitleBg.png"
import Musk from "../../assets/Stability/musk.webp"
import PortraitBorder from "../../assets/Stability/portraitBorder.png"
import styles from "./index.module.less"
import { nanoid } from "nanoid"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

function o(className: string | undefined | null | boolean) {
    return typeof className === "string" ? `_${className}` : className
}

interface Portrait {
    id: string
    imgSrc: string
    name: String
    cameraName: String
    time: String
}

const stability: FC = () => {
    const portraitList: Portrait[] = [
        {
            id: nanoid(),
            imgSrc: Musk,
            name: "马斯克",
            cameraName: "相机名城",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Musk,
            name: "马斯克",
            cameraName: "相机名城",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Musk,
            name: "马斯克",
            cameraName: "相机名城",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Musk,
            name: "马斯克",
            cameraName: "相机名城",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Musk,
            name: "马斯克",
            cameraName: "相机名城",
            time: "2023/05/21 21:02:45"
        },
        { id: nanoid(), imgSrc: Musk, name: "马斯克", cameraName: "相机名城", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Musk, name: "马斯克", cameraName: "相机名城", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Musk, name: "马斯克", cameraName: "相机名城", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Musk, name: "马斯克", cameraName: "相机名城", time: "2023/05/21 21:02:45" }
    ]

    return (
        <div className={c("stability")}>
            <div className={c("header")}>
                <img src={BothSideDecor} alt="" className={c("left-deco")} />
                <div className={c("title")}>
                    <img className={c("title-bg")} src={TitleBg} alt="" />
                    <div className={c("title-text")}>涉稳重点人员感知轨迹看板</div>
                </div>
                <img src={BothSideDecor} alt="" className={c("right-deco")} />
            </div>
            <div className={c("content")}>
                <div className={c("category")}>
                    <div className={c("left-label")}>
                        <img src={SubTitle} alt="" className={c("label-bg")} />
                        <div className={c("text")}>出城公共交通工具感知人员（12人）</div>
                    </div>
                    <div className={c("portrait-list")}>
                        {portraitList.map(e => {
                            return (
                                <>
                                    <div className={c("wrapper")} key={e.id}>
                                        <img src={PortraitBorder} alt="" className={c("border")} />
                                        <img src={e.imgSrc} alt="" className={c("img")} />
                                        <div className={c("name")}>{e.name}</div>
                                        <div className={c("desc")}>
                                            <div className={c("camera-name")}>{e.cameraName}</div>
                                            <div className={c("time")}>{e.time}</div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
                <div className={c("category")}>
                    <div className={c("left-label")}>
                        <img src={SubTitle} alt="" className={c("label-bg")} />
                        <div className={c("text")}>24小时无轨迹人员（10人）</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default stability
