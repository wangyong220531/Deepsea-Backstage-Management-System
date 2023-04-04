import { Button, DatePicker, Input, Select, Table } from "antd"
import React, { useEffect, useState } from "react"
import type { ColumnsType } from "antd/es/table"
import { ReactNode } from "react"
import { forceFollowList, caseFollowList } from "../../api/command"
import Styles from "./index.module.less"
import dayjs from "dayjs"

const { RangePicker } = DatePicker

interface ForceType extends mfuatv {
    operate?: ReactNode
}

interface CaseType extends Situation {
    operate?: ReactNode
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
            align: "center"
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
                        {e.mPolice.map(m => {
                            return <>{m.userName}</>
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
                        {e.fPolice.map(m => {
                            return <>{m.userName}</>
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
                            <Button type="primary" disabled={true}>
                                定位
                            </Button>
                        </div>
                    </>
                )
            }
        }
    ]

    const CaseColumn: ColumnsType<CaseType> = [
        {
            key: "sheet",
            dataIndex: "sheet",
            title: "警单",
            align: "center"
        },
        {
            key: "status",
            dataIndex: "status",
            title: "状态",
            align: "center"
        },
        {
            key: "address",
            dataIndex: "address",
            title: "报警地址",
            align: "center"
        },
        {
            key: "time",
            dataIndex: "time",
            title: "报警时间",
            align: "center"
        },
        {
            key: "firstTime",
            dataIndex: "firstTime",
            title: "一级派警时间",
            align: "center"
        },
        {
            key: "secondTime",
            dataIndex: "secondTime",
            title: "二级派警时间",
            align: "center"
        },
        {
            key: "handleTeam",
            dataIndex: "handleTeam",
            title: "处置警组",
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
                        <Button type="primary">跟进</Button>
                    </>
                )
            }
        }
    ]

    const [pageNum, setPageNum] = useState(0)
    const [pageSize, setPageSize] = useState(0)
    const [total, setTotal] = useState(0)

    const foreSearch = () => {
        // setForceData([{ teamNo: "警组001", teamStatus: "出警", car: ["苏H71254"], mPolice: [{ userIdCode: "32012332", userName: "卜元浩", userType: "" }], fPolice: [{ userIdCode: "213", userName: "徐腾", userType: "" }], psNo: "xxx" }])
        forceFollowList({
            pageNum,
            pageSize,
            sortType: "",
            teamNo: "",
            teamStatus: ""
        }).then(res => {
            res && setForceData(res.data.myFollowUpAppointTeamVos)
        })
    }
    const caseSearch = () => {
        caseFollowList({
            endTime: "",
            pageNum,
            pageSize,
            psStatus: "",
            startTime: ""
        }).then(res => {
            res && setCaseData(res.data.situtationVos)
        })
    }
    useEffect(() => {
        foreSearch()
    }, [])

    const [table, setTable] = useState<0 | 1>(0)
    const [forceData, setForceData] = useState<ForceType[]>([])
    const [caseData, setCaseData] = useState<CaseType[]>([])
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null)
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null)

    const forceClick = () => {
        setTable(0)
        caseSearch()
    }

    const caseClick = () => {
        setTable(1)
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
        if (e[0] && e[1]) {
            setStartTime(dayjs(e[0].$d))
            setEndTime(dayjs(e[1].$d))
        }
    }

    const reset = () => {
        // set
    }

    return (
        <>
            <div className={Styles["header"]}>
                <div className={Styles["left"]}>
                    <Button type="primary" onClick={forceClick}>
                        警力跟进
                    </Button>
                    <Button type="primary" onClick={caseClick}>
                        警情跟进
                    </Button>
                </div>
                <div className={Styles["query"]}>
                    <RangePicker value={[startTime, endTime]} onCalendarChange={rangeChange} />
                    <Button type="primary">查询</Button>
                    <Button onClick={reset}>重置</Button>
                </div>
            </div>
            {table === 0 ? <Table rowKey={e => e.psNo} columns={ForceColumn} dataSource={forceData} pagination={{ onChange: changeForcePg, total, pageSize }} /> : <Table columns={CaseColumn} pagination={{ onChange: changeCasePg, total, pageSize }} />}
        </>
    )
}

export default Follow
