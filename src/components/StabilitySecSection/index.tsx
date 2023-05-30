import { FC, useState } from "react"
import styles from "./index.module.less"
import People from "../../assets/Stability/people.png"
import { nanoid } from "nanoid"
import Img31 from "../../assets/Stability/TestImgs/DownLoadFile31.jpg"
import Img32 from "../../assets/Stability/TestImgs/DownLoadFile32.jpg"
import Img33 from "../../assets/Stability/TestImgs/DownLoadFile33.jpg"
import Img34 from "../../assets/Stability/TestImgs/DownLoadFile34.jpg"
import Img35 from "../../assets/Stability/TestImgs/DownLoadFile35.jpg"
import Img36 from "../../assets/Stability/TestImgs/DownLoadFile36.jpg"
import Img37 from "../../assets/Stability/TestImgs/DownLoadFile37.jpg"
import Img38 from "../../assets/Stability/TestImgs/DownLoadFile38.jpg"
import Img39 from "../../assets/Stability/TestImgs/DownLoadFile39.jpg"
import Img40 from "../../assets/Stability/TestImgs/DownLoadFile40.jpg"
import Img41 from "../../assets/Stability/TestImgs/DownLoadFile41.jpg"
import Img42 from "../../assets/Stability/TestImgs/DownLoadFile42.jpg"
import Img43 from "../../assets/Stability/TestImgs/DownLoadFile43.jpg"
import Img44 from "../../assets/Stability/TestImgs/DownLoadFile44.jpg"
import Img45 from "../../assets/Stability/TestImgs/DownLoadFile45.jpg"
import Img46 from "../../assets/Stability/TestImgs/DownLoadFile46.jpg"
import Img47 from "../../assets/Stability/TestImgs/DownLoadFile47.jpg"
import Img48 from "../../assets/Stability/TestImgs/DownLoadFile48.jpg"
import Img49 from "../../assets/Stability/TestImgs/DownLoadFile49.jpg"
import Img50 from "../../assets/Stability/TestImgs/DownLoadFile50.jpg"
import Img51 from "../../assets/Stability/TestImgs/DownLoadFile51.jpg"
import Img52 from "../../assets/Stability/TestImgs/DownLoadFile52.jpg"
import Img53 from "../../assets/Stability/TestImgs/DownLoadFile53.jpg"
import Img54 from "../../assets/Stability/TestImgs/DownLoadFile54.jpg"
import Img55 from "../../assets/Stability/TestImgs/DownLoadFile55.jpg"
import Img56 from "../../assets/Stability/TestImgs/DownLoadFile56.jpg"
import Img57 from "../../assets/Stability/TestImgs/DownLoadFile57.jpg"
import Img58 from "../../assets/Stability/TestImgs/DownLoadFile58.jpg"
import Img59 from "../../assets/Stability/TestImgs/DownLoadFile59.jpg"
import Img60 from "../../assets/Stability/TestImgs/DownLoadFile38.jpg"
import Mock from "mockjs"
import PortraitBorder from "../../assets/Stability/portraitBorder.png"
import Arrow from "../../assets/Stability/arrow.png"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

interface Tab {
    no: number
    text: string
}

interface ThisLevelTracks {
    id: string
    name: string
    hisTracks: Portrait[]
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

    const ToppersList: Portrait[] = [
        {
            id: nanoid(),
            imgSrc: Img31,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img32,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img33,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img34,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img35,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        }
    ]

    const TierOneList: Portrait[] = [
        {
            id: nanoid(),
            imgSrc: Img36,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img37,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img38,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img39,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img40,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img41,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img42,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img43,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        }
    ]

    const TierTwoList: Portrait[] = [
        {
            id: nanoid(),
            imgSrc: Img37,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img38,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img39,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img40,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img41,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img42,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img43,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img44,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img45,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img46,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        }
    ]

    const TierThreeList: Portrait[] = [
        {
            id: nanoid(),
            imgSrc: Img38,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img39,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img40,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img41,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img42,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img43,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img44,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img45,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img46,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img47,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        },
        {
            id: nanoid(),
            imgSrc: Img48,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023-05-29 12:00:33"
        }
    ]

    const ToppersDetail: ThisLevelTracks[] = [
        {
            id: nanoid(),
            name: "黎明轨迹",
            hisTracks: [
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img31,
                    name: "黎明",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                }
            ]
        },
        {
            id: nanoid(),
            name: "方洋轨迹",
            hisTracks: [
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "方洋",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                }
            ]
        },
        {
            id: nanoid(),
            name: "郭涛轨迹",
            hisTracks: [
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "郭涛",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                }
            ]
        },
        {
            id: nanoid(),
            name: "梁杰轨迹",
            hisTracks: [
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                },
                {
                    id: nanoid(),
                    imgSrc: Img32,
                    name: "梁杰",
                    cameraName: "相机名称",
                    time: "2023-05-29 15:22:56"
                }
            ]
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
                        <div className={c("see-this-level-tracks")}>查看本级人员轨迹</div>
                    </div>
                    <div className={c("portrait-list")}>
                        {ToppersList.map(e => {
                            return (
                                <div className={c("wrapper")} key={e.id}>
                                    <img src={PortraitBorder} alt="" className={c("border")} />
                                    <img src={e.imgSrc} alt="" className={c("img")} />
                                    <div className={c("name")}>{e.name}</div>
                                    <div className={c("desc")}>
                                        <div className={c("camera-name")}>{e.cameraName}</div>
                                        <div className={c("time")}>{e.time}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={c("this-level-tracks-detail")}>
                        {ToppersDetail.map(e => {
                            return (
                                <div>
                                    <div className={c("single-tracks-title")}>
                                        <img src={Arrow} alt="" />
                                        <div className={c("name")}>{e.name}</div>
                                    </div>
                                    <div className={c("single-tracks-gallery")}>
                                        {ToppersList.map(e => {
                                            return (
                                                <div className={c("wrapper")} key={e.id}>
                                                    <img src={PortraitBorder} alt="" className={c("border")} />
                                                    <img src={e.imgSrc} alt="" className={c("img")} />
                                                    <div className={c("name")}>{e.name}</div>
                                                    <div className={c("desc")}>
                                                        <div className={c("camera-name")}>{e.cameraName}</div>
                                                        <div className={c("time")}>{e.time}</div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={c("section")}>
                    <div className={c("title")}>
                        <img className={c("ppl-img")} src={People} alt="" />
                        <div className={c("sub-title")}>一级人员（8人）</div>
                        <div className={c("see-this-level-tracks")}>查看本级人员轨迹</div>
                    </div>
                    <div className={c("portrait-list")}>
                        {TierOneList.map(e => {
                            return (
                                <div className={c("wrapper")} key={e.id}>
                                    <img src={PortraitBorder} alt="" className={c("border")} />
                                    <img src={e.imgSrc} alt="" className={c("img")} />
                                    <div className={c("name")}>{e.name}</div>
                                    <div className={c("desc")}>
                                        <div className={c("camera-name")}>{e.cameraName}</div>
                                        <div className={c("time")}>{e.time}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={c("section")}>
                    <div className={c("title")}>
                        <img className={c("ppl-img")} src={People} alt="" />
                        <div className={c("sub-title")}>二级人员（10人）</div>
                        <div className={c("see-this-level-tracks")}>查看本级人员轨迹</div>
                    </div>
                    <div className={c("portrait-list")}>
                        {TierTwoList.map(e => {
                            return (
                                <div className={c("wrapper")} key={e.id}>
                                    <img src={PortraitBorder} alt="" className={c("border")} />
                                    <img src={e.imgSrc} alt="" className={c("img")} />
                                    <div className={c("name")}>{e.name}</div>
                                    <div className={c("desc")}>
                                        <div className={c("camera-name")}>{e.cameraName}</div>
                                        <div className={c("time")}>{e.time}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={c("section")}>
                    <div className={c("title")}>
                        <img className={c("ppl-img")} src={People} alt="" />
                        <div className={c("sub-title")}>三级人员（11人）</div>
                        <div className={c("see-this-level-tracks")}>查看本级人员轨迹</div>
                        <div className={c("more")}>更多&gt;</div>
                    </div>
                    <div className={c("portrait-list")}>
                        {TierThreeList.map(e => {
                            return (
                                <div key={e.id}>
                                    <div className={c("wrapper")}>
                                        <img src={PortraitBorder} alt="" className={c("border")} />
                                        <img src={e.imgSrc} alt="" className={c("img")} />
                                        <div className={c("name")}>{e.name}</div>
                                        <div className={c("desc")}>
                                            <div className={c("camera-name")}>{e.cameraName}</div>
                                            <div className={c("time")}>{e.time}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StabilitySecSection
