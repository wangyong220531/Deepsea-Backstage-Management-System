import { Button, Input, DatePicker, Table, Select, Modal, Form } from "antd"
import { ReactNode, useState } from "react"
import type { ColumnsType } from "antd/es/table"
import Styles from "./index.module.less"
import dayjs from "dayjs"
import { searchSmartApp } from "../../api/smartApp"
import { useAsync } from "../../utils/hooks"

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

    const ApplicationFormItem: React.FC = () => {
        return (
            <>
                <Form.Item name="code" label="编码">
                    <Input className={Styles["form-item-input"]} disabled />
                </Form.Item>
                <Form.Item label="（模型/技战）法编号">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="type" label="类型">
                    {/* <Select className={Styles["form-item-input"]} options={typeOptions} /> */}
                </Form.Item>
                <Form.Item label="指向对象">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item label="智慧单元">{/* <Select className={Styles["form-item-input"]} options={smartAppList} /> */}</Form.Item>
                <Form.Item label="警种">{/* <Select className={Styles["form-item-input"]} /> */}</Form.Item>
                <Form.Item label="辖区">
                    <Select className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="content" label="内容">
                    <Input.TextArea className={Styles["form-item-input"]} />
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
            render: () => {
                return (
                    <>
                        <div className={Styles["operate"]}>
                            <Button className={c("operate-btn")} type="primary">
                                过滤
                            </Button>
                            <Button className={c("operate-btn")} type="primary">
                                签收
                            </Button>
                            <Button className={c("operate-btn")} type="primary">
                                反馈
                            </Button>
                            <Button className={c("operate-btn")} type="primary">
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
            value: "6",
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

    const [addOpen, setAddOpen] = useState(false)
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(Date.now() - 2592000000))
    const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(Date.now()))
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [appTypeSelect, setAppTypeSelect] = useState<string | undefined>(smartAppList[0].label)
    const [policeTypeSelect, setPoliceTypeSelect] = useState<string | undefined>(policeTypeList[0].label)
    // const sessionStore = useSession()

    const search = async () => {
        const res = await searchSmartApp({
            startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
            endTime: endTime.format("YYYY-MM-DD HH:mm:ss"),
            pageNum,
            pageSize,
            appType: Number(smartAppList.find(x => x.label === appTypeSelect)?.value),
            policeType: Number(policeTypeList.find(x => x.label === policeTypeSelect)?.value)
        })
        if (res) {
        }
    }

    useAsync(() => search(), [pageNum, pageSize])

    const reset = () => {
        setStartTime(dayjs(Date.now() - 2592000000))
        setEndTime(dayjs(Date.now()))
        setAppTypeSelect("全部")
        setPoliceTypeSelect("全部")
    }

    const dateRangeChange = (e: any) => {
        setStartTime(dayjs(e[0]))
        setEndTime(dayjs(e[1]))
    }

    // const [addForm] = ad

    const add = () => {

    }

    return (
        <>
            <div className={c("header")}>
                <div className={Styles["query"]}>
                    <div className={c("inputs")}>
                        <RangePicker value={[startTime, endTime]} showTime onChange={dateRangeChange} />
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
            <Table columns={column} dataSource={tableData} />
            <Modal title="新增" open={addOpen} onCancel={() => setAddOpen(false)}>
                <Form labelCol={{ span: 8 }} >
                    <ApplicationFormItem />
                </Form>
            </Modal>
        </>
    )
}

export default Application
