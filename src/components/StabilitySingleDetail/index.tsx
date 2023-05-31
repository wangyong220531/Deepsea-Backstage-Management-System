import { FC } from "react"
import styles from "./index.module.less"
import StabilityHeader from "../StabilityHeader"
import StabilityDetailInfoCard from "../StabilityDetailInfoCard"
import SubTitleLeft from "../../assets/Stability/labelLeft.png"
import SubTitleRight from "../../assets/Stability/labelRight.png"
import SubTitleMid from "../../assets/Stability/labelMid.png"
import { nanoid } from "nanoid"
import PotraitTest from "../../assets/Stability/TestImgs/DownLoadFile122.jpg"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

export interface StabilitySingleDetailProps {}

interface ComparisonPortrait {
    id: string
    imgSrc: string
    rate: string
    address: string
    time: string
}

const StabilitySingleDetail: FC<StabilitySingleDetailProps> = props => {
    const {} = props

    const portraitComparisonList: ComparisonPortrait[] = [
        {
            id: nanoid(),
            imgSrc: PotraitTest,
            rate: "88.1",
            address: "珠海路001",
            time: "2023-05-23 15:22:36"
        },
        {
            id: nanoid(),
            imgSrc: PotraitTest,
            rate: "88.1",
            address: "珠海路001",
            time: "2023-05-23 15:22:36"
        },
        {
            id: nanoid(),
            imgSrc: PotraitTest,
            rate: "88.1",
            address: "珠海路001",
            time: "2023-05-23 15:22:36"
        },
        {
            id: nanoid(),
            imgSrc: PotraitTest,
            rate: "88.1",
            address: "珠海路001",
            time: "2023-05-23 15:22:36"
        },
        {
            id: nanoid(),
            imgSrc: PotraitTest,
            rate: "88.1",
            address: "珠海路001",
            time: "2023-05-23 15:22:36"
        },
        {
            id: nanoid(),
            imgSrc: PotraitTest,
            rate: "88.1",
            address: "珠海路001",
            time: "2023-05-23 15:22:36"
        },
        {
            id: nanoid(),
            imgSrc: PotraitTest,
            rate: "88.1",
            address: "珠海路001",
            time: "2023-05-23 15:22:36"
        },
        {
            id: nanoid(),
            imgSrc: PotraitTest,
            rate: "88.1",
            address: "珠海路001",
            time: "2023-05-23 15:22:36"
        },
        {
            id: nanoid(),
            imgSrc: PotraitTest,
            rate: "88.1",
            address: "珠海路001",
            time: "2023-05-23 15:22:36"
        },
        {
            id: nanoid(),
            imgSrc: PotraitTest,
            rate: "88.1",
            address: "珠海路001",
            time: "2023-05-23 15:22:36"
        },
        {
            id: nanoid(),
            imgSrc: PotraitTest,
            rate: "88.1",
            address: "珠海路001",
            time: "2023-05-23 15:22:36"
        }
    ]

    return (
        <div className={c("stability-single-detail")}>
            <StabilityHeader />
            <StabilityDetailInfoCard />
            <div className={c("time-line")}>
                <div className={c("time-line-title")}>
                    <div className={c("time-line-title-bg")}>
                        <img src={SubTitleLeft} alt="" className={c("time-line-title-bg-left")} />
                        <img src={SubTitleMid} alt="" className={c("time-line-title-bg-mid")} />
                        <img src={SubTitleRight} alt="" className={c("time-line-title-bg-right")} />
                    </div>
                    <div className={c("time-line-title-content")}>时间轴</div>
                </div>
                <div className={c("portraits-comparison-list")}>
                    {portraitComparisonList.map(e => {
                        return (
                            <div key={e.id} className={c("comparison-portrait")}>
                                <div className={c("comparison-portrait-head")}></div>
                                <img src={e.imgSrc} alt="" className={c("comparison-portrait-img")} />
                                <div className={c("comparison-portrait-rate")}>{e.rate}%</div>
                                <div className={c("comparison-portrait-address")}>{e.address}</div>
                                <div className={c("comparison-portrait-time")}>{e.time}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default StabilitySingleDetail
