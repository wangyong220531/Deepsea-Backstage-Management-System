import { Button, Input, DatePicker, Table, Select, Modal, Form, Tooltip } from "antd"
import { ReactNode, useState } from "react"
import type { ColumnsType } from "antd/es/table"
import Styles from "./index.module.less"

const { RangePicker } = DatePicker

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface DataType {
    key: string
    type: string
    code: string
    time: string
    content: string
    pointObj: string
    smartUnit: string
    policeType: string
    jurisdiction: string
    status: string
    morbCode: string
    operate?: ReactNode
}

interface SmartApp {
    code: string
    name: string
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
    const ApplicationFormItem: React.FC = () => {
        return (
            <>
                <Form.Item name="type" label="类型">
                    <Select className={Styles["form-item-input"]} options={typeOptions} />
                </Form.Item>
                <Form.Item name="code" label="编码">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="time" label="时间">
                    <DatePicker placeholder="请选择时间" className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="content" label="内容">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item label="指向对象">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item label="智慧单元">
                    <Select className={Styles["form-item-input"]} options={smartAppList} />
                </Form.Item>
                <Form.Item label="警种">
                    <Select className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item label="辖区">
                    <Select className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item label="状态">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item label="（模型/技战）法编号">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
            </>
        )
    }

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
            render: (_, e) => {
                return (
                    <>
                        <Tooltip>
                            <span></span>
                        </Tooltip>
                    </>
                )
            }
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
            render: () => {
                return (
                    <>
                        <div className={Styles["operate"]}>
                            <Button type="primary">过滤</Button>
                            <Button type="primary">签收</Button>
                            <Button type="primary">反馈</Button>
                            <Button type="primary">评估</Button>
                        </div>
                    </>
                )
            }
        }
    ]

    const show = (e: any) => {
        setContentShow(true)
        setContent(e.content)
    }

    const tableData: DataType[] = [
        {
            key: "0",
            type: "模型",
            code: "123",
            time: "2023-03-11",
            content: "xxx",
            pointObj: "卜元浩",
            smartUnit: "智慧安防小区",
            policeType: "治安",
            jurisdiction: "开发区",
            status: "待过滤",
            morbCode: "xxx"
        }
    ]

    const mbOption: OptionType[] = [
        {
            value: "模型",
            label: "模型"
        },
        {
            value: "技战法",
            label: "技战法"
        }
    ]

    const [addOpen, setAddOpen] = useState(false)

    const AddForm: React.FC = () => {
        return (
            <>
                <Modal title="新增" open={addOpen} onCancel={() => setAddOpen(false)}>
                    <Form labelCol={{ span: 8 }}>
                        <ApplicationFormItem />
                    </Form>
                </Modal>
            </>
        )
    }

    const [contentShow, setContentShow] = useState(false)
    const [content, setContent] = useState("")

    const ContentShow: React.FC = () => {
        return (
            <>
                <Modal title="内容" open={contentShow} onCancel={() => setContentShow(false)}>
                    {content}
                </Modal>
            </>
        )
    }
    return (
        <>
            <AddForm />
            <div className={c("header")}>
                <div className={Styles["query"]}>
                    <div className={c("inputs")}>
                        <RangePicker />
                    </div>
                    <div className={c("query-reset")}>
                        <Button>查询</Button>
                        <Button>重置</Button>
                    </div>
                </div>
                <div className={c("btn-group")}>
                    <Button className={c("add")} onClick={() => setAddOpen(true)}>
                        新增
                    </Button>
                </div>
            </div>
            <Table columns={column} dataSource={tableData} />
            <ContentShow />
        </>
    )
}

export default Application
