import { FC } from "react"
import styles from "./index.module.less"
import StabilityHeader from "../StabilityHeader"
import { useNavigate } from "react-router-dom"
import Back from "../../assets/Stability/back.png"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

export interface StabilityTableProps {
}

const StabilityTable: FC<StabilityTableProps> = props => {
    const { } = props

    const navigate = useNavigate()

    const back = () => {
        navigate("/stability", { replace: true })
    }

    return (
        <div className={c("stabilityTable")}>
            <StabilityHeader/>
            <img src={Back} alt="" className={c("back")} onClick={back} />
        </div>
    )
}

export default StabilityTable