import { Table, Button, Input, DatePicker, Select, Modal, Form } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"
import { getAllNeighbor } from "../../api/smartUnit"
import Styles from "./index.module.less"

const { RangePicker } = DatePicker

interface DataType {
    key?: string
    neibName: string
    infrared: number
    portrait: number
    carCard: number
    ETC: number
    ballMachine: number
    address: number
    residentPpl: number
    migration: number
    keyPpl: number
    keyFocus: number
    jurisdiction: string
    community: string
    cmtyPolice: string
}

const NeighbFormItem: React.FC = () => {
    return (
        <>
            <Form.Item name="name" label="小区名称">
                <Select className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="infrared" label="红外">
                <Input className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="portrait" label="人像">
                <Input className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="carCard" label="车卡">
                <Input className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="etc" label="ETC">
                <Input className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="ballMachine" label="球机">
                <Input className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="address" label="地址">
                <Input className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="residentppl" label="常住人口">
                <Input className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="flowppl" label="流动人口">
                <Input className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="keyppl" label="重点人口">
                <Input className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="jurisdiction" label="辖区">
                <Select className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="community" label="社区">
                <Select className={Styles["form-item-input"]} />
            </Form.Item>
            <Form.Item name="cmtpolice" label="社区民警">
                <Input className={Styles["form-item-input"]} />
            </Form.Item>
        </>
    )
}

const Neighborhood: React.FC = () => {
    const vegaSelect = () => {
        getAllNeighbor({
            jurisdiction: "",
            name: "",
            pageNum: 0,
            pageSize: 0,
            plId: "",
            societyName: "",
            status: ""
        }).then(res => {
            res &&
                setTableData(
                    res.data.list.map(e => {
                        return {
                            neibName: e.name,
                            infrared: e.deviceInfrared,
                            portrait: e.devicePortrait,
                            carCard: e.deviceTag,
                            ETC: e.deviceEtc,
                            ballMachine: e.deviceBall,
                            address: e.addressAmount,
                            residentPpl: e.dailyLivePopulation,
                            migration: e.flowLivePopulation,
                            keyPpl: e.importPopulation,
                            keyFocus: e.focusPopulation,
                            jurisdiction: e.jurisdiction,
                            community: "",
                            cmtyPolice: e.societyPoliceman
                        }
                    })
                )
        })
    }

    useEffect(() => {
        vegaSelect()
    }, [])

    const column: ColumnsType<DataType> = [
        {
            key: "neibName",
            dataIndex: "neibName",
            title: "小区名称",
            align: "center"
        },
        {
            title: "技防设备",
            children: [
                {
                    key: "infrared",
                    dataIndex: "infrared",
                    title: "红外",
                    align: "center"
                },
                {
                    key: "portrait",
                    dataIndex: "portrait",
                    title: "人像",
                    align: "center"
                },
                {
                    key: "carCard",
                    dataIndex: "carCard",
                    title: "车卡",
                    align: "center"
                },
                {
                    key: "ETC",
                    dataIndex: "ETC",
                    title: "ETC",
                    align: "center"
                },
                {
                    key: "ballMachine",
                    dataIndex: "ballMachine",
                    title: "球机",
                    align: "center"
                }
            ]
        },
        {
            title: "一标三实",
            children: [
                {
                    key: "address",
                    dataIndex: "address",
                    title: "地址",
                    align: "center"
                },
                {
                    key: "residentPpl",
                    dataIndex: "residentPpl",
                    title: "常住人口",
                    align: "center"
                },
                {
                    key: "migration",
                    dataIndex: "migration",
                    title: "流动人口",
                    align: "center"
                },
                {
                    key: "keyPpl",
                    dataIndex: "keyPpl",
                    title: "重点人口",
                    align: "center"
                },
                {
                    key: "keyFocus",
                    dataIndex: "keyFocus",
                    title: "重点关注",
                    align: "center"
                }
            ]
        },
        {
            key: "jurisdiction",
            dataIndex: "jurisdiction",
            title: "辖区",
            align: "center"
        },
        {
            key: "community",
            dataIndex: "community",
            title: "社区",
            align: "center"
        },
        {
            key: "cmtyPolice",
            dataIndex: "cmtyPolice",
            title: "社区民警",
            align: "center"
        }
    ]

    const [tableData, setTableData] = useState<DataType[]>([])

    const [addOpen, setaddOpen] = useState(false)

    const AddForm: React.FC = () => {
        return (
            <>
                <Modal title="新增" open={addOpen} onCancel={() => setaddOpen(false)} bodyStyle={{ height: "400px", overflowY: "scroll" }}>
                    <Form labelCol={{ span: 6 }}>
                        <NeighbFormItem />
                    </Form>
                </Modal>
            </>
        )
    }

    const add = () => {
        setaddOpen(true)
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
            <div className={Styles["header"]}>
                <div className={Styles["add"]}>
                    <Button type="primary" onClick={add}>
                        新增
                    </Button>
                </div>
                <div className={Styles["query"]}>
                    <Input placeholder="请输入小区名称" />
                    <Select placeholder="请选择辖区" />
                    <Select placeholder="请选择社区" />
                    <Input placeholder="请输入社区民警" />
                    <RangePicker />
                    <Button type="primary">查询</Button>
                    <Button>重置</Button>
                </div>
            </div>
            <Table columns={column} dataSource={tableData} pagination={{ onChange: changePg, total, pageSize }} />
        </>
    )
}

export default Neighborhood
