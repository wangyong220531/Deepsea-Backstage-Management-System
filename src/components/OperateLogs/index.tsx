import { FC, useEffect, useState } from "react"
import styles from "./index.module.less"
import { Button, Input, Table, Tabs, DatePicker } from "antd"
import type { TabsProps } from "antd"
import type { ColumnsType } from "antd/es/table"
import { exportLoginLog, exportOperateLog, searchLoginLog, searchOperateLog } from "../../api/logManage"
import dayjs from "dayjs"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

const OperateLogs: FC = () => {
    const onChange = (key: string) => {
        key === "2" ? setTabActived("操作日志") : setTabActived("登录日志")
    }

    const [pageNum, setPageNum] = useState(1)
    const [logPagesize, setlogPagesize] = useState(10)
    const [logTotal, setLogTotal] = useState(100)

    const [tabActived, setTabActived] = useState<"登录日志" | "操作日志">("登录日志")

    const search = () => {
        tabActived === "登录日志"
            ? searchLoginLog({
                  endTime: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                  pageNum: pageNum,
                  pageSize: logPagesize,
                  startTime: dayjs(Date.now() - 2592000000).format("YYYY-MM-DD HH:mm:ss"),
                  userName: ""
              }).then(res => {
                  res &&
                      (setTableData(
                          res.data.rows.map(e => {
                              return {
                                  id: e.id,
                                  userNo: e.userNo,
                                  userName: e.userName,
                                  loginIp: e.loginIp,
                                  loginTime: e.loginTime,
                                  remark: e.remark
                              }
                          })
                      ),
                      setLogTotal(res.data.total))
              })
            : searchOperateLog({
                  endTime: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                  pageNum: pageNum,
                  pageSize: logPagesize,
                  startTime: dayjs(Date.now() - 2592000000).format("YYYY-MM-DD HH:mm:ss"),
                  userName: ""
              }).then(res => {
                  res &&
                      setOperateTableData(
                          res.data.rows.map(e => {
                              return {
                                  id: e.id,
                                  userName: e.userName,
                                  userNo: e.userNo,
                                  operationType: e.operationType,
                                  operationTime: e.operationTime
                              }
                          })
                      )
              })
    }

    useEffect(() => {
        search()
    }, [tabActived, pageNum, logPagesize])

    const loginColumns: ColumnsType<LoginLog> = [
        {
            key: "loginContent",
            dataIndex: "loginContent",
            title: "日志内容",
            align: "center",
            render: (_, e) => {
                return <>{`${e.loginTime}  ${e.remark === "Login" ? "登录成功！" : "退出登录！"}`}</>
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

    const operateColumns: ColumnsType<Operate> = [
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
            key: "operationType",
            dataIndex: "operationType",
            title: "类型",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        <div className={c("operate-type")}>
                            <div>{e.operationTime}</div>
                            {e.operationType === 0 && <div>其它</div>}
                            {e.operationType === 1 && <div>新增</div>}
                            {e.operationType === 2 && <div>修改</div>}
                            {e.operationType === 3 && <div>重置密码</div>}
                            {e.operationType === 4 && <div>修改密码</div>}
                            {e.operationType === 5 && <div>查询</div>}
                            {e.operationType === 6 && <div>删除</div>}
                            {e.operationType === 7 && <div>授权</div>}
                            {e.operationType === 8 && <div>取消授权</div>}
                            {e.operationType === 9 && <div>导出</div>}
                            {e.operationType === 10 && <div>导入</div>}
                            {e.operationType === 11 && <div>强制退出</div>}
                            {e.operationType === 12 && <div>生成代码</div>}
                            {e.operationType === 13 && <div>清空数据</div>}
                        </div>
                    </>
                )
            }
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
        search()
    }

    const operatePageChange = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setlogPagesize(pageSize)
        search()
    }

    const [loginTableData, setTableData] = useState<LoginLog[]>([])
    const [operateTableData, setOperateTableData] = useState<Operate[]>([])

    const exportLog = () => {
        tabActived === "登录日志" ? exportLoginLog({}) : exportOperateLog({})
    }

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
                            <Input placeholder="亲输入操作人警号" />
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
                    <Button onClick={exportLog}>导出</Button>
                </div>
            </div>
            {tabActived === "登录日志" ? <Table rowKey={e => e.id} columns={loginColumns} dataSource={loginTableData} pagination={{ onChange: logPageChange, total: logTotal, pageSize: logPagesize }} /> : <Table rowKey={e => e.id} columns={operateColumns} dataSource={operateTableData} pagination={{ onChange: logPageChange, total: logTotal, pageSize: logPagesize }} />}
        </>
    )
}

export default OperateLogs
