import { FC, useEffect, useState } from "react"
import PortraitBorder from "../../assets/Stability/portraitBorder.png"
import styles from "./index.module.less"
import { nanoid } from "nanoid"
import StabilitySecSection from "../StabilitySecSection"
import Mock from "mockjs"
import Img0 from "../../assets/Stability/TestImgs/DownLoadFile122.jpg"
import Img1 from "../../assets/Stability/TestImgs/DownLoadFile2.jpg"
import Img2 from "../../assets/Stability/TestImgs/DownLoadFile3.jpg"
import Img3 from "../../assets/Stability/TestImgs/DownLoadFile4.jpg"
import Img4 from "../../assets/Stability/TestImgs/DownLoadFile5.jpg"
import Img5 from "../../assets/Stability/TestImgs/DownLoadFile6.jpg"
import Img6 from "../../assets/Stability/TestImgs/DownLoadFile7.jpg"
import Img7 from "../../assets/Stability/TestImgs/DownLoadFile8.jpg"
import Img8 from "../../assets/Stability/TestImgs/DownLoadFile9.jpg"
import Img9 from "../../assets/Stability/TestImgs/DownLoadFile10.jpg"
import Img10 from "../../assets/Stability/TestImgs/DownLoadFile11.jpg"
import Img11 from "../../assets/Stability/TestImgs/DownLoadFile12.jpg"
import Img12 from "../../assets/Stability/TestImgs/DownLoadFile13.jpg"
import Img14 from "../../assets/Stability/TestImgs/DownLoadFile14.jpg"
import Img15 from "../../assets/Stability/TestImgs/DownLoadFile15.jpg"
import Img16 from "../../assets/Stability/TestImgs/DownLoadFile16.jpg"
import Img17 from "../../assets/Stability/TestImgs/DownLoadFile17.jpg"
import Img18 from "../../assets/Stability/TestImgs/DownLoadFile18.jpg"
import Img19 from "../../assets/Stability/TestImgs/DownLoadFile19.jpg"
import Img20 from "../../assets/Stability/TestImgs/DownLoadFile20.jpg"
import Img21 from "../../assets/Stability/TestImgs/DownLoadFile21.jpg"
import Img22 from "../../assets/Stability/TestImgs/DownLoadFile22.jpg"
import Img23 from "../../assets/Stability/TestImgs/DownLoadFile23.jpg"
import Img24 from "../../assets/Stability/TestImgs/DownLoadFile24.jpg"
import Img25 from "../../assets/Stability/TestImgs/DownLoadFile25.jpg"
import Img26 from "../../assets/Stability/TestImgs/DownLoadFile26.jpg"
import Img27 from "../../assets/Stability/TestImgs/DownLoadFile27.jpg"
import Img28 from "../../assets/Stability/TestImgs/DownLoadFile28.jpg"
import Img29 from "../../assets/Stability/TestImgs/DownLoadFile29.jpg"
import Img30 from "../../assets/Stability/TestImgs/DownLoadFile30.jpg"
import SubTitleLeft from "../../assets/Stability/labelLeft.png"
import SubTitleRight from "../../assets/Stability/labelRight.png"
import SubTitleMid from "../../assets/Stability/labelMid.png"
import StabilityHeader from "../StabilityHeader"
import { useLocation, useNavigate } from "react-router-dom"
import Menu from "../../assets/Stability/menu.png"
import Edit from "../../assets/Stability/edit.png"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

const stability: FC = () => {
    const portraitList: Portrait[] = [
        {
            id: nanoid(),
            imgSrc: Img0,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img1,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img2,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img3,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img4,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        { id: nanoid(), imgSrc: Img5, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Img6, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Img7, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Img8, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Img9, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Img10, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" }
    ]

    const portraitListSec: Portrait[] = [
        {
            id: nanoid(),
            imgSrc: Img11,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img12,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img14,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img15,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img16,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        { id: nanoid(), imgSrc: Img17, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Img18, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Img19, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Img20, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" }
    ]

    const portraitListThir: Portrait[] = [
        {
            id: nanoid(),
            imgSrc: Img21,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img22,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img23,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img24,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img25,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        { id: nanoid(), imgSrc: Img26, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" },
        { id: nanoid(), imgSrc: Img27, name: Mock.Random.cname(), cameraName: "相机名称", time: "2023/05/21 21:02:45" }
    ]

    const portraitListFour: Portrait[] = [
        {
            id: nanoid(),
            imgSrc: Img28,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img29,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        },
        {
            id: nanoid(),
            imgSrc: Img30,
            name: Mock.Random.cname(),
            cameraName: "相机名称",
            time: "2023/05/21 21:02:45"
        }
    ]

    const navigate = useNavigate()
    const location = useLocation()

    const [breadcrumbs, setBreadcrumbs] = useState("")

    useEffect(() => {
        if (location.pathname === "/stability") {
            setBreadcrumbs("主页")
        }
    }, [])

    const toDetail = () => {
        navigate("/stabilityDetail", { replace: true })
    }

    const toTable = () => {
        navigate("/stabilityTable", { replace: true })
    }

    return (
        <div className={c("stability")}>
            <StabilityHeader />
            <div className={c("breadcrumbs")}>{breadcrumbs}</div>
            <div className={c("top-right-box")}>
                <img src={Edit} alt="" className={c("edit-icon")} onClick={toTable} />
                <div className={c("role")}>民警082846</div>
                <div className={c("name")}>卜方浩</div>
            </div>
            <div className={c("content")}>
                <div className={c("first-section")}>
                    <div className={c("category")}>
                        <div className={c("left-label")}>
                            <div className={c("sub-title")}>
                                <img className={c("sub-left")} src={SubTitleLeft} alt="" />
                                <img className={c("sub-mid")} src={SubTitleMid} alt="" />
                                <img className={c("sub-right")} src={SubTitleRight} alt="" />
                            </div>
                            <div className={c("text")}>出称公共交通工具感知人员（11人）</div>
                        </div>
                        <div className={c("portrait-list")}>
                            {portraitList.map(e => {
                                return (
                                    <>
                                        <div className={c("wrapper")} key={e.id}>
                                            <img src={PortraitBorder} alt="" className={c("border")} />
                                            <img src={e.imgSrc} alt="" className={c("img")} onClick={toDetail} />
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
                            <div className={c("sub-title")}>
                                <img className={c("sub-left")} src={SubTitleLeft} alt="" />
                                <img className={c("sub-mid-sec")} src={SubTitleMid} alt="" />
                                <img className={c("sub-right")} src={SubTitleRight} alt="" />
                            </div>
                            <div className={c("text")}>24小时无轨迹人员（9人）</div>
                        </div>
                        <div className={c("portrait-list")}>
                            {portraitListSec.map(e => {
                                return (
                                    <>
                                        <div className={c("wrapper")} key={e.id}>
                                            <img src={PortraitBorder} alt="" className={c("border")} />
                                            <img src={e.imgSrc} alt="" className={c("img")} onClick={toDetail} />
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
                            <div className={c("sub-title")}>
                                <img className={c("sub-left")} src={SubTitleLeft} alt="" />
                                <img className={c("sub-mid-thir")} src={SubTitleMid} alt="" />
                                <img className={c("sub-right")} src={SubTitleRight} alt="" />
                            </div>
                            <div className={c("text")}>48小时无轨迹人员（7人）</div>
                        </div>
                        <div className={c("portrait-list")}>
                            {portraitListThir.map(e => {
                                return (
                                    <>
                                        <div className={c("wrapper")} key={e.id}>
                                            <img src={PortraitBorder} alt="" className={c("border")} />
                                            <img src={e.imgSrc} alt="" className={c("img")} onClick={toDetail} />
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
                            <div className={c("sub-title")}>
                                <img className={c("sub-left")} src={SubTitleLeft} alt="" />
                                <img className={c("sub-mid-four")} src={SubTitleMid} alt="" />
                                <img className={c("sub-right")} src={SubTitleRight} alt="" />
                            </div>
                            <div className={c("text")}>72小时无轨迹人员（3人）</div>
                        </div>
                        <div className={c("portrait-list")}>
                            {portraitListFour.map(e => {
                                return (
                                    <>
                                        <div className={c("wrapper")} key={e.id}>
                                            <img src={PortraitBorder} alt="" className={c("border")} />
                                            <img src={e.imgSrc} alt="" className={c("img")} onClick={toDetail} />
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
                    {/* <div className={c("category")}>
                        <div className={c("left-label")}>
                            <div className={c("sub-title")}>
                                <img className={c("sub-left")} src={SubTitleLeft} alt="" />
                                <img className={c("sub-mid-fif")} src={SubTitleMid} alt="" />
                                <img className={c("sub-right")} src={SubTitleRight} alt="" />
                            </div>
                            <div className={c("text")}>7天无轨迹人员（0人）</div>
                        </div>
                        <div className={c("portrait-list")}>
                            {portraitListThir.map(e => {
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
                    </div> */}
                </div>
                <StabilitySecSection />
            </div>
        </div>
    )
}

export default stability
