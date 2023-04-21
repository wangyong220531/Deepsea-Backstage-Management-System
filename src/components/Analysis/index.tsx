import { Table, Button, DatePicker, Tabs } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useState } from "react"
import dayjs from "dayjs"
import { getDuty } from "../../api/command"
import Styles from "./index.module.less"
import type { TabsProps } from "antd"
import { useAsync } from "../../utils/hooks"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

const columns: ColumnsType<TotalAV> = [
    {
        dataIndex: "operateUserName",
        title: "派警员名称",
        key: "operateUserName",
        align: "center"
    },
    {
        dataIndex: "operateUserNo",
        title: "派警员编号",
        key: "operateUserNo",
        align: "center"
    },
    {
        dataIndex: "totalAssign",
        title: "处警数量",
        key: "totalAssign",
        align: "center"
    }
]

const Analysis: React.FC = () => {
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: `全部勤务统计`
        },
        {
            key: "2",
            label: `一级派警统计`
        },
        {
            key: "3",
            label: "二级派警统计"
        }
    ]

    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(Date.now()))  
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [tableData, setTableData] = useState<TotalAV[]>([])
    const [type, setType] = useState<0 | 1 | 2>(0)

    const search = async () => {
        const res = await getDuty({
            assignPerName: "",
            pageNum,
            pageSize,
            totalEndTime: endTime.format("YYYY-MM-DD HH:mm:ss"),
            totalStartTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
            type
        })
        res && (setTableData(res.totalAssignVos), setTotal(res.size))
    }

    const rangeChange = (e: any) => {
        setStartTime(dayjs(e[0]))
        setEndTime(dayjs(e[1]))
    }

    const changePg = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    const reset = () => {
        setStartTime(dayjs(Date.now() - 2592000000))
        setEndTime(dayjs(Date.now()))
    }

    const onChange = (key: string) => {
        if (key === "1") {
            setType(0)
            return
        }
        if (key === "2") {
            setType(1)
            return
        }
        if (key === "3") {
            setType(2)
            return
        }
    }

    useAsync(() => search(), [pageNum, pageSize, type])

    return (
        <>
            <div className={c("header")}>
                <div className={Styles["tab"]}>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
                <div className={c("query")}>
                    <div className={c("rangePicker")}>
                        <RangePicker value={[startTime, endTime]} onCalendarChange={rangeChange} />
                    </div>
                    <div className={c("query-reset")}>
                        <Button className={c("query-btn")} onClick={search}>查询</Button>
                        <Button onClick={reset}>重置</Button>
                    </div>
                </div>
            </div>
            <Table columns={columns} dataSource={tableData} pagination={{ onChange: changePg, total, pageSize }} />
        </>
    )
}
export default Analysis
