import { Button, Input, DatePicker, Table, Select, Modal, Form } from "antd"
import { ReactNode, useState } from "react"
import type { ColumnsType } from "antd/es/table"
import Styles from "./index.module.less"
import dayjs from "dayjs"
import { addSmartApp, searchSmartApp } from "../../api/smartApp"
import { useAsync } from "../../utils/hooks"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface DataType extends AddSmartAppData {
    operate?: ReactNode
}

const AddFormItem: React.FC = () => {
    return (
        <>
            <Form.Item name="applyNo" label="编码">
                <Input className={c("form-item-input")} disabled />
            </Form.Item>
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
                <Select className={c("form-item-input")} />
            </Form.Item>
            <Form.Item name="info" label="内容">
                <Input.TextArea className={c("form-item-input")} />
            </Form.Item>
        </>
    )
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
            <Form.Item name="evaluate" label="评估">
                <Input.TextArea className={c("form-item-input-textarea")} />
            </Form.Item>
        </>
    )
}

const Application: React.FC = () => {
    const typeOptions: OptionType[] = [
        {
            value: "模型",
            label: "模型"
        },
        {
            value: "技战法",
            label: "技战法"
        }
    ]

    const smartAppList: OptionType[] = [
        {
            value: "0",
            label: "全部"
        },
        {
            value: "1",
            label: "智慧安防小区"
        },
        {
            value: "2",
            label: "智慧安防校区"
        },
        {
            value: "3",
            label: "智慧安防CBD"
        },
        {
            value: "4",
            label: "智慧安防医院"
        },
        {
            value: "5",
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
            key: "code",
            dataIndex: "code",
            title: "编码",
            align: "center"
        },
        {
            key: "time",
            dataIndex: "time",
            title: "时间",
            align: "center"
        },
        {
            key: "content",
            dataIndex: "content",
            title: "内容",
            align: "center",
            width: "200px"
        },
        {
            key: "pointObj",
            dataIndex: "pointObj",
            title: "指向对象",
            align: "center"
        },
        {
            key: "smartUnit",
            dataIndex: "smartUnit",
            title: "智慧单元",
            align: "center"
        },
        {
            key: "policeType",
            dataIndex: "policeType",
            title: "警种",
            align: "center"
        },
        {
            key: "jurisdiction",
            dataIndex: "jurisdiction",
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
            key: "morbCode",
            dataIndex: "morbCode",
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
            value: "0",
            label: "全部"
        },
        {
            value: "1",
            label: "治安"
        },
        {
            value: "2",
            label: "刑侦"
        },
        {
            value: "3",
            label: "经侦"
        },
        {
            value: "4",
            label: "巡防"
        },
        {
            value: "5",
            label: "围保"
        },
        {
            value: "4",
            label: "网安"
        },
        {
            value: "7",
            label: "法制"
        },
        {
            value: "8",
            label: "指挥"
        },
        {
            value: "9",
            label: "涉稳"
        },
        {
            value: "10",
            label: "集成"
        }
    ]

    // const tableData: DataType[] = [
    //     {
    //         key: "0",
    //         type: "模型",
    //         code: "123",
    //         time: "2023-03-11",
    //         content: "xxx",
    //         pointObj: "卜元浩",
    //         smartUnit: "智慧安防小区",
    //         policeType: "治安",
    //         jurisdiction: "开发区",
    //         status: "待过滤",
    //         morbCode: "xxx"
    //     }
    // ]

    const [modalOpen, setModalOpen] = useState(false)
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(Date.now()))
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [appTypeSelect, setAppTypeSelect] = useState<string | undefined>(smartAppList[0].label)
    const [policeTypeSelect, setPoliceTypeSelect] = useState<string | undefined>(policeTypeList[0].label)
    const [form] = Form.useForm()
    const [modalTitle, setModalTitle] = useState<"新增" | "过滤原因" | "反馈" | "评估">("新增")
    const [formSpan, setFormSpan] = useState<4 | 8>(8)
    // const sessionStore = useSession()

    const search = async () => {
        const res = await searchSmartApp({
            applyNo: "",
            manageArea: "",
            toUser: "",
            stime: startTime.format("YYYY-MM-DD HH:mm:ss"),
            etime: endTime.format("YYYY-MM-DD HH:mm:ss"),
            pageNum,
            pageSize,
            // appType: Number(smartAppList.find(x => x.label === appTypeSelect)?.value),
            policeKind: Number(policeTypeList.find(x => x.label === policeTypeSelect)?.value),
            status: ""
        })
        if (res) {
        }
    }

    const reset = () => {
        setStartTime(dayjs(Date.now() - 2592000000))
        setEndTime(dayjs(Date.now()))
        setAppTypeSelect("全部")
        setPoliceTypeSelect("全部")
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
        setFormSpan(4)
        setModalOpen(true)
    }

    const sign = (e: DataType) => {}

    const feedback = (e: DataType) => {
        setModalTitle("反馈")
        setFormSpan(4)
        setModalOpen(true)
    }

    const evaluate = (e: DataType) => {
        setModalTitle("评估")
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
                form.resetFields()
            })
            return
        }
        if (modalTitle === "过滤原因") {
            return
        }
        if (modalTitle === "反馈") {
            return
        }
        if (modalTitle === "评估") {
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
                            <Select className={c("select")} value={appTypeSelect} options={smartAppList} onChange={e => setAppTypeSelect(smartAppList.find(x => x.value === e)?.label)} />
                        </div>
                        <div className={c("query-item")}>
                            <div>警种：</div>
                            <Select value={policeTypeSelect} options={policeTypeList} onChange={e => setPoliceTypeSelect(policeTypeList.find(x => x.value === e)?.label)} />
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
            <Table columns={column} pagination={{ onChange: pageChange, total, pageSize }} />
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
