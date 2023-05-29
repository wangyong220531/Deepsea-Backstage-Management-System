import { FC } from "react"
import styles from "./index.module.less"
import PortraitBorder from "../../assets/Stability/portraitBorder.png"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

function o(className: string | undefined | null | boolean) {
    return typeof className === "string" ? `_${className}` : className
}

export interface GalleryProps {
}

const Gallery: FC<GalleryProps> = props => {
    const { } = props

    return (
        <div className={c("gallery")}>
        <img src={PortraitBorder} alt="" className={c("border")} />
        {/* <img src={e.imgSrc} alt="" className={c("img")} />
        <div className={c("name")}>{e.name}</div>
        <div className={c("desc")}>
            <div className={c("camera-name")}>{e.cameraName}</div>
            <div className={c("time")}>{e.time}</div>
        </div> */}
    </div>
    )
}

export default Gallery
