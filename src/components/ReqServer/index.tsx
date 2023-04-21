import { Table, Button, Input, Upload, DatePicker, Modal, Form, Select, Tooltip, Tabs } from "antd"
import { ReactNode, useEffect, useState } from "react"
import type { ColumnsType } from "antd/es/table"
import { FileTextOutlined, UploadOutlined } from "@ant-design/icons"
import { addReqServer, dowloadFile, queryReqServer } from "../../api/reqserver"
import Styles from "./index.module.less"
import { FileInput } from "gskj-components"
import dayjs from "dayjs"
import { useAsync } from "../../utils/hooks"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

const { RangePicker } = DatePicker

const ReqServer: React.FC = () => {
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
                <Form.Item name="askNo" label="编号">
                    <Input className={c("form-item-input")} disabled />
                </Form.Item>
                <Form.Item name="askTime" label="时间">
                    <DatePicker placeholder="请选择时间" className={c("form-item-input")} />
                </Form.Item>
                <Form.Item name="askInfo" label="内容">
                    <Input.TextArea className={c("form-item-input")} />
                </Form.Item>
                <Form.Item name="askUser" label="请求人">
                    <Input className={c("form-item-input")} />
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
                    <Select className={c("form-item-input")} />
                </Form.Item>
                <Form.Item name="replyOrNot" label="是否公开回复">
                    <Select className={c("form-item-input")} defaultValue={isPubReply[0].label} options={isPubReply} value={reqStatus} />
                </Form.Item>
                <Form.Item name="respondent" label="回复人">
                    <Input className={c("form-item-input")} />
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

    const [reqBase64, setReqBase64] = useState<string | undefined | null>("")
    const [reqFileName, setReqFileName] = useState("")
    const [resBase64, setResBase64] = useState<string | undefined | null>("")
    const [resFileName, setresFileName] = useState("")
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(Date.now()))
    const [addOpen, setAddOpen] = useState(false)
    const [form] = Form.useForm()
    const [tableData, setTableData] = useState<QueryReqServer[]>([])
    const [reqStatus, setReqStatus] = useState("是")

    const search = async () => {
        const res = await queryReqServer({
            askNo: "",
            askUser: "",
            endTime: endTime.format("YYYY-MM-DD HH:mm:sss"),
            respondent: "",
            startTime: startTime.format("YYYY-MM-DD HH:mm:sss"),
            pageNum: 1,
            pageSize: 10
        })
        res && setTableData(res.data.voList)
    }

    const downloadReq = (e: string) => {
        dowloadFile({ askId: e, type: 1 })
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
        setAddOpen(true)
        form.setFieldsValue({
            askNo: Date.now()
        })
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
            <Table rowKey={e => e.askTime} columns={column} dataSource={tableData} pagination={{ onChange: changePg, total, pageSize }} />
            <Modal
                title="新增"
                open={addOpen}
                onCancel={() => setAddOpen(false)}
                footer={
                    <>
                        <Button className={c("cancel")} onClick={() => setAddOpen(false)}>
                            取消
                        </Button>
                        <Button className={c("save")} onClick={confirm}>
                            保存
                        </Button>
                    </>
                }
            >
                <Form labelCol={{ span: 6 }} form={form}>
                    <ReqServerFormItem />
                </Form>
            </Modal>
        </>
    )
}

export default ReqServer
