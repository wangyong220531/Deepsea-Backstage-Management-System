import { FC } from "react"
import styles from "./index.module.less"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

function o(className: string | undefined | null | boolean) {
    return typeof className === "string" ? `_${className}` : className
}

export interface OneBThreeRPLibProps {
}

const OneBThreeRPLib: FC<OneBThreeRPLibProps> = props => {
    const { } = props

    return (
        <div className={c("oneBThreeRPLib")}>
            
        </div>
    )
}

export default OneBThreeRPLib