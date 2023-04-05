import { FC, useState } from "react"
import styles from "./index.module.less"
import { Button, Input, Table, Tabs, DatePicker } from "antd"
import type { TabsProps } from "antd"
import type { ColumnsType } from "antd/es/table"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

interface TableHead {
    logContent: string
    operatorID: string
    operatorName: string
    IP: string
    type: "登录日志" | "操作日志"
    createTime: string
}

const OperateLogs: FC = () => {
    const onChange = (key: string) => {
        console.log(key)
    }

    const columns: ColumnsType<TableHead> = [
        {
            key: "logContent",
            dataIndex: "logContent",
            title: "操作内容",
            align: "center"
        },
        {
            key: "operatorID",
            dataIndex: "operatorID",
            title: "操作人ID",
            align: "center"
        },
        {
            key: "operatorName",
            dataIndex: "operatorName",
            title: "操作人姓名",
            align: "center"
        },
        {
            key: "IP",
            dataIndex: "IP",
            title: "IP",
            align: "center"
        },
        {
            key: "type",
            dataIndex: "type",
            title: "类型",
            align: "center"
        },
        {
            key: "createTime",
            dataIndex: "createTime",
            title: "创建时间",
            align: "center"
        }
    ]

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: `登录日志`
        },
        {
            key: "2",
            label: `操作日志`
        }
    ]

    const logPageChange = () => {}

    const [logTotal, setLogTotal] = useState(100)

    const [logPagesize, setlogPagesize] = useState(10)
    return (
        <>
            <div className={c("operateLogs")}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
            <div className={c("header")}>
                <div className={c("query")}>
                    <div className={c("inputs")}>
                        <div className={c("query-item")}>
                            <div className={c("label")}>搜索日志：</div>
                            <Input placeholder="亲输入查询内容" />
                        </div>
                        <div className={c("query-item")}>
                            <div className={c("label")}>创建时间：</div>
                            <RangePicker showTime />
                        </div>
                    </div>
                    <div className={c("query-reset")}>
                        <Button className={c("query-btn")}>查询</Button>
                        <Button className={c("reset-btn")}>重置</Button>
                    </div>
                </div>
                <div className={c("btn-group")}>
                    <Button>导出</Button>
                </div>
            </div>
            <Table columns={columns} pagination={{ onChange: logPageChange, total: logTotal, pageSize: logPagesize }} />
        </>
    )
}

export default OperateLogs
