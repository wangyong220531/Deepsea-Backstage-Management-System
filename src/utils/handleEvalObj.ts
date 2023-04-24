interface Eval {
    index: number
    content: string
    type: "模型" | "技战法"
}

export const handleEvalObj = (obj: any) => {
    const keys = Object.keys(obj)
    const temp = keys.filter(item => item.includes("bmType"))
    let arr: Eval[] = []
    temp.map(item => {
        arr.push({ index: Number(item.split("")[6]), content: obj["evaluation" + item[item.length - 1]], type: obj[item] })
    })
    return arr
}
