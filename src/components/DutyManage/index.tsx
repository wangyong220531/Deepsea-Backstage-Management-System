import { Table, Button, Input, DatePicker, Modal, Form, Select, Popconfirm } from "antd"
import { ReactNode, useEffect, useState } from "react"
import { getAllKeyPositions, addDutyManage, getAllPoliceTeam, searchDutyManage, delDutyManage, updateDutyManage } from "../../api/command"
import type { ColumnsType } from "antd/lib/table/InternalTable"
import Styles from "./index.module.less"
import dayjs from "dayjs"
import { useAsync } from "../../utils/hooks"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface DataType {
    key?: string
    id: string
    code: string
    checkTime: string
    position: string
    team: string
    mPolice: TeamUser[]
    fPolice: TeamUser[]
    arriveTime: string
    checkCase: string
    checker: string
    createOperator: string
    createTime: string
    updateOperator: string
    updateTime: string
    status: 0 | 1
    operate?: ReactNode
}

const DutyManage: React.FC = () => {
    const DutyManageFormItem: React.FC = () => {
        return (
            <>
                <Form.Item name="code" label="编号">
                    <Input className={Styles["form-item-input"]} disabled />
                </Form.Item>
                <Form.Item name="checkTime" label="检查时间">
                    <DatePicker showTime placeholder="请选择检查时间" className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="position" label="地点">
                    <Select className={Styles["form-item-input"]} options={position} />
                </Form.Item>
                <Form.Item name="policeTeam" label="警组">
                    <Select className={Styles["form-item-input"]} options={policeTeamLIst} />
                </Form.Item>
                <Form.Item name="mpolice" label="民警">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="fpolice" label="辅警">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="arriveTime" label="到点时间">
                    <DatePicker showTime placeholder="请选择到点时间" className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="checkCase" label="检查情况">
                    <Input.TextArea className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="checker" label="检查人">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
            </>
        )
    }

    const column: ColumnsType<DataType> = [
        {
            key: "code",
            dataIndex: "code",
            title: "编号",
            align: "center"
        },
        {
            key: "checkTime",
            dataIndex: "checkTime",
            title: "检查时间",
            align: "center"
        },
        {
            key: "position",
            dataIndex: "position",
            title: "地点",
            align: "center"
        },
        {
            key: "team",
            dataIndex: "team",
            title: "警组",
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
                        {e.mPolice.map(e => {
                            return <div key={e.reportUserNo}>{e.userName}</div>
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
                        {e.fPolice.map(e => {
                            return <div key={e.reportUserNo}>{e.userName}</div>
                        })}
                    </>
                )
            }
        },
        {
            key: "arriveTime",
            dataIndex: "arriveTime",
            title: "到点时间",
            align: "center"
        },
        {
            key: "checkCase",
            dataIndex: "checkCase",
            title: "检查情况",
            align: "center"
        },
        {
            key: "checker",
            dataIndex: "checker",
            title: "检查人",
            align: "center"
        },
        {
            key: "operate",
            dataIndex: "operate",
            title: "操作",
            align: "center",
            render: (_, e) => {
                return (
                    <div className={Styles["operate"]}>
                        <Button type="primary" className={c("operate-btn")} onClick={() => launch(e)}>
                            启动
                        </Button>
                        <Popconfirm title="确定要删除吗？" onConfirm={() => condirmDel(e)}>
                            <Button type="primary" className={c("operate-btn")}>
                                删除
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]

    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(Date.now()))
    const [form] = Form.useForm()
    const [addOpen, setAddOpen] = useState(false)
    const [policeTeamLIst, setPoliceTeamLIst] = useState<OptionType[]>([])
    const [position, setPosition] = useState<OptionType[]>([])
    const [tableData, setTableData] = useState<DataType[]>([])

    const getALLPT = () => {
        getAllPoliceTeam({}).then(res => {
            res &&
                setPoliceTeamLIst(
                    res.data.map(e => {
                        return {
                            value: e.reportTeamNo,
                            label: e.reportTeamName
                        }
                    })
                )
        })
    }

    const getPositions = () => {
        getAllKeyPositions({}).then(res => {
            res &&
                setPosition(
                    res.data.map(e => {
                        return {
                            value: e.address,
                            label: e.address
                        }
                    })
                )
        })
    }

    const search = async () => {
        const res = await searchDutyManage({
            checkEndTime: endTime.format("YYYY-MM-DD HH:mm:ss"),
            checkStartTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
            location: "",
            mdutyNo: "",
            pageNum,
            pageSize
        })
        res &&
            (setTableData(
                res.data.voList.map(e => {
                    return {
                        id: e.id,
                        code: e.mdutyNo,
                        checkTime: e.checkTime,
                        position: e.location,
                        team: e.teamNo,
                        mPolice: e.teamUsers.filter(e => e.userType !== "AUXILIARYPOLICE"),
                        fPolice: e.teamUsers.filter(e => e.userType === "AUXILIARYPOLICE"),
                        arriveTime: e.toPointTime,
                        checkCase: e.checkSituation,
                        checker: e.checkUser,
                        createOperator: e.createOperator,
                        createTime: e.createTime,
                        updateOperator: e.updateOperator,
                        updateTime: e.updateTime,
                        status: e.status
                    }
                })
            ),
            setTotal(res.data.size))
        getALLPT()
        getPositions()
    }

    const launch = (e: DataType) => {
        const tName = policeTeamLIst.find(t => t.value === e.team)?.label
        updateDutyManage({
            checkSituation: e.checkCase,
            checkTime: e.checkTime,
            checkUser: e.checker,
            createOperator: e.createOperator,
            createTime: e.createTime,
            id: e.id,
            location: e.position,
            mdutyNo: e.code,
            status: 1,
            teamName: tName,
            teamNo: e.team,
            toPointTime: e.arriveTime,
            updateOperator: e.updateOperator,
            updateTime: e.updateTime
        }).then(() => {
            search()
        })
    }

    const rangeChange = (e: any) => {
        setStartTime(dayjs(e[0]))
        setEndTime(dayjs(e[1]))
    }

    const condirmDel = (e: DataType) => {
        const id = e.id
        delDutyManage({ id }).then(() => {
            search()
        })
    }

    const reset = () => {
        setStartTime(dayjs(Date.now() - 2592000000))
        setEndTime(dayjs(Date.now()))
    }

    const changePg = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    const save = async () => {
        const res = await form.validateFields()
        const tName = policeTeamLIst.find(t => t.value === res.policeTeam)?.label
        addDutyManage({
            checkSituation: res.checkCase,
            checkTime: dayjs(res.checkTime).format("YYYY-MM-DD HH:mm:ss"),
            checkUser: res.checker,
            location: res.position,
            mdutyNo: res.code,
            teamName: tName,
            teamNo: res.policeTeam,
            toPointTime: res.arrivalTime
        }).then(() => {
            setAddOpen(false)
            form.resetFields()
            search()
        })
    }

    const add = () => {
        setAddOpen(true)
        form.setFieldsValue({
            code: Date.now()
        })
    }

    const addCancel = () => {
        setAddOpen(false)
        form.resetFields()
    }

    useAsync(() => search(), [pageNum, pageSize])

    return (
        <>
            <div className={c("header")}>
                <div className={Styles["query"]}>
                    <RangePicker value={[startTime, endTime]} onCalendarChange={rangeChange} />
                    <div className={c("query-reset")}>
                        <Button onClick={search} className={c("query-btn")}>
                            查询
                        </Button>
                        <Button onClick={reset} className={c("reset-btn")}>
                            重置
                        </Button>
                    </div>
                </div>
                <div className={c("btn-group")}>
                    <Button className={c("add")} onClick={add}>
                        新增
                    </Button>
                </div>
            </div>
            <Table columns={column} rowKey={e => e.code} dataSource={tableData} pagination={{ onChange: changePg, total, pageSize }} />
            <Modal
                title="新增勤务"
                open={addOpen}
                onCancel={addCancel}
                footer={
                    <>
                        <Button className={c("cancel")} onClick={addCancel}>
                            取消
                        </Button>
                        <Button className={c("save")} onClick={save}>
                            保存
                        </Button>
                    </>
                }
            >
                <Form labelCol={{ span: 4 }} form={form}>
                    <DutyManageFormItem />
                </Form>
            </Modal>
        </>
    )
}

export default DutyManage
