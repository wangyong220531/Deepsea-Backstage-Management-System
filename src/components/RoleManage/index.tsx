import { Button, Input, Modal, Popconfirm, Switch, Table } from "antd"
import Styles from "./index.module.less"
import type { ColumnsType } from "antd/es/table"
import { ReactNode, useEffect, useState } from "react"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface TableHead {
    name: string
    createTime: string
    status: Boolean
    operate?: ReactNode
}

interface ModalTableHead {
    account: string
    name: string
    sex: "男" | "女"
    policeNo: string
    phoneNum: string
    unit: string
    role: string
}

const RoleManage: React.FC = () => {
    const columns: ColumnsType<TableHead> = [
        {
            key: "name",
            dataIndex: "name",
            title: "角色名称",
            align: "center"
        },
        {
            key: "createTime",
            dataIndex: "createTime",
            title: "创建时间",
            align: "center"
        },
        {
            key: "status",
            dataIndex: "status",
            title: "状态",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        <Switch defaultChecked checkedChildren="启用" unCheckedChildren="禁用" onChange={onChange} />
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
                        <div className={c("operate")}>
                            <div className={c("item")} onClick={userClick}>
                                用户
                            </div>
                            <div className={c("item")}>授权</div>
                            <div className={c("item")}>编辑</div>
                        </div>
                    </>
                )
            }
        }
    ]

    const modalColumns: ColumnsType<ModalTableHead> = [
        {
            key: "account",
            dataIndex: "account",
            title: "用户账号",
            align: "center"
        },
        {
            key: "name",
            dataIndex: "name",
            title: "用户姓名",
            align: "center"
        },
        {
            key: "sex",
            dataIndex: "sex",
            title: "性别",
            align: "center"
        },
        {
            key: "policeNo",
            dataIndex: "policeNo",
            title: "警号",
            align: "center"
        },
        {
            key: "phoneNum",
            dataIndex: "phoneNum",
            title: "手机号码",
            align: "center"
        },
        {
            key: "unit",
            dataIndex: "unit",
            title: "单位",
            align: "center"
        },
        {
            key: "role",
            dataIndex: "role",
            title: "角色",
            align: "center"
        }
    ]

    const [tableData, setTableData] = useState<TableHead[]>([])

    const query = () => {
        setTableData([
            {
                name: "超级管理员",
                createTime: "2023-04-05 15:05:06",
                status: false
            }
        ])
    }

    useEffect(() => {
        query()
    }, [])

    const userClick = () => {
        setUserShow(true)
    }

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`)
    }

    const [total, setTotal] = useState(100)
    const [pageSize, setPageSize] = useState(10)

    const changePage = () => {}

    const [userShow, setUserShow] = useState(false)

    const [modalTotal, setModalTotal] = useState(100)
    const [modalPagesize, setModalPagesize] = useState(10)

    const User: React.FC = () => {
        return (
            <>
                <Modal
                    title="用户授权"
                    open={userShow}
                    onCancel={() => setUserShow(false)}
                    onOk={() => setUserShow(false)}
                    footer={
                        <>
                            <Button className={c("cancel")}>取消</Button>
                            <Button className={c("save")}>保存</Button>
                        </>
                    }
                    width={800}
                >
                    <div className={c("modal-header")}>
                        <div className={c("inputs")}>
                            <div className={c("query-item")}>
                                <div className={c("title")}>账号：</div>
                                <Input placeholder="请输入账号" />
                            </div>
                            <div className={c("query-item")}>
                                <div className={c("title")}>单位：</div>
                                <Input placeholder="请输入单位" />
                            </div>
                        </div>
                        <div className={c("query-reset")}>
                            <Button className={c("query-btn")}>查询</Button>
                            <Button className={c("reset-btn")}>重置</Button>
                        </div>
                    </div>
                    <Table columns={modalColumns} pagination={{ onChange: changePage, total: modalTotal, pageSize: modalPagesize, size: "small" }} />
                </Modal>
            </>
        )
    }

    return (
        <>
            <div className={c("header")}>
                <div className={c("query")}>
                    <div className={c("inputs")}>
                        <div className={c("query-item")}>
                            <div className={c("label")}>角色名称：</div>
                            <Input placeholder="亲输入角色名称" />
                        </div>
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
            <Table columns={columns} dataSource={tableData} pagination={{ onChange: changePage, total, pageSize }} />
            <User />
        </>
    )
}

export default RoleManage
