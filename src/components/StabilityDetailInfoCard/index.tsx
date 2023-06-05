import { FC } from "react"
import styles from "./index.module.less"
import Portrait from "../../assets/Stability/TestImgs/DownLoadFile122.jpg"
import mockjs from "mockjs"
import PersonDetailTop from "../../assets/Stability/personalDetailTop.png"
import PersonDetailMid from "../../assets/Stability/personalDetailMid.png"
import PersonDetailBtm from "../../assets/Stability/personalDetailBtm.png"
import { Tooltip } from "antd"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

export interface StabilityDetailInfoCard {}

const StabilityDetailInfoCard: FC<StabilityDetailInfoCard> = props => {
    const {} = props

    return (
        <div className={c("stability-detail-info-card")}>
            <div className={c("info-bg")}>
                <img src={PersonDetailTop} alt="" className={c("card-top")}></img>
                <img src={PersonDetailMid} alt="" className={c("card-mid")}></img>
                <img src={PersonDetailBtm} alt="" className={c("card-btm")}></img>
            </div>
            <div className={c("info-detail")}>
                <img src={Portrait} alt="" className={c("info-portrait")} />
                <div className={c("details")}>
                    <div className={c("name")}>{mockjs.Random.cname()}</div>
                    <div className={c("second-line-items")}>
                        <div className={c("item")}>
                            <div className={c("label")}>身份证</div>
                            <div>：</div>
                            <div className={c("detail")}>320826200008262518</div>
                        </div>
                        {/* <div className={c("item")}>
                            <div className={c("label")}>手机号码</div>
                            <div>：</div>
                            <div className={c("detail")}>199453726974</div>
                        </div> */}
                        <div className={c("item")}>
                            <div className={c("label")}>住址</div>
                            <div>：</div>
                            <Tooltip title="中南世纪城15栋二单元1102室">
                                <div className={c("detail")}>中南世纪城15栋二单元1102室</div>
                            </Tooltip>
                        </div>
                        <div className={c("item")}>
                            <div className={c("label")}>管控民警</div>
                            <div>：</div>
                            <div className={c("detail")}>{mockjs.Random.cname()}</div>
                        </div>
                        <div className={c("item")}>
                            <div className={c("label")}>管控等级</div>
                            <div>：</div>
                            <div className={c("detail")}>二级</div>
                        </div>
                        <div className={c("item")}>
                            <div className={c("label")}>管控单位</div>
                            <div>：</div>
                            <div className={c("detail")}>黄码派出所</div>
                        </div>
                        <div className={c("item-last")}>
                            <div className={c("label")}>诉求</div>
                            <div>：</div>
                            <Tooltip title="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx">
                                <div className={c("detail")}>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StabilityDetailInfoCard
