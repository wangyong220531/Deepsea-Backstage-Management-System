import { Button, DatePicker, Divider, Table, Tabs } from "antd"
import React, { useState } from "react"
import type { ColumnsType } from "antd/es/table"
import type { TabsProps } from "antd"
import { ReactNode } from "react"
import { forceFollowList, caseFollowList } from "../../api/command"
import Styles from "./index.module.less"
import dayjs from "dayjs"
import { useAsync } from "../../utils/hooks"
import judgePermissionItem from "../../utils/judge"
import useOperates from "../../store/operates"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface ForceType extends Mfuatv {
    operate?: ReactNode
}

interface CaseType extends Situation {
    operate?: ReactNode
}

interface PsStatus {
    code: string
    desc: string
}

const Follow: React.FC = () => {
    const ForceColumn: ColumnsType<ForceType> = [
        {
            key: "teamNo",
            dataIndex: "teamNo",
            title: "警组",
            align: "center"
        },
        {
            key: "teamStatus",
            dataIndex: "teamStatus",
            title: "状态",
            align: "center",
            render: (_, e) => {
                return <>
                    {e.teamStatus === 0 && <div>初始派警</div>}
                    {e.teamStatus === 1 && <div>警力到场</div>}
                    {e.teamStatus === 2 && <div>警力任务结束</div>}
                    {e.teamStatus === 3 && <div>处置结束</div>}
                </>
            }
        },
        {
            key: "car",
            dataIndex: "car",
            title: "车辆",
            align: "center"
        },
        {
            key: "mPolice",
            dataIndex: "mPolice",
            title: "民警",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        {e.polices.filter(e => e.userType === "CIVILPOLICE").map((m: Police) => {
                            return <><div key={m.userIdCode}>{m.userName}</div></>
                        })}
                    </>
                )
            }
        },
        {
            key: "fPolice",
            dataIndex: "fPolice",
            title: "辅警",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        {e.polices.filter(e => e.userType === "AUXILIARYPOLICE").map((m: Police) => {
                            return <><div key={m.userIdCode} >{m.userName}</div></>
                        })}
                    </>
                )
            }
        },
        {
            key: "psNo",
            dataIndex: "psNo",
            title: "警单",
            align: "center"
        },
        {
            key: "operate",
            dataIndex: "operate",
            title: "操作",
            align: "center",
            render: () => {
                return (
                    <>
                        <div className={Styles["operate"]}>
                            <Button type="primary">到场</Button>
                            <Button type="primary" disabled={true}>
                                处结
                            </Button>
                            {/* <Button type="primary" disabled={true}>
                                定位
                            </Button> */}
                        </div>
                    </>
                )
            }
        }
    ]

    const psStatusList: PsStatus[] = [
        {
            code: "NEW",
            desc: "新建待分派"
        },
        {
            code: "FIRST_ASSIGN",
            desc: "一级分派"
        },
        {
            code: "FIRST_BACK",
            desc: "一级退单"
        },
        {
            code: "FIRST_REASSIGN",
            desc: "一级重派"
        },
        {
            code: "SECOND_ASSIGN",
            desc: "二级分派"
        },
        {
            code: "SECOND_BACK",
            desc: "二级退单"
        },
        {
            code: "SECOND_REASSIGN",
            desc: "二级重派"
        },
        {
            code: "TASK_END",
            desc: "任务结束"
        }
    ]

    const CaseColumn: ColumnsType<CaseType> = [
        {
            key: "psNo",
            dataIndex: "psNo",
            title: "警单",
            align: "center"
        },
        {
            key: "psStatus",
            dataIndex: "psStatus",
            title: "状态",
            align: "center",
            render: (_, e) => {
                return <>
                    {psStatusList.find(s => s.code === e.psStatus)?.desc}
                </>
            }
        },
        {
            key: "psReportUserName",
            dataIndex: "psReportUserName",
            title: "报警人",
            align: "center"
        },
        {
            key: "psPlace",
            dataIndex: "psPlace",
            title: "报警地址",
            align: "center"
        },
        {
            key: "psResportUserPhone",
            dataIndex: "psResportUserPhone",
            title: "报警人手机号",
            align: "center"
        },
        {
            key: "psReportTime",
            dataIndex: "psReportTime",
            title: "报警时间",
            align: "center"
        },
        {
            key: "psFirstDispatchTime",
            dataIndex: "psFirstDispatchTime",
            title: "一级派警时间",
            align: "center"
        },
        {
            key: "psSecondDispatchTime",
            dataIndex: "psSecondDispatchTime",
            title: "二级派警时间",
            align: "center"
        },
        {
            key: "teams",
            dataIndex: "teams",
            title: "处置警组",
            align: "center",
            render: (_, e) => {
                return <>
                    {e.teams.length > 1 ? e.teams.map(t => {
                        return <div key={t.ptPsId}>{t.ptTeamNo}</div>
                    }) : e.teams[0].ptTeamNo}
                </>
            }
        },
        {
            key: "operate",
            dataIndex: "operate",
            title: "操作",
            align: "center",
            render: () => {
                return (
                    <>
                        <Button type="primary">跟进</Button>
                    </>
                )
            }
        }
    ]

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: `警力跟进`
        },
        {
            key: "2",
            label: `警情跟进`
        }
    ]

    const [table, setTable] = useState<0 | 1>(0)
    const [forceData, setForceData] = useState<ForceType[]>([])
    const [caseData, setCaseData] = useState<CaseType[]>([])
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(Date.now()))
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [forceTotal, setForceTotal] = useState(0)
    const [caseTotal, setCaseTotal] = useState(0)

    const onChange = (key: string) => {
        key === "1" ? setTable(0) : setTable(1)
    }

    const search = async () => {
        if (table === 0) {
            const res = await forceFollowList({
                pageNum,
                pageSize,
                sortType: "",
                teamNo: "",
                teamStatus: ""
            })
            res && (setForceData(res.data.myFollowUpAppointTeamVos), setForceTotal(res.data.size))
            return
        }
        const res = await caseFollowList({
            startTime: Number(startTime),
            endTime: Number(endTime),
            pageNum,
            pageSize,
            psStatus: ""
        })
        res && (setCaseData(res.data.situtationVos), setCaseTotal(res.data.size))
        console.log(caseData);

    }

    const query = () => {
        setPageNum(1)
        setPageSize(10)
        search()
    }

    const changeForcePg = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    const changeCasePg = (pageNum: number, pageSize: number) => {
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

    useAsync(() => search(), [pageNum, pageSize, table])

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
                        <Button className={c("query-btn")} onClick={query}>
                            查询
                        </Button>
                        <Button className={c("reset-btn")} onClick={reset}>
                            重置
                        </Button>
                    </div>
                </div>
            </div>
            {table === 0 ? <Table rowKey={e => e.psNo} columns={ForceColumn} dataSource={forceData} pagination={{ onChange: changeForcePg, total: forceTotal, pageSize }} /> : <Table rowKey={e => e.psNo} columns={CaseColumn} dataSource={caseData} pagination={{ onChange: changeCasePg, total: caseTotal, pageSize }} />}
        </>
    )
}

export default Follow
