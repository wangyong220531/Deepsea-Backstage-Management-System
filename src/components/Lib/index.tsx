import { Table, Button, DatePicker, Select, Tooltip, Tabs, TabsProps } from "antd"
import type { ColumnsType } from "antd/es/table"
import { getAllPS } from "../../api/command"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import Styles from "./index.module.less"

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
            title: "警情编号",
            dataIndex: "psNo",
            key: "psNo",
            align: "center",
            width: 120,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 120,
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
                        <Tooltip title={e.psNo}>
                            <div>{e.psNo}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            title: "警情类型",
            dataIndex: "psType",
            key: "psType",
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
            value: "全部",
            label: "全部"
        },
        {
            value: "待分配",
            label: "待分配"
        },
        {
            value: "已分配",
            label: "已分配"
        },
        {
            value: "已派警",
            label: "已派警"
        },
        {
            value: "已到场",
            label: "已到场"
        },
        {
            value: "已处置",
            label: "已处置"
        },
        {
            value: "二级派警员已退单",
            label: "二级派警员已退单"
        },
        {
            value: "已结束",
            label: "已结束"
        },
        {
            value: "已退单",
            label: "已退单"
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

    const [activedBtn, setActivedBtn] = useState<"all" | "latest" | "history">("all")
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(100)
    const [tableData, setTableData] = useState<APSRListItem[]>([])
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null)
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null)
    const [status, setStatus] = useState("")
    const [queryType, setQueryType] = useState<"NEW" | "HISTORY" | "">("")

    useEffect(() => {
        search()
    }, [queryType])

    const showAll = () => {
        setActivedBtn("all")
        setQueryType("")
        search()
    }
    const showLatest = () => {
        setActivedBtn("latest")
        setQueryType("NEW")
    }
    const showHistory = () => {
        setActivedBtn("history")
        setQueryType("HISTORY")
    }
    const rangeChange = (e: any) => {
        if (e[0] && e[1]) {
            setStartTime(dayjs(e[0].$d))
            setEndTime(dayjs(e[1].$d))
        }
    }
    const statusSelect = (e: any) => {
        setStatus(e)
    }
    const reset = () => {
        setStartTime(null)
        setEndTime(null)
    }
    const changePg = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
        search()
    }

    const search = async () => {
        const res = await getAllPS({
            pageNum,
            pageSize,
            psReportTimeStart: dayjs("2023-03-01").unix().toString(),
            psReportTimeStartEnd: dayjs("2023-03-30").unix().toString(),
            psStatus: status,
            queryType
        })
        if (res) {
            setTableData(res.data.list)
        }
        setTableData([{ appointTeamVos: [{ ptPresentTime: "2023-03-06", ptTeamNo: "00001" }], psStatus: "待处置", psNo: "02131", psType: "最新警情", psDiscription: "xxx", psPlace: "淮海路601号", psFirstDispatchTime: "2023-02-05", psSecondDispatchTime: "2023-02-06", psEndTime: "2023-03-06" }])
    }

    const onChange = (key: string) => {
        console.log(key)
    }

    return (
        <>
            <div className={c("header")}>
                <div className={Styles["tab"]}>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
                <div className={c("query")}>
                    {(activedBtn === "all" || activedBtn === "history") && (
                        <>
                            <div className={c("selector")}>
                                <Select style={{ width: "120px" }} options={statusOpt} defaultValue={statusOpt[0]} onSelect={statusSelect} />
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
            <Table columns={columns} dataSource={tableData} pagination={{ onChange: changePg, total, pageSize }} />
        </>
    )
}
export default Lib
