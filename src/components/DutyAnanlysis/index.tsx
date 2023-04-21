import { Table, Button, DatePicker, Form } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"
import { getAllDutyClock } from "../../api/command"
import dayjs from "dayjs"
import Styles from "./index.module.less"
import { useAsync } from "../../utils/hooks"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface DataType {
    teamName: string
    unitName: string
    carId: string
    clockTimes: number
    lackTimes: number
    stayTimes: number
    stayWaringTimes: number
    backTimes: number
}

const DutyAnalysis: React.FC = () => {
    const column: ColumnsType<DataType> = [
        {
            key: "teamName",
            dataIndex: "teamName",
            title: "警组",
            align: "center"
        },
        {
            key: "unitName",
            dataIndex: "unitName",
            title: "单位",
            align: "center"
        },
        {
            key: "carId",
            dataIndex: "carId",
            title: "车辆编号",
            align: "center"
        },
        {
            key: "clockTimes",
            dataIndex: "clockTimes",
            title: "打卡次数",
            align: "center"
        },
        {
            key: "lackTimes",
            dataIndex: "lackTimes",
            title: "缺卡次数",
            align: "center"
        },
        {
            key: "stayTimes",
            dataIndex: "stayTimes",
            title: "站内逗留时长",
            align: "center"
        },
        {
            key: "stayWaringTimes",
            dataIndex: "stayWaringTimes",
            title: "超时告警次数",
            align: "center"
        },
        {
            key: "backTimes",
            dataIndex: "backTimes",
            title: "回站次数",
            align: "center"
        }
    ]

    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(Date.now()))
    const [tableData, setTableData] = useState<DataType[]>([])

    const search = async () => {
        const res = await getAllDutyClock({
            endDate: endTime.format("YYYY-MM-DD HH:mm:ss"),
            startDate: startTime.format("YYYY-MM-DD HH:mm:ss"),
            unitNo: "",
            pageNum,
            pageSize
        })
        res && (setTableData(res.data.infoList), setTotal(res.data.total))
    }

    const changePg = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }
    const rangeChange = (e: any) => {
        setStartTime(dayjs(e[0]))
        setEndTime(dayjs(e[1]))
    }

    const reset = () => {
        setStartTime(dayjs(Date.now() - 2592000000))
        setEndTime(dayjs(Date.now()))
    }

    useAsync(() => search(), [pageNum, pageSize])

    return (
        <>
            <div className={c("header")}>
                <div className={Styles["query"]}>
                    <RangePicker value={[startTime, endTime]} onCalendarChange={rangeChange} />
                    <div className={c("query-reset")}>
                        <Button onClick={search} className={c("query-btn")}>
                            查询
                        </Button>
                        <Button onClick={reset} className={c("reset-btn")}>
                            重置
                        </Button>
                    </div>
                </div>
            </div>
            <Table columns={column} dataSource={tableData} pagination={{ onChange: changePg, total, pageSize }} />
        </>
    )
}

export default DutyAnalysis
