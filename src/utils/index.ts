import dayjs from "dayjs"
import { utils, writeFile } from "xlsx"

export function getPng(path: string) {
    return `/PNG/${path}.png`
}

export function ymdhms(time: dayjs.Dayjs) {
    return dayjs(time).format("YYYY-MM-DD HH:mm:ss")
}

export function timeX(time: dayjs.Dayjs) {
    return dayjs(time).format("x")
}

export function exportExcel<T>(data: T[], name: string) {
    const workSheet = utils.json_to_sheet(data)
    const workBook = utils.book_new()
    utils.book_append_sheet(workBook, workSheet)
    writeFile(workBook, `${name}${name.endsWith(".xlsx") ? "" : ".xlsx"}`)
}
