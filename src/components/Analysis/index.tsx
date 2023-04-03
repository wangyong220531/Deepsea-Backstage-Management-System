import { Table, Button, DatePicker, Select, Input } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { getDuty } from "../../api/command"
import Styles from "./index.module.less"

const { RangePicker } = DatePicker

interface Duty {
    key: string
    no: string
    perName: string
    perNo: string
    count: number
}

const columns: ColumnsType<Duty> = [
    {
        dataIndex: "no",
        title: "序列号",
        key: "no",
        align: "center"
    },
    {
        dataIndex: "perName",
        title: "派警员名称",
        key: "perName",
        align: "center"
    },
    {
        dataIndex: "perNo",
        title: "派警员编号",
        key: "perNo",
        align: "center"
    },
    {
        dataIndex: "count",
        title: "处警数量",
        key: "count",
        align: "center"
    }
]

const Analysis: React.FC = () => {
    const [table, setTable] = useState<"duty" | "first" | "second">("duty")
    const [pageNum, setPageNum] = useState(1)
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null)
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(100)
    const [name, setName] = useState("")
    const [data, setData] = useState<Duty[]>([])

    const search = () => {
        getDuty({
            assignPerName: name,
            pageNum,
            pageSize,
            totalEndTime: Date.now().toString(),
            totalStartTime: (Date.now() - 60 * 60 * 24 * 30 * 1000).toString(),
            type: 0
        }).then(res => {
            
        })
    }
    useEffect(() => {
        search()
    }, [])
    const duty = () => {
        setTable("duty")
    }
    const first = () => {
        setTable("first")
    }
    const second = () => {
        setTable("second")
    }
    const rangeChange = (e: any) => {
        if (e[0] && e[1]) {
            setStartTime(dayjs(e[0].$d))
            setEndTime(dayjs(e[1].$d))
        }
    }
    const query = () => {
        search()
    }
    const reset = () => {
        setName("")
        setStartTime(null)
        setEndTime(null)
    }

    const changePg = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }
    return (
        <>
            <div className={Styles["header"]}>
                <div className={Styles["button-group"]}>
                    <Button type="primary" onClick={duty}>
                        全部勤务统计
                    </Button>
                    <Button type="primary" onClick={first}>
                        一级派警统计
                    </Button>
                    <Button type="primary" onClick={second}>
                        二级派警统计
                    </Button>
                </div>
                <div className={Styles["query"]}>
                    <div className={Styles["box"]}>
                        <RangePicker value={[startTime, endTime]} onCalendarChange={rangeChange} />
                    </div>
                    <Button type="primary" onClick={query}>
                        查询
                    </Button>
                    <Button onClick={reset}>重置</Button>
                </div>
            </div>
            <Table columns={columns} dataSource={data} pagination={{ onChange: changePg, total, pageSize }} />
        </>
    )
}
export default Analysis
