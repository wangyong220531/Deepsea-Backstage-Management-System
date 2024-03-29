import { FC, useEffect, useState } from "react"
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
import { useLocation, useNavigate } from "react-router-dom"
import People from "../../assets/Stability/people.png"
import TimelineUp from "../../assets/Stability/timeLineUp.png"
import TimelineDown from "../../assets/Stability/timeLineDown.png"
import { Tooltip } from "antd"
import Home from "../../assets/Stability/home.png"

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

interface TimeSection {
    id: string
    time: string
    faceList: ComparisonPortrait[]
    vehicleList: Vehicle[]
}

interface LocationCategory {
    id: string
    title: string
    additional: string
    timeList: TimeSection[]
}

interface TimelineNode {
    id: string
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

    const locationCategoryList: LocationCategory[] = [
        {
            id: nanoid(),
            title: "进出城公共交通工具",
            additional: "高铁、飞机、火车、汽车",
            timeList: [
                {
                    id: nanoid(),
                    time: "2023年5月31日",
                    faceList: [
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
                    ],
                    vehicleList: [
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
                },
                {
                    id: nanoid(),
                    time: "2023年5月29日",
                    faceList: [
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
                    ],
                    vehicleList: [
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
                }
            ]
        },
        {
            id: nanoid(),
            title: "进出政府部门",
            additional: "主要是区政府、区信访局、乡镇街道",
            timeList: [
                {
                    id: nanoid(),
                    time: "2023年5月31日",
                    faceList: [
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
                    ],
                    vehicleList: [
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
                },
                {
                    id: nanoid(),
                    time: "2023年5月29日",
                    faceList: [
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
                    ],
                    vehicleList: [
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
                }
            ]
        },
        {
            id: nanoid(),
            title: "小区人车卡口",
            additional: "小区门口、内部人车卡口",
            timeList: [
                {
                    id: nanoid(),
                    time: "2023年5月31日",
                    faceList: [
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
                    ],
                    vehicleList: [
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
                },
                {
                    id: nanoid(),
                    time: "2023年5月29日",
                    faceList: [
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
                    ],
                    vehicleList: [
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
                }
            ]
        }
    ]

    const timeNodeList: TimelineNode[] = [
        {
            id: nanoid(),
            address: "淮安市清江浦区XX街道XX小区",
            time: "2023-06-06 12:00:03"
        },
        {
            id: nanoid(),
            address: "淮安市清江浦区XX街道XX小区",
            time: "2023-06-06 12:00:03"
        },
        {
            id: nanoid(),
            address: "淮安市清江浦区XX街道XX小区",
            time: "2023-06-06 12:00:03"
        },
        {
            id: nanoid(),
            address: "淮安市清江浦区XX街道XX小区",
            time: "2023-06-06 12:00:03"
        },
        {
            id: nanoid(),
            address: "淮安市清江浦区XX街道XX小区",
            time: "2023-06-06 12:00:03"
        },
        {
            id: nanoid(),
            address: "淮安市清江浦区XX街道XX小区",
            time: "2023-06-06 12:00:03"
        },
        {
            id: nanoid(),
            address: "淮安市清江浦区XX街道XX小区",
            time: "2023-06-06 12:00:03"
        },
        {
            id: nanoid(),
            address: "淮安市清江浦区XX街道XX小区",
            time: "2023-06-06 12:00:03"
        },
        {
            id: nanoid(),
            address: "淮安市清江浦区XX街道XX小区",
            time: "2023-06-06 12:00:03"
        },
        {
            id: nanoid(),
            address: "淮安市清江浦区XX街道XX小区",
            time: "2023-06-06 12:00:03"
        }
    ]

    const navigate = useNavigate()

    const location = useLocation()

    const [breadcrumb, setBreadcrumb] = useState<string[]>([])

    useEffect(() => {
        if (location.pathname === "/stabilityDetail") {
            setBreadcrumb(["主页", "人员详情"])
        }
    }, [])

    const tabClick = (e: 0 | 1) => {
        e === 1 ? setTabActived(1) : setTabActived(0)
    }

    const back = () => {
        navigate("/stability", { replace: true })
    }

    const breadcrumbClick = (e: string) => {
        e === "主页" ? back() : null
    }

    return (
        <div className={c("stability-single-detail")}>
            <StabilityHeader />
            <StabilityDetailInfoCard />
            <div className={c("top-right-box")}>
                <img src={Home} alt="" className={c("home-icon")} onClick={back} />
                <div className={c("role")}>民警082846</div>
                <div className={c("name")}>卜方浩</div>
            </div>
            <div className={c("breadcrumb-box")}>
                {breadcrumb.map((e, index) => {
                    return (
                        <div key={e} className={index !== 0 ? c("breadcrumb-item") : c("breadcrumb-item-zero")} onClick={() => breadcrumbClick(e)}>
                            {index !== 0 ? `> ${e}` : `${e}`}
                        </div>
                    )
                })}
            </div>
            <img src={Back} alt="" className={c("back")} onClick={back} />
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
                    <div className={c("timeline")}>
                        {timeNodeList.map((e, index) => {
                            return (
                                <div key={e.id} className={c("timeline-node")}>
                                    {index % 2 === 0 && (
                                        <div className={c("timeline-node-item-down")}>
                                            <img src={TimelineDown} alt="" className={c("node-img", "node-img-down")} />
                                            <div className={c("timeline-node-item-desc")}>
                                                <div className={c("timeline-node-item-desc-address")}>{e.address}</div>
                                                <div className={c("timeline-node-item-desc-time")}>{e.time}</div>
                                            </div>
                                        </div>
                                    )}
                                    {index % 2 === 1 && (
                                        <div className={c("timeline-node-item-up")}>
                                            <div className={c("timeline-node-item-desc")}>
                                                <div className={c("timeline-node-item-desc-address")}>{e.address}</div>
                                                <div className={c("timeline-node-item-desc-time")}>{e.time}</div>
                                            </div>
                                            <img src={TimelineUp} alt="" className={c("node-img", "node-img-up")} />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
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
                        {tabActived === 0 && (
                            <div className={c("by-time")}>
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
                        )}
                        {tabActived === 1 && (
                            <div className={c("by-location")}>
                                {locationCategoryList.map(e => {
                                    return (
                                        <div key={e.id} className={c("location-category")}>
                                            <div className={c("section-desc-title")}>
                                                <div className={c("top-wrapper")}>
                                                    <img src={People} alt="" className={c("tag")} />
                                                    <div className={c("text")}>{e.title}</div>
                                                </div>
                                                <div className={c("addition")}>{e.additional}</div>
                                            </div>
                                            {e.timeList.map(a => {
                                                return (
                                                    <div key={a.id} className={c("section")}>
                                                        <div className={c("section-time")}>{a.time}</div>
                                                        <div className={c("section-card")}>
                                                            <div className={c("section-card-label")}>人脸感知</div>
                                                            <div className={c("section-card-img-list")}>
                                                                {a.faceList.map(b => {
                                                                    return (
                                                                        <div key={b.id} className={c("section-card-img-wrapper")}>
                                                                            <img src={b.imgSrc} alt="" className={c("section-card-img")} />
                                                                            <div className={c("section-card-img-info-box")}>
                                                                                <div className={c("section-card-address")}>{b.address}</div>
                                                                                <div className={c("section-card-time")}>{b.time}</div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className={c("section-card")}>
                                                            <div className={c("section-card-label")}>车辆感知</div>
                                                            <div className={c("section-card-img-list")}>
                                                                {a.vehicleList.map(b => {
                                                                    return (
                                                                        <div key={b.id} className={c("section-card-img-wrapper")}>
                                                                            <img src={b.imgSrc} alt="" className={c("section-card-img")} />
                                                                            <div className={c("section-card-img-info-box")}>
                                                                                <div className={c("section-card-no")}>{b.no}</div>
                                                                                <div className={c("section-card-address")}>{b.address}</div>
                                                                                <div className={c("section-card-time")}>{b.time}</div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StabilitySingleDetail
