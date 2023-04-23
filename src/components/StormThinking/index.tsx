import { Table, Button, Input, DatePicker, Select, Modal, Form, Tooltip, Popconfirm } from "antd"
import type { ColumnsType } from "antd/es/table"
import React, { ReactNode, useState } from "react"
import Styles from "./index.module.less"
import { useAsync } from "../../utils/hooks"
import { addMindEvalution, addMindQuestion, addMindSolution, searchMind, updateMindQuestion } from "../../api/stormMind"
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
                            <div>共{e.planVoList.length}条</div>
                            <Tooltip title="查看详情">
                                <EyeOutlined onClick={() => showAllSolutions(e)} style={{ transform: "translateY(0%)" }} />
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
        // {
        //     key: "evalContent",
        //     dataIndex: "evalContent",
        //     title: "评估内容",
        //     align: "center",
        //     width: 200,
        //     onCell: () => {
        //         return {
        //             style: {
        //                 maxWidth: 200,
        //                 overflow: "hidden",
        //                 whiteSpace: "nowrap",
        //                 textOverflow: "ellipsis",
        //                 cursor: "pointer"
        //             }
        //         }
        //     },
        //     render: (_, e) => {
        //         return (
        //             <>
        //                 {/* <Tooltip title={e.evalContent}>
        //                     <div>{e.evalContent}</div>
        //                 </Tooltip> */}
        //                 <Tooltip title="查看全部">
        //                     <EyeOutlined onClick={() => showAllEvaluations(e)} />
        //                 </Tooltip>
        //             </>
        //         )
        //     }
        // },
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
                            {/* <Button type="primary" className={c("operate-btn")} onClick={() => evaluate(e)}>
                                评估
                            </Button> */}
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
                <div className={c("solution-eval-container")}>
                    {solutionList.map((e, index) => {
                        return (
                            <div key={e.id}>
                                <Form.Item label={`解决思路${index + 1}`} name={`sloutions${index}`}>
                                    <Input.TextArea className={c("form-item-input-textarea")} disabled />
                                </Form.Item>
                                {e.evaluateVo ? (
                                    <Form.Item label={`评估${index + 1}`} name={`evaluation${index}`}>
                                        <Input.TextArea className={c("form-item-input-textarea")} disabled />
                                    </Form.Item>
                                ) : (
                                    <>
                                        {evalIdList.includes(e.id) ? (
                                            <div>
                                                <Form.Item label={`评估${index + 1}`} name={`evaluation${index}`}>
                                                    <Input.TextArea className={c("form-item-input-textarea")} placeholder="请输入您的评估"></Input.TextArea>
                                                </Form.Item>
                                                <Button className={c("del-evaluate-btn")} onClick={() => delMindEvaluation(e)}>
                                                    删除评估+
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button className={c("add-evaluate-btn")} onClick={() => evaluate(e)}>
                                                添加评估+
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
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
                    <Input.TextArea className={c("form-item-input-textarea")} placeholder="请输入您的解决方案" />
                </Form.Item>
                {/* <Form.Item label="产权人" name="owner">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item> */}
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
                {/* <Form.Item label="状态" name="status">
                    <Select
                        className={c("form-item-input")}
                        options={[
                            { value: "运行", label: "运行" },
                            { value: "废弃", label: "废弃" }
                        ]}
                    />
                </Form.Item> */}
            </>
        )
    }

    const data: DataType[] = [
        {
            id: "0",
            queNo: "00",
            content: "我是问题1",
            createTime: "2023-02-03",
            createOperator: "蔡徐腾",
            planVoList: [
                {
                    id: "0",
                    queId: "123",
                    planNo: "456",
                    solutions: "我是方案1",
                    status: "运行",
                    wisdomUnit: "xxx",
                    policeKind: "xxx",
                    createTime: "2023-03-06",
                    createOperator: "卜元浩",
                    evaluateVo: {
                        id: "0",
                        planId: "123",
                        planNo: "456",
                        content: "我是评估1",
                        type: "技战法",
                        createTime: "2023-04-05",
                        createOperator: "朱晓欢"
                    }
                },
                {
                    id: "1",
                    queId: "123",
                    planNo: "456",
                    solutions: "我是方案2",
                    status: "运行",
                    wisdomUnit: "xxx",
                    policeKind: "xxx",
                    createTime: "2023-03-06",
                    createOperator: "卜元浩",
                    evaluateVo: null
                },
                {
                    id: "2",
                    queId: "123",
                    planNo: "456",
                    solutions: "我是方案3",
                    status: "运行",
                    wisdomUnit: "xxx",
                    policeKind: "xxx",
                    createTime: "2023-03-06",
                    createOperator: "卜元浩",
                    evaluateVo: null
                }
            ]
        }
    ]

    const [tableData, setTableData] = useState<DataType[]>([])
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(Date.now()))
    const [title, setTitle] = useState<"解决思路" | "请提出你的问题" | "请说出你的方案" | "编辑">("请提出你的问题")
    const [modalOpen, setModalOpen] = useState(false)
    const [form] = Form.useForm()
    const sessionStore = useSession()
    const [solutionList, setSolutionList] = useState<Plan[]>([])
    const [selectItem, setSelectItem] = useState<DataType>(Object)
    const [evalIdList, setEvalIdList] = useState<string[]>([])

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
        setTableData(data)
    }

    const showAllSolutions = (e: DataType) => {
        setTitle("解决思路")
        setSolutionList(e.planVoList)
        console.log(solutionList.map(x => {
            return 
        }));
        
        form.setFieldsValue({
           
        })
        setModalOpen(true)
    }

    const solute = (e: DataType) => {
        setSelectItem(e)
        setTitle("请说出你的方案")
        setModalOpen(true)
        // form.setFieldsValue({ owner: e.ownership })
    }

    const evaluate = (e: Plan) => {
        // setTitle("评估")
        setEvalIdList([...evalIdList, ...e.id])
        setModalOpen(true)
        // form.setFieldsValue({ type: e.type })
    }

    const delMindEvaluation = (e: Plan) => {
        setEvalIdList(evalIdList.filter(x => x !== e.id))
    }

    const edit = (e: DataType) => {
        setSelectItem(e)
        setTitle("编辑")
        setModalOpen(true)
        form.setFieldsValue({ question: e.content, proper: e.createOperator })
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
        if (title == "解决思路") {
            setEvalIdList([])
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
        if (title === "请说出你的方案") {
            addMindSolution({
                doneMan: "",
                planNo: "",
                policeKind: "",
                queId: selectItem.id,
                solutions: res.solution,
                status: "",
                wisdomUnit: ""
            }).then(() => {
                form.resetFields()
            })
            return
        }
        if (title == "解决思路") {
            console.log(res)
            return
        }
        if (title === "编辑") {
            updateMindQuestion({
                id: "",
                content: "",
                putMan: "",
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
            <Table rowKey={e => e.id} columns={column} dataSource={tableData} pagination={{ onChange: changePg, total, pageSize }} />
            <Modal
                title={title}
                width={630}
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
                                提交
                            </Button>
                        </>
                    )
                }
            >
                <Form labelCol={{ span: 6 }} form={form}>
                    {title == "解决思路" && <Solutions />}
                    {title === "请提出你的问题" && <STFormItem />}
                    {title === "请说出你的方案" && <SolutionFormItem />}
                    {/* {title === "评估" && <EvalFormItem />} */}
                    {title === "编辑" && <EditFormItem />}
                </Form>
            </Modal>
        </>
    )
}

export default StormThinking
