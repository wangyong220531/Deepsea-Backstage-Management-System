import dayjs from "dayjs"

export function getPng(path: string) {
    return `/PNG/${path}.png`
}

export function ymdhms(time: dayjs.Dayjs) {
    return dayjs(time).format("YYYY-MM-DD HH:mm:ss")
}

export function timeX(time: dayjs.Dayjs) {
    return dayjs(time).format("x")
}
