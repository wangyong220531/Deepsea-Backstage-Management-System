import { Button, Input, Table, Select, Modal, Form } from "antd"
import type { ColumnsType } from "antd/es/table"
import React, { useState } from "react"
import { AddSchool, SearchCampus } from "../../api/smartSchool"
import Styles from "./index.module.less"
import { useAsync } from "../../utils/hooks"

interface DataType {
    key?: string
    name: string
    type: string
    guards: number
    scrtyChief: string
    cmntyMP: string
    infrared: number
    portrait: number
    carCard: number
    ETC: number
    ballMachine: number
}

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

const School: React.FC = () => {
    const schoolType: OptionType[] = [
        {
            value: "全部",
            label: "全部"
        },
        {
            value: "幼儿园",
            label: "幼儿园"
        },
        {
            value: "小学",
            label: "小学"
        },
        {
            value: "初中",
            label: "初中"
        },
        {
            value: "高中",
            label: "高中"
        }
    ]

    const column: ColumnsType<DataType> = [
        {
            key: "name",
            dataIndex: "name",
            title: "学校名称",
            align: "center"
        },
        {
            key: "type",
            dataIndex: "type",
            title: "类型",
            align: "center"
        },
        {
            key: "guards",
            dataIndex: "guards",
            title: "保安",
            align: "center"
        },
        {
            key: "scrtyChief",
            dataIndex: "scrtyChief",
            title: "安保负责人",
            align: "center"
        },
        {
            key: "cmntyMP",
            dataIndex: "cmntyMP",
            title: "社区民警",
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
        }
    ]

    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [name, setName] = useState("")
    const [type, setType] = useState(schoolType[0].label)
    const [tableData, setTableData] = useState<DataType[]>([])
    const [addOpen, setAddOpen] = useState(false)
    const [form] = Form.useForm()

    const search = async () => {
        const res = await SearchCampus({
            communityPolice: "",
            introduction: "",
            name,
            remark: "",
            type,
            pageNum,
            pageSize
        })
        res &&
            (setTableData(
                res.data.voList.map(e => {
                    return {
                        name: e.name,
                        type: e.type,
                        guards: e.securityNum,
                        scrtyChief: e.securityManageName,
                        cmntyMP: e.communityPolice,
                        infrared: e.deviceInfrared,
                        portrait: e.devicePortrait,
                        carCard: e.deviceTag,
                        ETC: e.deviceEtc,
                        ballMachine: e.deviceBall
                    }
                })
            ),
            setTotal(res.data.size))
    }

    const query = () => {
        setPageNum(1)
        setPageSize(10)
        search()
    }

    const addConfirm = async () => {
        const res = await form.validateFields()
        AddSchool({
            communityPolice: res.communityPolice,
            deviceBall: Number(res.ballMachine),
            deviceEtc: Number(res.etc),
            deviceInfrared: Number(res.infrared),
            devicePortrait: Number(res.portrait),
            deviceTag: Number(res.carCard),
            introduction: "",
            lat: "",
            lnt: "",
            name: res.name,
            remark: "",
            type: res.type
        }).then(() => {
            setAddOpen(false)
            form.resetFields()
        })
    }

    const changePg = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    const nameInput = (e: any) => {
        setName(e.target.value)
    }

    const reset = () => {
        setName("")
        setType("")
    }

    useAsync(() => search(), [pageNum, pageSize])

    const SchoolFormItem: React.FC = () => {
        return (
            <>
                <Form.Item name="name" label="学校名称">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="type" label="类型">
                    <Select className={Styles["form-item-input"]} options={schoolType} />
                </Form.Item>
                <Form.Item name="guardsCount" label="保安">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="securityChef" label="安保负责人">
                    <Input className={Styles["form-item-input"]} />
                </Form.Item>
                <Form.Item name="communityPolice" label="社区民警">
                    <Input className={Styles["form-item-input"]} />
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
            </>
        )
    }

    const addCancel = () => {
        setAddOpen(false)
        form.resetFields()
    }

    return (
        <>
            <div className={c("header")}>
                <div className={c("query")}>
                    <div className={c("inputs")}>
                        <Input placeholder="请输入学校名称" value={name} onChange={nameInput} />
                        <Select placeholder="请选择类型" value={type} options={schoolType} onChange={e => setType(e)} />
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
                    <Button className={c("add")} onClick={() => setAddOpen(true)}>
                        新增
                    </Button>
                </div>
            </div>
            <Table columns={column} dataSource={tableData} pagination={{ onChange: changePg, total, pageSize }} />
            <Modal
                title="新增"
                open={addOpen}
                onCancel={addCancel}
                footer={
                    <>
                        <Button className={c("cancel")} onClick={addCancel}>
                            取消
                        </Button>
                        <Button className={c("save")} onClick={addConfirm}>
                            保存
                        </Button>
                    </>
                }
            >
                <Form labelCol={{ span: 4 }} form={form}>
                    <SchoolFormItem />
                </Form>
            </Modal>
        </>
    )
}

export default School
