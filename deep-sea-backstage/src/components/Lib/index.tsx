import { Table, Button, DatePicker, Select, Tooltip, Tabs, TabsProps } from "antd"
import type { ColumnsType } from "antd/es/table"
import { getAllPS } from "../../api/command"
import { useState } from "react"
import dayjs from "dayjs"
import Styles from "./index.module.less"
import { useAsync } from "../../utils/hooks"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

const Lib: React.FC = () => {
    const columns: ColumnsType<APSRListItem> = [
        {
            title: "警情状态",
            dataIndex: "psStatus",
            key: "psStatus",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        {e.psStatus === "NEW" && <div>新建待分派</div>}
                        {e.psStatus === "FIRST_ASSIGN" && <div>一级分派</div>}
                        {e.psStatus === "FIRST_BACK" && <div>一级退单</div>}
                        {e.psStatus === "FIRST_REASSIGN" && <div>一级重派</div>}
                        {e.psStatus === "SECOND_ASSIGN" && <div>二级分派</div>}
                        {e.psStatus === "SECOND_REASSIGN" && <div>二级重派</div>}
                        {e.psStatus === "SECOND_BACK" && <div>二级退单</div>}
                        {e.psStatus === "TASK_END" && <div>任务结束</div>}
                    </>
                )
            }
        },
        {
            key: "psReportUserName",
            dataIndex: "psReportUserName",
            title: "报警人",
            align: "center"
        },
        {
            key: "psReportTime",
            dataIndex: "psReportTime",
            title: "报警时间",
            align: "center"
        },
        {
            key: "psResportUserPhone",
            dataIndex: "psResportUserPhone",
            title: "报警人电话",
            align: "center"
        },
        {
            title: "内容",
            dataIndex: "psDiscription",
            key: "psDiscription",
            align: "center",
            onCell: () => {
                return {
                    style: {
                        maxWidth: 200,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        textAlign: "center"
                    }
                }
            },
            width: 200,
            render: (_, e) => {
                return (
                    <>
                        <Tooltip title={e.psDiscription}>
                            <div>{e.psDiscription}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            title: "警情地址",
            dataIndex: "psPlace",
            key: "psPlace",
            align: "center",
            width: 160,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 160,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        textAlign: "center"
                    }
                }
            },
            render: (_, e) => {
                return (
                    <>
                        <Tooltip title={e.psPlace}>
                            <div>{e.psPlace}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            title: "一级派警时间",
            dataIndex: "psFirstDispatchTime",
            key: "psFirstDispatchTime",
            align: "center"
        },
        {
            title: "二级派警时间",
            dataIndex: "psSecondDispatchTime",
            key: "psSecondDispatchTime",
            align: "center"
        },
        {
            title: "警组",
            dataIndex: "appointTeamVos",
            key: "appointTeamVos",
            align: "center",
            render: (_, e) => {
                return <>{e.appointTeamVos && <div>{e.appointTeamVos.map(x => x.ptTeamNo + "-" + x.ptPresentTime)}</div>}</>
            }
        },
        {
            title: "警情处置时间",
            dataIndex: "psEndTime",
            key: "psEndTime",
            align: "center"
        }
    ]

    const statusOpt: OptionType[] = [
        {
            value: "",
            label: "全部"
        },
        {
            value: "NEW",
            label: "新建待分配"
        },
        {
            value: "FIRST_ASSIGN",
            label: "一级分派"
        },
        {
            value: "FIRST_BACK",
            label: "一级退单"
        },
        {
            value: "FIRST_REASSIGN",
            label: "一级重派"
        },
        {
            value: "SECOND_ASSIGN",
            label: "二级分派"
        },
        {
            value: "SECOND_REASSIGN",
            label: "二级重派"
        },
        {
            value: "SECOND_BACK",
            label: "二级退单"
        },
        {
            value: "TASK_END",
            label: "任务结束"
        }
    ]

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: `全部警情`
        },
        {
            key: "2",
            label: `最新警情`
        },
        {
            key: "3",
            label: "历史警情"
        }
    ]

    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [tableData, setTableData] = useState<APSRListItem[]>([])
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(Date.now()))
    const [queryType, setQueryType] = useState<"" | "NEW" | "HISTORY">("")
    const [psStatus, setPsStatus] = useState<string | undefined>(statusOpt[0].label)

    const search = async () => {
        const res = await getAllPS({
            pageNum,
            pageSize,
            psReportTimeStart: Number(startTime),
            psReportTimeStartEnd: Number(endTime),
            psStatus: statusOpt.find(e => e.label === psStatus)?.value,
            queryType
        })
        res && (setTableData(res.data.list), setTotal(res.data.total))
    }

    const onChange = (key: string) => {
        if (key === "1") {
            setQueryType("")
            return
        }
        if (key === "2") {
            setQueryType("NEW")
            return
        }
        if (key === "3") {
            setQueryType("HISTORY")
            return
        }
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
        setPsStatus("全部")
    }

    useAsync(() => search(), [pageNum, pageSize, queryType])

    return (
        <>
            <div className={c("header")}>
                <div className={Styles["tab"]}>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
                <div className={c("query")}>
                    {(queryType === "" || queryType === "HISTORY") && (
                        <>
                            <div className={c("selector")}>
                                <Select style={{ width: "120px" }} options={statusOpt} value={psStatus} onChange={e => setPsStatus(statusOpt.find(x => x.value === e)?.label)} />
                            </div>
                        </>
                    )}
                    <div className={c("rangePicker")}>
                        <RangePicker value={[startTime, endTime]} onCalendarChange={rangeChange} />
                    </div>
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
            <Table rowKey={e =>e.psNo} columns={columns} dataSource={tableData} pagination={{ onChange: changePg, total, pageSize }} />
        </>
    )
}
export default Lib
