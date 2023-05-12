import { Table, Button, Input, DatePicker, Select, Modal, Form, Tooltip, Popconfirm } from "antd"
import type { ColumnsType } from "antd/es/table"
import React, { ReactNode, useState } from "react"
import Styles from "./index.module.less"
import { useAsync } from "../../utils/hooks"
import { addMindEvalution, addMindQuestion, addMindSolution, searchMind, updateMindQuestion } from "../../api/stormMind"
import { useSession } from "../../store"
import dayjs from "dayjs"
import { EyeOutlined } from "@ant-design/icons"
import { handleEvalObj } from "../../utils/handleObj"
import { smartAppList, policeTypeList } from "../Application"

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
                <Form.Item label="提出人" name="proper">
                    <Input className={c("form-item-input")} disabled={true} />
                </Form.Item>
                <Form.Item label="问题" name="question">
                    <Input.TextArea className={c("form-item-input-textarea")} placeholder="请输入内容" />
                </Form.Item>
            </>
        )
    }

    const SolutionFormItem: React.FC = () => {
        return (
            <>
                <Form.Item label="解决方案" name="solution">
                    <Input.TextArea className={c("form-item-input-textarea")} placeholder="请输入您的解决方案" />
                </Form.Item>
                <Form.Item label="警种" name="policeKind">
                    <Select className={c("form-item-input")} options={policeTypeList.filter(e => e.value !== "全部")}></Select>
                </Form.Item>
                <Form.Item label="智慧单元" name="wisdomUnit">
                    <Select className={c("form-item-input")} options={smartAppList.filter(e => e.value !== "全部")}></Select>
                </Form.Item>
            </>
        )
    }

    const EditFormItem: React.FC = () => {
        return (
            <>
                <Form.Item label="问题" name="question">
                    <Input.TextArea className={c("form-item-input-textarea")} />
                </Form.Item>
                <Form.Item label="提出人" name="proper">
                    <Input className={c("form-item-input")} disabled={true} />
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
    const [title, setTitle] = useState<"解决思路" | "请提出你的问题" | "请说出你的方案" | "编辑">("请提出你的问题")
    const [modalOpen, setModalOpen] = useState(false)
    const [form] = Form.useForm()
    const sessionStore = useSession()
    const [solutionList, setSolutionList] = useState<Plan[]>([])
    const [selectItem, setSelectItem] = useState<DataType>(Object)
    const [evalIdList, setEvalIdList] = useState<string[]>([])
    const [isSolution, setIsSolution] = useState(false)

    const search = async () => {
        const res = await searchMind({
            content: "",
            pageNum,
            pageSize,
            policeKind: "",
            putMan: "",
            queNo: "",
            wisdomUnit: "",
            startTime: startTime.format("YYYY-MM-DD"),
            endTime: endTime.format("YYYY-MM-DD")
        })
        res && (setTableData(res.data.voList), setTotal(res.data.size))
    }

    const query = () => {
        setPageNum(1)
        setPageSize(10)
        search()
    }

    const showAllSolutions = (e: DataType) => {
        setTitle("解决思路")
        setIsSolution(true)
        setSolutionList(e.planVoList)
        setModalOpen(true)
    }

    const solute = (e: DataType) => {
        setSelectItem(e)
        setTitle("请说出你的方案")
        setModalOpen(true)
    }

    const evaluate = (e: Plan) => {
        setEvalIdList(Array.from(new Set([...evalIdList, e.id])))
    }

    const delMindEvaluation = (e: Plan, index: number) => {
        setEvalIdList(evalIdList.filter(x => x !== e.id))
        form.setFieldsValue({
            ["bmType" + index]: "",
            ["evaluation" + index]: ""
        })
    }

    const edit = (e: DataType) => {
        setSelectItem(e)
        setTitle("编辑")
        setModalOpen(true)
        form.setFieldsValue({ question: e.content, proper: e.createOperator })
    }

    const propConfirm = async () => {
        const res = await form.validateFields()
        addMindQuestion({
            content: res.question,
            putMan: sessionStore.userNo,
            queNo: ""
        }).then(() => {
            search()
            form.resetFields()
        })
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

    const topRightCancel = () => {
        setModalOpen(false)
        form.resetFields()
    }

    const cancel = () => {
        setEvalIdList([])
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
                search()
                form.resetFields()
            })
            return
        }
        if (title === "请说出你的方案") {
            addMindSolution({
                doneMan: "",
                planNo: "",
                policeKind: res.policeKind,
                queId: selectItem.id,
                solutions: res.solution,
                status: "",
                wisdomUnit: res.wisdomUnit
            }).then(() => {
                form.resetFields()
                search()
            })
            return
        }
        if (title == "解决思路") {
            setEvalIdList([])
            setIsSolution(false)
            addMindEvalution({
                vos: handleEvalObj(res).map(e => {
                    return {
                        planId: solutionList[e.index].id,
                        content: e.content,
                        type: e.type
                    }
                })
            }).then(() => {
                search()
            })
            return
        }
        if (title === "编辑") {
            updateMindQuestion({
                id: selectItem.id,
                content: res.question,
                putMan: res.proper,
                queNo: selectItem.queNo
            }).then(() => {
                form.resetFields()
                search()
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
                        <Button className={c("query-btn")} onClick={query}>
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
                width={isSolution ? 700 : 630}
                open={modalOpen}
                onOk={save}
                onCancel={topRightCancel}
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
                <Form labelCol={{ span: isSolution ? 8 : 6 }} form={form}>
                    {title == "解决思路" && (
                        <div className={c("solution-eval-container")}>
                            {solutionList.map((e, index) => {
                                return (
                                    <div key={e.id}>
                                        <Form.Item label={"解决思路" + e.planNo} name={`sloutions${index}`} initialValue={e.solutions}>
                                            <Input.TextArea className={c("form-item-input-textarea")} disabled />
                                        </Form.Item>
                                        {e.evaluateVo ? (
                                            <Form.Item label={`评估${index + 1}`} name={`evaluation${index}`} initialValue={e.evaluateVo.content}>
                                                <Input.TextArea className={c("form-item-input-textarea")} disabled />
                                            </Form.Item>
                                        ) : (
                                            <>
                                                {evalIdList.includes(e.id) ? (
                                                    <div>
                                                        <Form.Item label={`评估${index + 1}`} name={`evaluation${index}`}>
                                                            <Input.TextArea className={c("form-item-input-textarea")} placeholder="请输入您的评估"></Input.TextArea>
                                                        </Form.Item>
                                                        <Form.Item label={`类型${index + 1}`} name={`bmType${index}`}>
                                                            <Select className={c("form-item-input")} options={evalTypeOpt}></Select>
                                                        </Form.Item>
                                                        <Button className={c("del-evaluate-btn")} onClick={() => delMindEvaluation(e, index)}>
                                                            取消
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
                    )}
                    {title === "请提出你的问题" && <STFormItem />}
                    {title === "请说出你的方案" && <SolutionFormItem />}
                    {title === "编辑" && <EditFormItem />}
                </Form>
            </Modal>
        </>
    )
}

export default StormThinking
