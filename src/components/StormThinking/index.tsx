import { Table, Button, Input, DatePicker, Select, Modal, Form, Tooltip, Popconfirm } from "antd"
import type { ColumnsType } from "antd/es/table"
import React, { ReactNode, useState } from "react"
import Styles from "./index.module.less"
import { useAsync } from "../../utils/hooks"
import { addMindQuestion, searchMind } from "../../api/stormMind"
import { useSession } from "../../store"
import dayjs from "dayjs"
import { EyeOutlined } from "@ant-design/icons"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface DataType extends Mind {
    solution?: Plan[]
    evalContent?: Evaluation[]
    operate?: ReactNode
}

const StormThinking: React.FC = () => {
    const column: ColumnsType<DataType> = [
        {
            key: "queNo",
            dataIndex: "queNo",
            title: "编号",
            align: "center"
        },
        {
            key: "content",
            dataIndex: "content",
            title: "问题",
            align: "center",
            width: 200,
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
            render: (_, e) => {
                return (
                    <>
                        <Tooltip title={e.content}>
                            <div>{e.content}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            key: "createOperator",
            dataIndex: "createOperator",
            title: "提出人",
            align: "center"
        },
        {
            key: "createTime",
            dataIndex: "createTime",
            title: "问题提出时间",
            align: "center"
        },
        {
            key: "solution",
            dataIndex: "solution",
            title: "解决思路",
            align: "center",
            width: 200,
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
            render: (_, e) => {
                return (
                    <>
                        <div className={c("need-show")}>
                            <Tooltip title={e.planVoList[0].solutions}>
                                <div>{e.planVoList[0].solutions}</div>
                            </Tooltip>
                            <Tooltip title="查看全部">
                                <EyeOutlined onClick={() => showAllSolutions(e)} />
                            </Tooltip>
                        </div>
                    </>
                )
            }
        },
        // {
        //     key: "smartUnit",
        //     dataIndex: "smartUnit",
        //     title: "智慧单元",
        //     align: "center"
        // },
        // {
        //     key: "policeType",
        //     dataIndex: "policeType",
        //     title: "警种",
        //     align: "center"
        // },
        // {
        //     key: "ownership",
        //     dataIndex: "ownership",
        //     title: "产权人",
        //     align: "center"
        // },
        // {
        //     key: "solveTime",
        //     dataIndex: "solveTime",
        //     title: "解决时间",
        //     align: "center"
        // },
        // {
        //     key: "type",
        //     dataIndex: "type",
        //     title: "类型",
        //     align: "center"
        // },
        {
            key: "evalContent",
            dataIndex: "evalContent",
            title: "评估内容",
            align: "center",
            width: 200,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 200,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer"
                    }
                }
            },
            render: (_, e) => {
                return (
                    <>
                        {/* <Tooltip title={e.evalContent}>
                            <div>{e.evalContent}</div>
                        </Tooltip> */}
                        <Tooltip title="查看全部">
                            <EyeOutlined onClick={() => showAllEvaluations(e)} />
                        </Tooltip>
                    </>
                )
            }
        },
        // {
        //     key: "evalTime",
        //     dataIndex: "evalTime",
        //     title: "评估时间",
        //     align: "center"
        // },
        // {
        //     key: "status",
        //     dataIndex: "status",
        //     title: "状态",
        //     align: "center"
        // },
        {
            key: "operate",
            dataIndex: "operate",
            title: "操作",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        <div className={Styles["operate"]}>
                            <Button type="primary" className={c("operate-btn")} onClick={() => solute(e)}>
                                方案
                            </Button>
                            <Button type="primary" className={c("operate-btn")} onClick={() => evaluate(e)}>
                                评估
                            </Button>
                            <Button type="primary" className={c("operate-btn")} onClick={() => edit(e)}>
                                编辑
                            </Button>
                        </div>
                    </>
                )
            }
        }
    ]

    const evalTypeOpt: OptionType[] = [
        {
            value: "模型",
            label: "模型"
        },
        {
            value: "技战法",
            label: "技战法"
        }
    ]

    const STFormItem: React.FC = () => {
        return (
            <>
                {/* <Form.Item label="编号" name="code">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item> */}
                <Form.Item label="提出人" name="proper">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item>
                <Form.Item label="问题" name="question">
                    <Input.TextArea className={c("form-item-input-textarea")} placeholder="请输入内容" />
                </Form.Item>
            </>
        )
    }

    const Solutions: React.FC = () => {
        return (
            <>
                {solutionList.map((e, index) => {
                    return (
                        <Form.Item label={`解决思路${index + 1}`} name={`question${index}`}>
                            <Input.TextArea className={c("form-item-input-textarea")} value={e.solutions} disabled />
                        </Form.Item>
                    )
                })}
            </>
        )
    }

    const Evaluations: React.FC = () => {
        return (
            <>
                {evaluationList.map((e, index) => {
                    return (
                        <>
                            <Form.Item label={`评估内容${index + 1}`} name={`evaluation${index}`}>
                                <Input.TextArea className={c("form-item-input-textarea")} value={e.content} disabled />
                            </Form.Item>
                        </>
                    )
                })}
            </>
        )
    }

    const SolutionFormItem: React.FC = () => {
        return (
            <>
                {/* <Form.Item label="编号" name="code">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item> */}
                <Form.Item label="解决方案" name="solution">
                    <Input.TextArea className={c("form-item-input-textarea")} placeholder="请输入解决方案" />
                </Form.Item>
                <Form.Item label="产权人" name="owner">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item>
            </>
        )
    }

    const EvalFormItem: React.FC = () => {
        return (
            <>
                {/* <Form.Item label="编号" name="code">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item> */}
                <Form.Item label="评估" name="evaluation">
                    <Input.TextArea className={c("form-item-input-textarea")} placeholder="请输入评估内容" />
                </Form.Item>
                <Form.Item label="类型" name="type">
                    <Select className={c("form-item-input")} options={evalTypeOpt}></Select>
                </Form.Item>
            </>
        )
    }

    const EditFormItem: React.FC = () => {
        return (
            <>
                {/* <Form.Item label="编号" name="code">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item> */}
                <Form.Item label="问题" name="question">
                    <Input.TextArea className={c("form-item-input-textarea")} />
                </Form.Item>
                <Form.Item label="提出人" name="proper">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item>
                <Form.Item label="解决思路" name="solution">
                    <Input.TextArea className={c("form-item-input-textarea")} />
                </Form.Item>
                <Form.Item label="状态" name="status">
                    <Select
                        className={c("form-item-input")}
                        options={[
                            { value: "运行", label: "运行" },
                            { value: "废弃", label: "废弃" }
                        ]}
                    />
                </Form.Item>
            </>
        )
    }

    const [tableData, setTableData] = useState<DataType[]>([])
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(Date.now()))
    const [title, setTitle] = useState<"解决思路" | "评估内容" | "请提出你的问题" | "请说出你的方案" | "评估" | "编辑">("请提出你的问题")
    const [modalOpen, setModalOpen] = useState(false)
    const [form] = Form.useForm()
    const sessionStore = useSession()
    const [solutionList, setSolutionList] = useState<Plan[]>([])
    const [evaluationList, setEvaluationList] = useState<Evaluation[]>([])

    const search = async () => {
        // const res = await searchMind({
        //     content: "",
        //     pageNum,
        //     pageSize,
        //     policeKind: "",
        //     putMan: "",
        //     queNo: "",
        //     wisdomUnit: ""
        // })
        // res && setTableData(res.data.voList)
        setTableData([{ id: "0", queNo: "0", content: "xxx", createTime: "2023-02-03", createOperator: "蔡徐腾", planVoList: [{ id: "0", queId: "123", planNo: "456", solutions: "xxx", status: "运行", wisdomUnit: "xxx", policeKind: "xxx", createTime: "2023-03-06", createOperator: "卜元浩", evaluateVo: { id: "0", planId: "123", planNo: "456", content: "xxx", type: "技战法", createTime: "2023-04-05", createOperator: "朱晓欢" } }] }])
    }

    const showAllSolutions = (e: DataType) => {
        setTitle("解决思路")
        setSolutionList(e.planVoList)
        setModalOpen(true)
    }

    const showAllEvaluations = (e: DataType) => {
        setTitle("评估内容")
        // setEvaluationList(e.)
        setModalOpen(true)
    }

    const solute = (e: DataType) => {
        setTitle("请说出你的方案")
        setModalOpen(true)
        // form.setFieldsValue({ owner: e.ownership })
    }

    const evaluate = (e: DataType) => {
        setTitle("评估")
        setModalOpen(true)
        // form.setFieldsValue({ type: e.type })
    }

    const edit = (e: DataType) => {
        setTitle("编辑")
        setModalOpen(true)
        // form.setFieldsValue({ question: e.question, proper: e.proposer, status: e.status, solution: e.solution })
    }

    const propConfirm = () => {
        setTitle("请说出你的方案")
    }

    const changePg = (pageNum: number, pageSize: number) => {
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

    const add = () => {
        setTitle("请提出你的问题")
        setModalOpen(true)
        form.setFieldsValue({
            proper: sessionStore.userNo
        })
    }

    const cancel = () => {
        setModalOpen(false)
        if (title === "请提出你的问题") {
            save()
            return
        }
        form.resetFields()
    }

    const save = async () => {
        const res = await form.validateFields()
        setModalOpen(false)
        if (title === "请提出你的问题") {
            addMindQuestion({
                content: res.question,
                putMan: sessionStore.userNo,
                queNo: ""
            }).then(() => {
                form.resetFields()
            })
            return
        }
    }

    useAsync(() => search(), [pageNum, pageSize])

    return (
        <>
            <div className={c("header")}>
                <div className={c("query")}>
                    <div className={c("inputs")}>
                        <RangePicker value={[startTime, endTime]} onCalendarChange={rangeChange} />
                    </div>
                    <div className={c("query-reset")}>
                        <Button className={c("query-btn")} onClick={search}>
                            查询
                        </Button>
                        <Button className={c("reset-btn")} onClick={reset}>
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
            <Table columns={column} dataSource={tableData} pagination={{ onChange: changePg, total, pageSize }} />
            <Modal
                title={title}
                open={modalOpen}
                onOk={save}
                onCancel={cancel}
                footer={
                    title === "请提出你的问题" ? (
                        <>
                            <Popconfirm title icon okText="有好的想法" cancelText="结束" onConfirm={propConfirm} onCancel={cancel}>
                                <Button className={c("save")}>提交</Button>
                            </Popconfirm>
                        </>
                    ) : (
                        <>
                            <Button className={c("cancel")} onClick={cancel}>
                                取消
                            </Button>
                            <Button className={c("save")} onClick={save}>
                                保存
                            </Button>
                        </>
                    )
                }
            >
                <Form labelCol={{ span: 4 }} form={form}>
                    {title == "解决思路" && <Solutions />}
                    {title == "评估内容" && <Evaluations />}
                    {title === "请提出你的问题" && <STFormItem />}
                    {title === "请说出你的方案" && <SolutionFormItem />}
                    {title === "评估" && <EvalFormItem />}
                    {title === "编辑" && <EditFormItem />}
                </Form>
            </Modal>
        </>
    )
}

export default StormThinking
