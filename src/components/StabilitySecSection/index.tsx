import { FC } from "react"
import styles from "./index.module.less"
import { Button } from "antd"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

function o(className: string | undefined | null | boolean) {
    return typeof className === "string" ? `_${className}` : className
}

export interface StabilitySecSectionProps {
}

const StabilitySecSection: FC = () => {
    return (
        <div className={c("stabilitySecSection")}>
            <div className={c("tabs")}>
                <Button>全部</Button>
            </div>
        </div>
    )
}

export default StabilitySecSection