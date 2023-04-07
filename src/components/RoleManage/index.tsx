import { Button, Input, Modal, Switch, Table, Drawer, Tree, Form } from "antd"
import Styles from "./index.module.less"
import type { ColumnsType } from "antd/es/table"
import { ReactNode, useEffect, useState } from "react"
import type { DataNode } from "antd/es/tree"
import { CloseOutlined } from "@ant-design/icons"
import { addRole, getAllRoles } from "../../api/roleManage"
import { getPermissionTree } from "../../api/permisssion"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface TableHead extends Role {
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
            key: "roleName",
            dataIndex: "roleName",
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
                        <Switch defaultChecked={e.status === 0 ? false : true} checkedChildren="启用" unCheckedChildren="禁用" onChange={onChange} />
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
                            <div className={c("item")} onClick={authorize}>
                                授权
                            </div>
                            <div className={c("item")} onClick={() => edit(e)}>
                                编辑
                            </div>
                        </div>
                    </>
                )
            }
        }
    ]

    const search = () => {
        getAllRoles({}).then(res => {
            res &&
                setTableData(
                    res.rows.map(e => {
                        return {
                            id: e.id,
                            roleName: e.roleName,
                            createTime: e.createTime,
                            status: e.status
                        }
                    })
                )
        })
    }

    useEffect(() => {
        search()
        getPermissionTree({ parentId: "123" })
    }, [])

    const userClick = () => {
        setModalWidth(800)
        setmodalContent("用户授权")
        setUserShow(true)
    }

    const authorize = () => {
        setModalWidth(800)
        setDrawShow(true)
    }

    const edit = (e: TableHead) => {
        setmodalContent("角色编辑")
        setUserShow(true)
    }

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

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`)
    }

    const [total, setTotal] = useState(100)
    const [pageSize, setPageSize] = useState(10)

    const changePage = () => {}

    const [userShow, setUserShow] = useState(false)

    const [modalTotal, setModalTotal] = useState(100)
    const [modalPagesize, setModalPagesize] = useState(10)

    const [modalContent, setmodalContent] = useState<"新增" | "用户授权" | "角色编辑">("用户授权")

    const [modalWidth, setModalWidth] = useState(600)

    const User: React.FC = () => {
        return (
            <>
                <Modal
                    title={modalContent}
                    open={userShow}
                    onCancel={() => setUserShow(false)}
                    onOk={() => setUserShow(false)}
                    footer={
                        <>
                            <Button className={c("cancel")} onClick={() => setUserShow(false)}>
                                取消
                            </Button>
                            <Button className={c("save")} onClick={() => setUserShow(false)}>
                                保存
                            </Button>
                        </>
                    }
                    width={modalWidth}
                >
                    {modalContent === "新增" && (
                        <>
                            <div className={c("add-role-box")}>
                                <div className={c("title")}>角色名称：</div>
                                <Input placeholder="请输入角色名称" onChange={roleNameInput} />
                            </div>
                        </>
                    )}
                    {modalContent === "用户授权" && (
                        <>
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
                        </>
                    )}
                    {modalContent === "角色编辑" && (
                        <>
                            <div className={c("roleName-edit")}>
                                <div className={c("label")}>角色名称：</div>
                                <Input placeholder="请输入角色名称" />
                            </div>
                        </>
                    )}
                </Modal>
            </>
        )
    }
    const [addRoleName, setAddRoleName] = useState("")

    const [drawShow, setDrawShow] = useState(false)

    const treeData: DataNode[] = [
        {
            title: "首页",
            key: "0"
        },
        {
            title: "指挥",
            key: "1",
            children: [
                {
                    title: "警情处置",
                    key: "1-0",
                    children: [
                        {
                            title: "跟进处置",
                            key: "1-0-0"
                        },
                        {
                            title: "警情处置",
                            key: "1-0-1"
                        },
                        {
                            title: "派警分析",
                            key: "1-0-2"
                        }
                    ]
                },
                {
                    title: "铁拳勤务",
                    key: "1-1",
                    children: [
                        {
                            title: "勤务管理",
                            key: "1-1-0",
                            children: [
                                {
                                    title: "新增",
                                    key: "1-1-0-0"
                                }
                            ]
                        },
                        {
                            title: "勤务分析",
                            key: "1-1-1"
                        }
                    ]
                }
            ]
        },
        {
            title: "请求服务",
            key: "2",
            children: [
                {
                    title: "新增",
                    key: "2-0"
                }
            ]
        },
        {
            title: "智慧+",
            key: "3"
        },
        {
            title: "智慧单元",
            key: "4",
            children: [
                {
                    title: "智慧应用",
                    key: "4-0",
                    children: [
                        {
                            title: "新增",
                            key: "4-0-0"
                        }
                    ]
                },
                {
                    title: "智慧安防小区",
                    key: "4-1",
                    children: [
                        {
                            title: "新增",
                            key: "4-1-0"
                        }
                    ]
                },
                {
                    title: "智慧安防校园",
                    key: "4-2"
                }
            ]
        },
        {
            title: "风暴思维",
            key: "5",
            children: [
                {
                    title: "新增",
                    key: "5-0"
                }
            ]
        },
        {
            title: "系统管理",
            key: "6",
            children: [
                {
                    title: "用户管理",
                    key: "6-0",
                    children: [
                        {
                            title: "新增",
                            key: "6-0-0"
                        },
                        {
                            title: "下载模板",
                            key: "6-0-1"
                        },
                        {
                            title: "导入",
                            key: "6-0-2"
                        },
                        {
                            title: "导出",
                            key: "6-0-3"
                        }
                    ]
                },
                {
                    title: "角色管理",
                    key: "6-1",
                    children: [
                        {
                            title: "新增",
                            key: "6-1-0"
                        }
                    ]
                },
                {
                    title: "日志管理",
                    key: "6-2"
                }
            ]
        }
    ]

    const roleNameInput = (e: any) => {
        setAddRoleName(e.target.value)
    }

    const addNew = () => {
        setModalWidth(600)
        setUserShow(true)
        setmodalContent("新增")
    }

    const save = () => {
        // addRole({ roleName: addRoleName })
        console.log(addRoleName)
    }

    const test = (e: any) => {
        console.log("1", e)
    }

    return (
        <>
            <div className={c("header")}>
                <div className={c("query")}>
                    <div className={c("inputs")}>
                        <div className={c("query-item")}>
                            <div className={c("label")}>角色名称：</div>
                            <Input placeholder="请输入角色名称" />
                        </div>
                    </div>
                    <div className={c("query-reset")}>
                        <Button className={c("query-btn")}>查询</Button>
                        <Button className={c("reset-btn")}>重置</Button>
                    </div>
                </div>
                <div className={c("btn-group")}>
                    <Button className={c("add")} onClick={() => addNew()}>
                        新增
                    </Button>
                </div>
            </div>
            <Table rowKey={e => e.createTime} columns={columns} dataSource={tableData} pagination={{ onChange: changePage, total, pageSize }} />
            <Drawer
                placement="right"
                title="菜单授权"
                open={drawShow}
                onClose={() => setDrawShow(false)}
                closable={false}
                extra={
                    <>
                        <CloseOutlined onClick={() => setDrawShow(false)} />
                    </>
                }
                footer={
                    <>
                        <div className={c("drawer-footer")}>
                            <Button>取消</Button>
                            <Button className={c("right")} onClick={save}>
                                保存
                            </Button>
                        </div>
                    </>
                }
            >
                <Tree treeData={treeData} checkable defaultExpandAll onCheck={test} />
            </Drawer>
            <User />
        </>
    )
}

export default RoleManage
