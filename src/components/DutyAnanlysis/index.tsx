import { Table, Button, DatePicker, Form } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"
import { getAllDutyClock } from "../../api/command"
import dayjs from "dayjs"
import Styles from "./index.module.less"

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
    const [tableData, setTableData] = useState<DataType[]>([])
    useEffect(() => {
        getAllDutyClock({
            endDate: Date.now().toString(),
            startDate: (Date.now() - 2592000000).toString(),
            unitNo: "",
            pageNum: 1,
            pageSize: 10
        }).then(res => {
            res && setTableData(res.data)
        })
    }, [])

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

    const [form] = Form.useForm()

    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(100)
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null)
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null)

    const changePg = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
        getAllDutyClock({
            endDate: endTime?.unix().toString(),
            startDate: startTime?.unix().toString(),
            unitNo: "",
            pageNum: pageNum,
            pageSize: pageSize
        })
    }
    const rangeChange = (e: any) => {
        if (e[0] && e[1]) {
            setStartTime(dayjs(e[0].$d))
            setEndTime(dayjs(e[1].$d))
        }
    }

    const search = () => {
        getAllDutyClock({
            endDate: endTime?.unix().toString(),
            startDate: startTime?.unix().toString(),
            unitNo: "",
            pageNum: pageNum,
            pageSize: pageSize
        })
    }

    const reset = () => {
        setStartTime(null)
        setEndTime(null)
    }

    return (
        <>
            <div className={c("header")}>
                <div className={Styles["query"]}>
                    <RangePicker showTime value={[startTime, endTime]} onCalendarChange={rangeChange} />
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
