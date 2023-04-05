import { Table, Button, Input, DatePicker, Select, Modal, Form, Tooltip, Popconfirm } from "antd"
import type { ColumnsType } from "antd/es/table"
import React, { ReactNode, useState } from "react"
import dayjs from "dayjs"
import Styles from "./index.module.less"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface DataType {
    key: string
    code: string
    question: string
    proposer: string
    qptime: string
    solution: string
    ownership: string
    solveTime: string
    type: string
    evalContent: string
    evalTime: string
    status: string
    operate?: ReactNode
}

const StormThinking: React.FC = () => {
    const column: ColumnsType<DataType> = [
        {
            key: "code",
            dataIndex: "code",
            title: "编号",
            align: "center"
        },
        {
            key: "question",
            dataIndex: "question",
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
                        <Tooltip title={e.question}>
                            <div>{e.question}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            key: "proposer",
            dataIndex: "proposer",
            title: "提出人",
            align: "center"
        },
        {
            key: "qptime",
            dataIndex: "qptime",
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
                        <Tooltip title={e.solution}>
                            <div>{e.solution}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            key: "ownership",
            dataIndex: "ownership",
            title: "产权人",
            align: "center"
        },
        {
            key: "solveTime",
            dataIndex: "solveTime",
            title: "解决时间",
            align: "center"
        },
        {
            key: "type",
            dataIndex: "type",
            title: "类型",
            align: "center"
        },
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
                        <Tooltip title={e.evalContent}>
                            <div>{e.evalContent}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            key: "evalTime",
            dataIndex: "evalTime",
            title: "评估时间",
            align: "center"
        },
        {
            key: "status",
            dataIndex: "status",
            title: "状态",
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
                            <Button type="primary" onClick={() => setSolutionOpen(true)}>
                                方案
                            </Button>
                            <Button type="primary" onClick={() => evalSolution(e)}>
                                评估
                            </Button>
                            <Button type="primary" onClick={() => edit(e)}>
                                编辑
                            </Button>
                        </div>
                    </>
                )
            }
        }
    ]

    const edit = (e: DataType) => {
        setEditOpen(true)
        setEditCode(e.code)
        setEditQuestion(e.question)
        setEditProposer(e.proposer)
        setSolution(e.solution)
        setEditStatus(e.status)
    }

    const evalSolution = (e: DataType) => {
        setEvalOpen(true)
        setEvalContent(e.status)
    }

    const data: DataType[] = [
        {
            key: "0",
            code: "123",
            question: "实现三维地图多数据展示,具体包括指挥调度、人像检索、视频播放...",
            proposer: "卜元浩",
            qptime: "2023-03-20",
            solution: "实现三维地图多数据展示,具体包括指挥调度、人像检索、视频播放...",
            ownership: "徐腾",
            solveTime: "2023-03-20",
            type: "模型",
            evalContent: "实现三维地图多数据展示,具体包括指挥调度、人像检索、视频播放...",
            evalTime: "2023-03-20",
            status: "运行"
        }
    ]

    const [tabeData, setTabeData] = useState<DataType[]>(data)
    const [addopen, setaddopen] = useState(false)

    const STFormItem: React.FC = () => {
        const [code, setCode] = useState(dayjs().format("YYYYMMDDHHmmss"))
        const [proposer, setProposer] = useState("徐腾")
        const [propsalContent, setPropsalContent] = useState("")
        return (
            <>
                <Form.Item label="编号">
                    <Input className={Styles["form-item-input"]} value={code} disabled={true} />
                </Form.Item>
                <Form.Item label="提出人">
                    <Input className={Styles["form-item-input"]} value={proposer} disabled={true} />
                </Form.Item>
                <Form.Item label="内容">
                    <Input.TextArea className={Styles["form-item-input"]} placeholder="请输入内容" value={propsalContent} />
                </Form.Item>
            </>
        )
    }

    const AddForm: React.FC = () => {
        return (
            <>
                <Modal
                    title="请提出你的问题"
                    footer={
                        <>
                            <Popconfirm title icon okText="有好的想法" cancelText="结束" onConfirm={propConfirm} onCancel={() => setaddopen(false)}>
                                <Button type="primary">提交</Button>
                            </Popconfirm>
                        </>
                    }
                    onCancel={() => setaddopen(false)}
                    open={addopen}
                    bodyStyle={{ height: "400px" }}
                >
                    <Form labelCol={{ span: 4 }}>
                        <STFormItem />
                    </Form>
                </Modal>
            </>
        )
    }

    const propConfirm = () => {
        setaddopen(false)
        setSolutionOpen(true)
    }

    const [solutionOpen, setSolutionOpen] = useState(false)
    const [solutionCode, setSolutionCode] = useState(dayjs().format("YYYYMMDDHHmmss"))
    const [solutionContent, setSolutionContent] = useState("")
    const [owner, setOwner] = useState("徐腾")

    const SolutionFormItem: React.FC = () => {
        return (
            <>
                <Form.Item label="编号">
                    <Input className={Styles["form-item-input"]} value={solutionCode} disabled={true} />
                </Form.Item>
                <Form.Item label="解决方案">
                    <Input.TextArea className={Styles["form-item-input"]} placeholder="请输入解决方案" value={solutionContent} />
                </Form.Item>
                <Form.Item label="产权人">
                    <Input className={Styles["form-item-input"]} value={owner} disabled={true} />
                </Form.Item>
            </>
        )
    }

    const SolutionForm: React.FC = () => {
        return (
            <>
                <Modal title="请说出你的方案" open={solutionOpen} onCancel={() => setSolutionOpen(false)} bodyStyle={{ height: "400px" }}>
                    <Form labelCol={{ span: 4 }}>
                        <SolutionFormItem />
                    </Form>
                </Modal>
            </>
        )
    }

    const [evalCode, setEvalCode] = useState(solutionCode)
    const [evalOpen, setEvalOpen] = useState(false)
    const [evalContent, setEvalContent] = useState("")

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

    const EvalFormItem: React.FC = () => {
        return (
            <>
                <Form.Item label="编号">
                    <Input className={Styles["form-item-input"]} value={evalCode} disabled={true} />
                </Form.Item>
                <Form.Item label="评估">
                    <Input.TextArea className={Styles["form-item-input"]} placeholder="请输入评估内容" value={evalContent} />
                </Form.Item>
                <Form.Item label="类型">
                    <Select className={Styles["form-item-input"]} options={evalTypeOpt}></Select>
                </Form.Item>
            </>
        )
    }

    const EvalForm: React.FC = () => {
        return (
            <>
                <Modal title="请评估处置方案" open={evalOpen} onCancel={() => setEvalOpen(false)} bodyStyle={{ height: "400px" }}>
                    <Form labelCol={{ span: 4 }}>
                        <EvalFormItem />
                    </Form>
                </Modal>
            </>
        )
    }

    const [editOpen, setEditOpen] = useState(false)
    const [editCode, setEditCode] = useState("")
    const [editQuestion, setEditQuestion] = useState("")
    const [editProposer, setEditProposer] = useState("")
    const [solution, setSolution] = useState("")
    const [editStatus, setEditStatus] = useState("")
    const EditFormItem: React.FC = () => {
        return (
            <>
                <Form.Item label="编号">
                    <Input className={Styles["form-item-input"]} value={editCode} disabled={true} />
                </Form.Item>
                <Form.Item label="问题">
                    <Input.TextArea className={Styles["form-item-input"]} value={editQuestion} />
                </Form.Item>
                <Form.Item label="提出人">
                    <Input className={Styles["form-item-input"]} value={editProposer} disabled={true} />
                </Form.Item>
                <Form.Item label="解决思路">
                    <Input.TextArea className={Styles["form-item-input"]} value={solution} />
                </Form.Item>
                <Form.Item label="状态">
                    <Select
                        className={Styles["form-item-input"]}
                        value={editStatus}
                        options={[
                            { value: "运行", label: "运行" },
                            { value: "废弃", label: "废弃" }
                        ]}
                    />
                </Form.Item>
            </>
        )
    }

    const EditForm: React.FC = () => {
        return (
            <>
                <Modal title="编辑" open={editOpen} onCancel={() => setEditOpen(false)}>
                    <Form labelCol={{ span: 6 }}>
                        <EditFormItem />
                    </Form>
                </Modal>
            </>
        )
    }

    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(100)
    const changePg = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    return (
        <>
            <AddForm />
            <SolutionForm />
            <EvalForm />
            <EditForm />
            <div className={c("header")}>
                <div className={c("query")}>
                    <div className={c("inputs")}>
                        <Select placeholder="请选择类型" />
                        <RangePicker />
                    </div>
                    <div className={c("query-reset")}>
                        <Button className={c("query-btn")}>查询</Button>
                        <Button className={c("reset-btn")}>重置</Button>
                    </div>
                </div>
                <div className={c("btn-group")}>
                    <Button className={c("add")}>新增</Button>
                </div>
            </div>
            <Table columns={column} dataSource={tabeData} pagination={{ onChange: changePg, total, pageSize }} />
        </>
    )
}

export default StormThinking
