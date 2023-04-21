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
    smartUnit: string
    policeType: string
    ownership: string
    solveTime: string
    type: string
    evalContent: string
    evalTime: string
    status: string
    operate?: ReactNode
}





const EditFormItem: React.FC = () => {
    return (
        <>
            <Form.Item label="编号" name="code">
                <Input className={c("form-item-input")} disabled={true} />
            </Form.Item>
            <Form.Item label="问题" name="question">
                <Input.TextArea className={c("form-item-input")} />
            </Form.Item>
            <Form.Item label="提出人" name="proper">
                <Input className={c("form-item-input")} disabled={true} />
            </Form.Item>
            <Form.Item label="解决思路" name="solution">
                <Input.TextArea className={c("form-item-input")} />
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
                            <Button type="primary" className={c("operate-btn")} onClick={() => setSolutionOpen(true)}>
                                方案
                            </Button>
                            <Button type="primary" className={c("operate-btn")} onClick={() => evalSolution(e)}>
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

    const data: DataType[] = [
        {
            key: "0",
            code: "123",
            question: "实现三维地图多数据展示,具体包括指挥调度、人像检索、视频播放...",
            proposer: "卜元浩",
            qptime: "2023-03-20",
            solution: "实现三维地图多数据展示,具体包括指挥调度、人像检索、视频播放...",
            smartUnit: "北京路派出所",
            policeType: "治安",
            ownership: "徐腾",
            solveTime: "2023-03-20",
            type: "模型",
            evalContent: "实现三维地图多数据展示,具体包括指挥调度、人像检索、视频播放...",
            evalTime: "2023-03-20",
            status: "运行"
        }
    ]

    const [tabeData, setTabeData] = useState<DataType[]>([])
    const [addopen, setaddopen] = useState(false)
    const [solutionOpen, setSolutionOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    const edit = (e: DataType) => {
        setEditOpen(true)
    }

    const evalSolution = (e: DataType) => {}

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

   
    const changePg = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    const STFormItem: React.FC = () => {
        return (
            <>
                <Form.Item label="编号" name="code">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item>
                <Form.Item label="提出人" name="proper">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item>
                <Form.Item label="问题" name="question">
                    <Input.TextArea className={c("form-item-input")} placeholder="请输入内容" />
                </Form.Item>
            </>
        )
    }
    
    const SolutionFormItem: React.FC = () => {
        return (
            <>
                <Form.Item label="编号" name="code">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item>
                <Form.Item label="解决方案" name="solution">
                    <Input.TextArea className={c("form-item-input")} placeholder="请输入解决方案" />
                </Form.Item>
                <Form.Item label="产权人" name="owner">
                    <Input className={c("form-item-input")} disabled={true} />
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
    
    const EvalFormItem: React.FC = () => {
        return (
            <>
                <Form.Item label="编号" name="code">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item>
                <Form.Item label="评估" name="evaluation">
                    <Input.TextArea className={c("form-item-input")} placeholder="请输入评估内容" />
                </Form.Item>
                <Form.Item label="类型" name="type">
                    <Select className={c("form-item-input")} options={evalTypeOpt}></Select>
                </Form.Item>
            </>
        )
    }

    return (
        <>
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
                    <Button className={c("add")} onClick={() => setaddopen(true)}>
                        新增
                    </Button>
                </div>
            </div>
            <Table columns={column} dataSource={tabeData} pagination={{ onChange: changePg, total, pageSize }} />
            <Modal open={modalOpen}></Modal>
        </>
    )
}

export default StormThinking
