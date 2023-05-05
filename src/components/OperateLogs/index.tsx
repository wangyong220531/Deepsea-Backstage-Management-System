import { FC, useEffect, useState } from "react"
import styles from "./index.module.less"
import { Button, Input, Table, Tabs, DatePicker } from "antd"
import type { TabsProps } from "antd"
import type { ColumnsType } from "antd/es/table"
import { exportLoginLog, exportOperateLog, searchLoginLog, searchOperateLog } from "../../api/logManage"
import dayjs from "dayjs"
import { exportExcel } from "../../utils/index"
import { useAsync } from "../../utils/hooks"
import useOperates from "../../store/operates"
import { useSession } from "../../store"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

interface OperationType {
    key: number
    type: string
}

const OperateLogs: FC = () => {
    const [pageNum, setPageNum] = useState(1)
    const [logPagesize, setlogPagesize] = useState(10)
    const [logTotal, setLogTotal] = useState(0)
    const [tabActived, setTabActived] = useState<"登录日志" | "操作日志">("登录日志")
    const [queryAccount, setQueryAccount] = useState("")
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(dayjs(Date.now()))
    const operates = useOperates()
    const sessionStore = useSession()
    const [operateId, setOperateId] = useState<0 | 1 | 2 | 5>(0)

    const search = async () => {
        if (tabActived === "登录日志") {
            const res = await searchLoginLog({
                endTime: endTime?.format("YYYY-MM-DD HH:mm:ss"),
                pageNum: pageNum,
                pageSize: logPagesize,
                startTime: startTime?.format("YYYY-MM-DD HH:mm:ss"),
                userName: queryAccount
            })
            res &&
                (setTableData(
                    res.data.rows.map(e => {
                        return {
                            id: e.id,
                            userNo: e.userNo,
                            userName: e.userName,
                            loginIp: e.loginIp,
                            loginTime: e.loginTime,
                            remark: e.remark,
                            status: e.status
                        }
                    })
                ),
                setLogTotal(res.data.total))
            judge()
            return
        }
        const res = await searchOperateLog({
            endTime: endTime?.format("YYYY-MM-DD HH:mm:ss"),
            pageNum: pageNum,
            pageSize: logPagesize,
            startTime: startTime?.format("YYYY-MM-DD HH:mm:ss"),
            userName: queryAccount
        })
        res &&
            (setOperateTableData(
                res.data.rows.map(e => {
                    return {
                        id: e.id,
                        userName: e.userName,
                        account: e.account,
                        operationType: e.operationType,
                        operationTime: e.operationTime,
                        operationIp: e.operationIp,
                        operationTitle: e.operationTitle
                    }
                })
            ),
            setLogTotal(res.data.total))
        judge()
    }

    const judge = () => {
        if (sessionStore.userType === "superAdmin") {
            setOperateId(5)
            return
        }
        if (
            operates[0].item
                .find(e => e.name === "系统管理")
                ?.children?.find(e => e.name === "日志")
                ?.children?.find(e => e.name === "登录日志")
                ?.children?.find(e => e.name === "导出")
        ) {
            setOperateId(1)
        }
        if (
            operates[0].item
                .find(e => e.name === "系统管理")
                ?.children?.find(e => e.name === "日志")
                ?.children?.find(e => e.name === "操作日志")
                ?.children?.find(e => e.name === "导出")
        ) {
            setOperateId(2)
        }
    }

    const onChange = (key: string) => {
        setPageNum(1)
        setlogPagesize(10)
        setQueryAccount("")
        key === "2" ? setTabActived("操作日志") : setTabActived("登录日志")
    }

    const rangeChange = (e: any) => {
        setStartTime(dayjs(e[0]))
        setEndTime(dayjs(e[1]))
    }

    const query = () => {
        setPageNum(1)
        setlogPagesize(10)
    }

    const reset = () => {
        setQueryAccount("")
        setStartTime(dayjs(Date.now()))
        setEndTime(dayjs(Date.now() - 2592000000))
    }

    useEffect(() => {
        search()
    }, [tabActived])

    const loginColumns: ColumnsType<LoginLog> = [
        {
            key: "loginContent",
            dataIndex: "loginContent",
            title: "日志内容",
            align: "center",
            render: (_, e) => {
                return <>{e.status === 0 ? "登录成功！" : "登录失败！"}</>
            }
        },
        {
            key: "userNo",
            dataIndex: "userNo",
            title: "警号",
            align: "center"
        },
        {
            key: "userName",
            dataIndex: "userName",
            title: "姓名",
            align: "center"
        },
        {
            key: "loginIp",
            dataIndex: "loginIp",
            title: "IP",
            align: "center"
        },
        {
            key: "loginTime",
            dataIndex: "loginTime",
            title: "创建时间",
            align: "center"
        }
    ]

    const operationType: OperationType[] = [
        {
            key: 0,
            type: "其它"
        },
        {
            key: 1,
            type: "新增"
        },
        {
            key: 2,
            type: "修改"
        },
        {
            key: 3,
            type: "重置密码"
        },
        {
            key: 4,
            type: "修改密码"
        },
        {
            key: 5,
            type: "查询"
        },
        {
            key: 6,
            type: "删除"
        },
        {
            key: 7,
            type: "授权"
        },
        {
            key: 8,
            type: "取消授权"
        },
        {
            key: 9,
            type: "导出"
        },
        {
            key: 10,
            type: "导入"
        },
        {
            key: 11,
            type: "强制退出"
        },
        {
            key: 12,
            type: "生成代码"
        },
        {
            key: 13,
            type: "清空数据"
        }
    ]

    const operateColumns: ColumnsType<Operate> = [
        {
            key: "account",
            dataIndex: "account",
            title: "警号",
            align: "center"
        },
        {
            key: "userName",
            dataIndex: "userName",
            title: "姓名",
            align: "center"
        },
        {
            key: "operationIp",
            dataIndex: "operationIp",
            title: "IP",
            align: "center"
        },
        {
            key: "operationTitle",
            dataIndex: "operationTitle",
            title: "操作项",
            align: "center"
        },
        {
            key: "operationType",
            dataIndex: "operationType",
            title: "类型",
            align: "center",
            render: (_, e) => {
                return <>{operationType.find(x => x.key === e.operationType)?.type}</>
            }
        },
        {
            key: "operationTime",
            dataIndex: "operationTime",
            title: "操作时间",
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

    const logPageChange = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setlogPagesize(pageSize)
        setQueryAccount("")
    }

    const [loginTableData, setTableData] = useState<LoginLog[]>([])
    const [operateTableData, setOperateTableData] = useState<Operate[]>([])

    const exportLog = async () => {
        if (tabActived === "登录日志") {
            const res = await exportLoginLog({})
            res &&
                exportExcel(
                    res.data.map(e => {
                        return {
                            账号: e.account,
                            姓名: e.userName,
                            IP: e.loginIp,
                            操作时间: e.loginTime,
                            日志内容: e.remark === "Login" ? "登录成功！" : "退出登录！"
                        }
                    }),
                    "登录日志导出"
                )
            return
        }
        const res = await exportOperateLog({})
        res &&
            exportExcel(
                res.data.map(e => {
                    return {
                        警号: e.account,
                        姓名: e.userName,
                        操作时间: e.operationTime,
                        操作类型: operationType.find(a => a.key === e.operationType)?.type
                    }
                }),
                "操作日志导出"
            )
    }

    useAsync(() => search(), [pageNum, logPagesize])

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
                            <Input placeholder="请输入操作人姓名" value={queryAccount} onChange={e => setQueryAccount(e.target.value)} />
                        </div>
                        <div className={c("query-item")}>
                            <div className={c("label")}>创建时间：</div>
                            <RangePicker showTime value={[startTime, endTime]} onCalendarChange={rangeChange} />
                        </div>
                    </div>
                    <div className={c("query-reset")}>
                        <Button className={c("query-btn")} onClick={query}>
                            查询
                        </Button>
                        <Button className={c("reset-btn")} onClick={reset}>
                            重置
                        </Button>
                    </div>
                </div>
                <div className={c("btn-group")}>{(operateId === 1 || operateId === 2 || operateId === 5) && <Button onClick={exportLog}>导出</Button>}</div>
            </div>
            {tabActived === "登录日志" ? <Table rowKey={e => e.id} columns={loginColumns} dataSource={loginTableData} pagination={{ onChange: logPageChange, total: logTotal, pageSize: logPagesize }} /> : <Table rowKey={e => e.id} columns={operateColumns} dataSource={operateTableData} pagination={{ onChange: logPageChange, total: logTotal, pageSize: logPagesize }} />}
        </>
    )
}

export default OperateLogs
