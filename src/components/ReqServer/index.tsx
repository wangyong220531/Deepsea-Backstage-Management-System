import { Table, Button, Input, Upload, DatePicker, Modal, Form, Select, Tooltip } from "antd"
import { ReactNode, useEffect, useState } from "react"
import type { ColumnsType } from "antd/es/table"
import { FileTextOutlined, UploadOutlined } from "@ant-design/icons"
import { addReqServer, dowloadFile, queryReqServer } from "../../api/reqserver"
import Styles from "./index.module.less"
import { FileInput } from "gskj-components"
import dayjs from "dayjs"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

const { RangePicker } = DatePicker

interface DataType {
    askFile: string
    askFileName: string
    askInfo: string
    askNo: string
    askTime: string
    askUser: string
    remark: string
    replyFile: string
    replyFileName: string
    replyOrNot: 0 | 1
    respondent: string
    status: string
    resAnnex?: ReactNode
    operate?: ReactNode
}

const ReqServer: React.FC = () => {
    const vegaSelect = () => {
        queryReqServer({
            askNo: "",
            askUser: "",
            endTime: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:sss"),
            respondent: "",
            startTime: dayjs(Date.now() - 60 * 60 * 24 * 30 * 1000).format("YYYY-MM-DD HH:mm:sss"),
            pageNum: 1,
            pageSize: 10
        }).then(res => {
            res && setTableData(res.data.voList)
        })
    }
    useEffect(() => {
        vegaSelect()
    }, [])

    const [reqBase64, setReqBase64] = useState<string | undefined | null>("")
    const [reqFileName, setReqFileName] = useState("")
    const [resBase64, setResBase64] = useState<string | undefined | null>("")
    const [resFileName, setresFileName] = useState("")

    const [reqStatus, setReqStatus] = useState("是")

    const isPubReply: OptionType[] = [
        {
            value: "是",
            label: "是"
        },
        {
            value: "否",
            label: "否"
        }
    ]

    const ReqServerFormItem: React.FC = () => {
        return (
            <>
                <Form.Item name="askNo" label="编码">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="askTime" label="时间">
                    <DatePicker placeholder="请选择时间" className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="askInfo" label="内容">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="askUser" label="请求人">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item label="请求附件">
                    {reqBase64 ? (
                        <div className={c("upload-success")}>上传成功</div>
                    ) : (
                        <FileInput className={c("file-input")} type="base64" onFile={file => setReqFileName(file.name)} onData={setReqBase64} accept=".jpg,.jpeg,.png">
                            <UploadOutlined />
                            上传
                        </FileInput>
                    )}
                </Form.Item>
                <Form.Item name="status" label="状态">
                    <Select className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="replyOrNot" label="是否公开回复">
                    <Select className={Styles["form-item-input"]} options={isPubReply} value={reqStatus} />
                </Form.Item>
                <Form.Item name="respondent" label="回复人">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
            </>
        )
    }

    const column: ColumnsType<QueryReqServer> = [
        {
            key: "askNo",
            dataIndex: "askNo",
            title: "编码",
            align: "center"
        },
        {
            key: "askTime",
            dataIndex: "askTime",
            title: "时间",
            align: "center"
        },
        {
            key: "askInfo",
            dataIndex: "askInfo",
            title: "内容",
            align: "center",
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
                        <Tooltip title={e.askInfo}>
                            <div>{e.askInfo}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            key: "askUser",
            dataIndex: "askUser",
            title: "请求人",
            align: "center"
        },
        {
            key: "reqAnnex",
            dataIndex: "reqAnnex",
            title: "请求附件",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        <div className={c("download-file")}>
                            <FileTextOutlined onClick={() => downloadReq(e.id)} />
                        </div>
                    </>
                )
            }
        },
        {
            key: "status",
            dataIndex: "status",
            title: "状态",
            align: "center"
        },
        {
            key: "replyOrNot",
            dataIndex: "replyOrNot",
            title: "是否公开回复",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        <div>{e.replyOrNot === 1 ? "是" : "否"}</div>
                    </>
                )
            }
        },
        {
            key: "respondent",
            dataIndex: "respondent",
            title: "回复人",
            align: "center"
        },
        {
            key: "resAnnex",
            dataIndex: "resAnnex",
            title: "回复附件",
            align: "center",
            render: () => {
                return (
                    <>
                        <div className={c("download-file")}>
                            <FileTextOutlined />
                        </div>
                    </>
                )
            }
        }
    ]

    const downloadReq = (e: string) => {
        dowloadFile({ askId: e, type: 1 })
    }
    const [addOpen, setAddOpen] = useState(false)

    const [form] = Form.useForm()

    const AddForm: React.FC = () => {
        return (
            <>
                <Modal title="新增" open={addOpen} onCancel={() => setAddOpen(false)} onOk={confirm}>
                    <Form labelCol={{ span: 6 }} form={form}>
                        <ReqServerFormItem />
                    </Form>
                </Modal>
            </>
        )
    }

    const confirm = async () => {
        const res = await form.validateFields()
        addReqServer({
            askInfo: res.askInfo,
            askNo: res.askNo,
            askTime: dayjs(res.askTime).format("YYYY-MM-DD"),
            askUser: res.askUser,
            remark: "",
            replyOrNot: res.replyOrNot === "是" ? 1 : 0,
            respondent: res.respondent,
            status: res.status,
            base64File: reqBase64,
            base64FileName: reqFileName
        }).then(res => {})
    }

    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(100)
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null)
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null)

    const changePg = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    const [tableData, setTableData] = useState<QueryReqServer[]>([])

    return (
        <>
            <AddForm />
            <div className={Styles["header"]}>
                <div className={Styles["add"]}>
                    <Button type="primary" onClick={() => setAddOpen(true)}>
                        新增
                    </Button>
                </div>
                <div className={Styles["query"]}>
                    {/* <Input placeholder="请输入编码" />
                    <Input placeholder="请输入请求人" />
                    <Input placeholder="请输入回复人" /> */}
                    <RangePicker />
                    <Button type="primary">查询</Button>
                    <Button>重置</Button>
                </div>
            </div>
            <Table rowKey={e => e.askTime} columns={column} dataSource={tableData} pagination={{ onChange: changePg, total, pageSize }} />
        </>
    )
}

export default ReqServer
