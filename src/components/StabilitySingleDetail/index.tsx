import { FC, useState } from "react"
import styles from "./index.module.less"
import StabilityHeader from "../StabilityHeader"
import StabilityDetailInfoCard from "../StabilityDetailInfoCard"
import SubTitleLeft from "../../assets/Stability/labelLeft.png"
import SubTitleRight from "../../assets/Stability/labelRight.png"
import SubTitleMid from "../../assets/Stability/labelMid.png"
import { nanoid } from "nanoid"
import PotraitTest from "../../assets/Stability/TestImgs/DownLoadFile122.jpg"
import Lafa from "../../assets/Stability/lafa.webp"
import Back from "../../assets/Stability/back.png"
import { useNavigate } from "react-router-dom"

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

interface TabItem {
    id: 0 | 1
    text: "按时间" | "按地点"
}

interface Vehicle {
    id: string
    no: string
    imgSrc: string
    address: string
    time: string
}

const StabilitySingleDetail: FC<StabilitySingleDetailProps> = props => {
    const {} = props

    const [tabActived, setTabActived] = useState<0 | 1>(0)

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

    const vehicleComparisonList: Vehicle[] = [
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        },
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        },
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        },
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        },
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        },
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        },
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        },
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        },
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        },
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        },
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        },
        {
            id: nanoid(),
            no: "苏H·66666",
            imgSrc: Lafa,
            address: "前海路1001号",
            time: "2023-05-02 13:11:55"
        }
    ]

    const tabList: TabItem[] = [
        {
            id: 0,
            text: "按时间"
        },
        {
            id: 1,
            text: "按地点"
        }
    ]

    const navigate= useNavigate()

    const tabClick = (e: 0 | 1) => {
        e === 1 ? setTabActived(1) : setTabActived(0)
    }

    const back = () => {
    }

    return (
        <div className={c("stability-single-detail")}>
            <StabilityHeader />
            <StabilityDetailInfoCard />
            <img src={Back} alt="" className={c("back")} onClick={back}/>
            <div className={c("content")}>
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
                                    <div className={c("tag")}>对比中</div>
                                    <img src={e.imgSrc} alt="" className={c("comparison-portrait-img")} />
                                    <div className={c("comparison-portrait-rate-wrapper")}>
                                        <div className={c("comparison-portrait-rate")}>{e.rate}%</div>
                                    </div>
                                    <div className={c("comparison-portrait-address")}>{e.address}</div>
                                    <div className={c("comparison-portrait-time")}>{e.time}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={c("perception-track")}>
                    <div className={c("time-line-title")}>
                        <div className={c("time-line-title-bg")}>
                            <img src={SubTitleLeft} alt="" className={c("time-line-title-bg-left")} />
                            <img src={SubTitleMid} alt="" className={c("time-line-title-bg-mid")} />
                            <img src={SubTitleRight} alt="" className={c("time-line-title-bg-right")} />
                        </div>
                        <div className={c("time-line-title-content")}>感知轨迹</div>
                    </div>
                    <div className={c("tabs")}>
                        {tabList.map(e => {
                            return (
                                <button key={e.id} onClick={() => tabClick(e.id)} className={tabActived === e.id ? c("tab", "actived-tab") : c("tab", "default")}>
                                    {e.text}
                                </button>
                            )
                        })}
                    </div>
                    <div className={c("perception-track-content")}>
                        <div className={c("section")}>
                            <div className={c("section-time")}>2023年5月20日</div>
                            <div className={c("section-card")}>
                                <div className={c("section-card-label")}>人脸感知</div>
                                <div className={c("section-card-img-list")}>
                                    {portraitComparisonList.map(e => {
                                        return (
                                            <div key={e.id} className={c("section-card-img-wrapper")}>
                                                <img src={e.imgSrc} alt="" className={c("section-card-img")} />
                                                <div className={c("section-card-img-info-box")}>
                                                    <div className={c("section-card-address")}>{e.address}</div>
                                                    <div className={c("section-card-time")}>{e.time}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={c("section-card")}>
                                <div className={c("section-card-label")}>车辆感知</div>
                                <div className={c("section-card-img-list")}>
                                    {vehicleComparisonList.map(e => {
                                        return (
                                            <div key={e.id} className={c("section-card-img-wrapper")}>
                                                <img src={e.imgSrc} alt="" className={c("section-card-img")} />
                                                <div className={c("section-card-img-info-box")}>
                                                    <div className={c("section-card-no")}>{e.no}</div>
                                                    <div className={c("section-card-address")}>{e.address}</div>
                                                    <div className={c("section-card-time")}>{e.time}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={c("section")}>
                            <div className={c("section-time")}>2023年5月19日</div>
                            <div className={c("section-card")}>
                                <div className={c("section-card-label")}>人脸感知</div>
                                <div className={c("section-card-img-list")}>
                                    {portraitComparisonList.map(e => {
                                        return (
                                            <div key={e.id} className={c("section-card-img-wrapper")}>
                                                <img src={e.imgSrc} alt="" className={c("section-card-img")} />
                                                <div className={c("section-card-img-info-box")}>
                                                    <div className={c("section-card-address")}>{e.address}</div>
                                                    <div className={c("section-card-time")}>{e.time}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={c("section-card")}>
                                <div className={c("section-card-label")}>车辆感知</div>
                                <div className={c("section-card-img-list")}>
                                    {vehicleComparisonList.map(e => {
                                        return (
                                            <div key={e.id} className={c("section-card-img-wrapper")}>
                                                <img src={e.imgSrc} alt="" className={c("section-card-img")} />
                                                <div className={c("section-card-img-info-box")}>
                                                    <div className={c("section-card-no")}>{e.no}</div>
                                                    <div className={c("section-card-address")}>{e.address}</div>
                                                    <div className={c("section-card-time")}>{e.time}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StabilitySingleDetail
