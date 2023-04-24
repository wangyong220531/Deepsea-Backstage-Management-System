import { Button, Input, DatePicker, Table, Select, Modal, Form } from "antd"
import { ReactNode, useState } from "react"
import type { ColumnsType } from "antd/es/table"
import Styles from "./index.module.less"
import dayjs from "dayjs"
import { addSmartApp, appOperate, searchSmartApp, updateSmartApp } from "../../api/smartApp"
import { useAsync } from "../../utils/hooks"
import { getUnitList } from "../../api/userManage"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface DataType extends AddSmartAppData {
    operate?: ReactNode
}

const FilterFormItem: React.FC = () => {
    return (
        <>
            <Form.Item name="filterReason" label="过滤原因">
                <Input.TextArea className={c("form-item-input-textarea")} />
            </Form.Item>
        </>
    )
}

const FeedbackFormItem: React.FC = () => {
    return (
        <>
            <Form.Item name="feedback" label="反馈">
                <Input.TextArea className={c("form-item-input-textarea")} />
            </Form.Item>
        </>
    )
}

const EvaluateFormItem: React.FC = () => {
    return (
        <>
            <Form.Item name="evaluation" label="评估">
                <Input.TextArea className={c("form-item-input-textarea")} />
            </Form.Item>
        </>
    )
}

const Application: React.FC = () => {
    // const typeOptions: OptionType[] = [
    //     {
    //         value: "模型",
    //         label: "模型"
    //     },
    //     {
    //         value: "技战法",
    //         label: "技战法"
    //     }
    // ]

    const smartAppList: OptionType[] = [
        {
            value: "全部",
            label: "全部"
        },
        {
            value: "智慧安防小区",
            label: "智慧安防小区"
        },
        {
            value: "智慧安防校区",
            label: "智慧安防校区"
        },
        {
            value: "智慧安防CBD",
            label: "智慧安防CBD"
        },
        {
            value: "智慧安防医院",
            label: "智慧安防医院"
        },
        {
            value: "智慧安防车站",
            label: "智慧安防车站"
        }
    ]

    const column: ColumnsType<DataType> = [
        {
            key: "type",
            dataIndex: "type",
            title: "类型",
            align: "center"
        },
        {
            key: "applyNo",
            dataIndex: "applyNo",
            title: "编码",
            align: "center"
        },
        {
            key: "info",
            dataIndex: "info",
            title: "内容",
            align: "center",
            width: "200px"
        },
        {
            key: "toUser",
            dataIndex: "toUser",
            title: "指向对象",
            align: "center"
        },
        {
            key: "wisdomUnit",
            dataIndex: "wisdomUnit",
            title: "智慧单元",
            align: "center"
        },
        {
            key: "policeKind",
            dataIndex: "policeKind",
            title: "警种",
            align: "center"
        },
        {
            key: "managerArea",
            dataIndex: "managerArea",
            title: "辖区",
            align: "center"
        },
        {
            key: "status",
            dataIndex: "status",
            title: "状态",
            align: "center"
        },
        {
            key: "bmNo",
            dataIndex: "bmNo",
            title: "（模型/技战）法编号",
            align: "center"
        },
        {
            key: "operate",
            dataIndex: "operate",
            title: "操作",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        <div className={Styles["operate"]}>
                            <Button className={c("operate-btn")} onClick={() => filter(e)}>
                                过滤
                            </Button>
                            <Button className={c("operate-btn")} onClick={() => sign(e)}>
                                签收
                            </Button>
                            <Button className={c("operate-btn")} onClick={() => feedback(e)}>
                                反馈
                            </Button>
                            <Button className={c("operate-btn")} onClick={() => evaluate(e)}>
                                评估
                            </Button>
                        </div>
                    </>
                )
            }
        }
    ]

    const policeTypeList: OptionType[] = [
        {
            value: "全部",
            label: "全部"
        },
        {
            value: "治安",
            label: "治安"
        },
        {
            value: "刑侦",
            label: "刑侦"
        },
        {
            value: "经侦",
            label: "经侦"
        },
        {
            value: "巡防",
            label: "巡防"
        },
        {
            value: "围保",
            label: "围保"
        },
        {
            value: "网安",
            label: "网安"
        },
        {
            value: "法制",
            label: "法制"
        },
        {
            value: "指挥",
            label: "指挥"
        },
        {
            value: "涉稳",
            label: "涉稳"
        },
        {
            value: "集成",
            label: "集成"
        }
    ]

    const data: DataType[] = [
        {
            id: "0",
            applyNo: "00",
            bmNo: "000",
            info: "我是智慧应用1",
            managerArea: "辖区1",
            policeKind: "维稳",
            remark: "备注1",
            status: "待过滤",
            toUser: "蔡徐腾",
            type: "技战法",
            wisdomUnit: "xxx"
        }
    ]

    const [modalOpen, setModalOpen] = useState(false)
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(Date.now()))
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [form] = Form.useForm()
    const [modalTitle, setModalTitle] = useState<"新增" | "过滤原因" | "反馈" | "评估">("新增")
    const [formSpan, setFormSpan] = useState<4 | 8>(8)
    // const sessionStore = useSession()
    const [selectApp, setSelectApp] = useState<AddSmartAppData>(Object)
    const [tableData, setTableData] = useState<DataType[]>([])
    const [jurisdictionList, setJurisdictionList] = useState<OptionType[]>([])
    const [policeKind, setPoliceKind] = useState("全部")
    const [wisdomUnitType, setWisdomUnitType] = useState("全部")

    const AddFormItem: React.FC = () => {
        return (
            <>
                {/* <Form.Item name="applyNo" label="编码">
                    <Input className={c("form-item-input")} disabled />
                </Form.Item> */}
                <Form.Item name="bmNo" label="（模型/技战）法编号">
                    <Input className={c("form-item-input")} />
                </Form.Item>
                <Form.Item name="type" label="类型">
                    <Input className={c("form-item-input")} disabled />
                </Form.Item>
                <Form.Item name="toUser" label="指向对象">
                    <Input className={c("form-item-input")} />
                </Form.Item>
                <Form.Item name="wisdomUnit" label="智慧单元">
                    <Input className={c("form-item-input")} disabled />
                </Form.Item>
                <Form.Item name="policeKind" label="警种">
                    <Input className={c("form-item-input")} disabled />
                </Form.Item>
                <Form.Item name="managerArea" label="辖区">
                    <Select className={c("form-item-input")} options={jurisdictionList} />
                </Form.Item>
                <Form.Item name="info" label="内容">
                    <Input.TextArea className={c("form-item-input")} />
                </Form.Item>
            </>
        )
    }

    const search = async () => {
        setTableData(data)
        getUnitList({}).then(res => {
            res &&
                setJurisdictionList(
                    res.data.unitInfos.map(e => {
                        return {
                            value: e.unitNo,
                            label: e.unitName
                        }
                    })
                )
        })
        const res = await searchSmartApp({
            applyNo: "",
            manageArea: "",
            toUser: "",
            stime: startTime.format("YYYY-MM-DD HH:mm:ss"),
            etime: endTime.format("YYYY-MM-DD HH:mm:ss"),
            pageNum,
            pageSize,
            policeKind,
            status: "",
            wisdomUnitType
        })
        if (res) {
        }
    }

    const reset = () => {
        setStartTime(dayjs(Date.now() - 2592000000))
        setEndTime(dayjs(Date.now()))
    }

    const rangeChange = (e: any) => {
        setStartTime(dayjs(e[0]))
        setEndTime(dayjs(e[1]))
    }

    const add = () => {
        setModalTitle("新增")
        setFormSpan(8)
        setModalOpen(true)
        form.setFieldsValue({
            applyNo: Date.now()
        })
    }

    const addCancel = () => {
        setModalOpen(false)
        form.resetFields()
    }

    const filter = (e: DataType) => {
        setModalTitle("过滤原因")
        setSelectApp(e)
        setFormSpan(4)
        setModalOpen(true)
    }

    const sign = (e: DataType) => {
        updateSmartApp({
            applyNo: e.applyNo,
            bmNo: e.bmNo,
            id: e.id,
            info: e.info,
            managerArea: e.managerArea,
            policeKind: e.policeKind,
            remark: e.remark,
            status: "已签收",
            toUser: e.toUser,
            type: e.type,
            wisdomUnit: e.wisdomUnit
        }).then(() => {
            search()
        })
    }

    const feedback = (e: DataType) => {
        setModalTitle("反馈")
        setSelectApp(e)
        setFormSpan(4)
        setModalOpen(true)
    }

    const evaluate = (e: DataType) => {
        setModalTitle("评估")
        setSelectApp(e)
        setFormSpan(4)
        setModalOpen(true)
    }

    const save = async () => {
        const res = await form.validateFields()
        if (modalTitle === "新增") {
            addSmartApp({
                applyNo: res.applyNo,
                bmNo: res.bmNo,
                info: res.info,
                managerArea: res.managerArea,
                policeKind: res.policeKind,
                remark: res.remark,
                status: res.status,
                toUser: res.toUser,
                type: res.type,
                wisdomUnit: res.wisdomUnit
            }).then(() => {
                setModalOpen(false)
                search()
                form.resetFields()
            })
            return
        }
        if (modalTitle === "过滤原因") {
            appOperate({
                context: res.filterReason,
                type: "1",
                wpId: selectApp.id
            }).then(() => {
                setModalOpen(false)
                search()
                form.resetFields()
            })
            return
        }
        if (modalTitle === "反馈") {
            appOperate({
                context: res.feedback,
                type: "2",
                wpId: selectApp.id
            }).then(() => {
                setModalOpen(false)
                search()
                form.resetFields()
            })
            return
        }
        if (modalTitle === "评估") {
            appOperate({
                context: res.evaluation,
                type: "3",
                wpId: selectApp.id
            }).then(() => {
                setModalOpen(false)
                search()
                form.resetFields()
            })
            return
        }
    }

    const pageChange = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    useAsync(() => search(), [pageNum, pageSize])

    return (
        <>
            <div className={c("header")}>
                <div className={Styles["query"]}>
                    <div className={c("inputs")}>
                        <RangePicker value={[startTime, endTime]} showTime onChange={rangeChange} />
                        <div className={c("query-item")}>
                            <div>类型：</div>
                            <Select className={c("select")} defaultValue={smartAppList[0].label} options={smartAppList} onChange={e => setPoliceKind(e)
                            } />
                        </div>
                        <div className={c("query-item")}>
                            <div>警种：</div>
                            <Select defaultValue={policeTypeList[0].label} options={policeTypeList} onChange={e => setWisdomUnitType(e)} />
                        </div>
                    </div>
                    <div className={c("query-reset")}>
                        <Button className={c("query-button")} onClick={() => search()}>
                            查询
                        </Button>
                        <Button onClick={reset}>重置</Button>
                    </div>
                </div>
                <div className={c("btn-group")}>
                    <Button className={c("add")} onClick={add}>
                        新增
                    </Button>
                </div>
            </div>
            <Table rowKey={e => e.applyNo} dataSource={tableData} columns={column} pagination={{ onChange: pageChange, total, pageSize }} />
            <Modal
                title={modalTitle}
                open={modalOpen}
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
                <Form labelCol={{ span: formSpan }} form={form}>
                    {modalTitle === "新增" && <AddFormItem />}
                    {modalTitle === "过滤原因" && <FilterFormItem />}
                    {modalTitle === "反馈" && <FeedbackFormItem />}
                    {modalTitle === "评估" && <EvaluateFormItem />}
                </Form>
            </Modal>
        </>
    )
}

export default Application
