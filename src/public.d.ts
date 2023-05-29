interface OptionType {
    className?: string
    value: string | number
    label: string
    disabled?: boolean
}

interface Page {
    pageNum: number
    pageSize: number
}

interface Portrait {
    id: string
    imgSrc: string
    name: String
    cameraName: String
    time: String
}
