import { Button, Input, Modal, Switch, Table, Drawer, Tree, Form, message } from "antd"
import Styles from "./index.module.less"
import type { ColumnsType } from "antd/es/table"
import { ReactNode, useEffect, useState } from "react"
import type { DataNode } from "antd/es/tree"
import { CloseOutlined } from "@ant-design/icons"
import { addRole, searchRole } from "../../api/roleManage"
import { searchUser } from "../../api/userManage"
import { getPermissionTree } from "../../api/permisssion"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface TableHead extends Role {
    operate?: ReactNode
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
        getPermissionTree({
            parentId: ""
        })
        searchRole({
            pageNum: 1,
            pageSize: 10,
            roleName: ""
        }).then(res => {
            res &&
                setTableData(
                    res.data.rows.map(e => {
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
    }, [])

    const userClick = () => {
        setSelectedRowKeys([])
        setModalWidth(800)
        searchUser({
            account: "",
            userUnitNo: "",
            pageNum: 1,
            pageSize: 10
        }).then(res => {
            res &&
                setModalTableData(
                    res.data.rows.map(e => {
                        return {
                            id: e.id,
                            account: e.account,
                            userName: e.unitName,
                            identityCode: e.identityCode,
                            userNo: e.userNo,
                            phone: e.phone,
                            role: e.role,
                            unitName: e.unitName
                        }
                    })
                )
        })
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

    const modalColumns: ColumnsType<UserInfo> = [
        {
            key: "account",
            dataIndex: "account",
            title: "用户账号",
            align: "center"
        },
        {
            key: "userName",
            dataIndex: "userName",
            title: "用户姓名",
            align: "center"
        },
        {
            key: "identityCode",
            dataIndex: "identityCode",
            title: "身份证号",
            align: "center"
        },
        {
            key: "userNo",
            dataIndex: "userNo",
            title: "警号",
            align: "center"
        },
        {
            key: "phone",
            dataIndex: "phone",
            title: "手机号码",
            align: "center"
        },
        {
            key: "unitName",
            dataIndex: "unitName",
            title: "单位",
            align: "center"
        },
        {
            key: "role",
            dataIndex: "role",
            title: "角色",
            align: "center",
            render: (_, e) => {
                return <>{e.role.roleName}</>
            }
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

    const [addForm] = Form.useForm()

    const [modalTableData, setModalTableData] = useState<UserInfo[]>([])

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }

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
                            <Button className={c("save")} onClick={save}>
                                保存
                            </Button>
                        </>
                    }
                    width={modalWidth}
                >
                    {modalContent === "新增" && (
                        <>
                            <Form form={addForm}>
                                <Form.Item label="角色名称" name="roleName">
                                    <Input placeholder="请输入角色名称" className={c("form-item-input")} />
                                </Form.Item>
                                <Form.Item label="角色名称" name="roleComment">
                                    <Input.TextArea placeholder="请输入角色说明" className={c("form-item-input")} />
                                </Form.Item>
                            </Form>
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
                            <Table rowKey={e => e.id} rowSelection={rowSelection} columns={modalColumns} dataSource={modalTableData} pagination={{ onChange: changePage, total: modalTotal, pageSize: modalPagesize, size: "small" }} />
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

    const addNew = () => {
        setModalWidth(600)
        setUserShow(true)
        setmodalContent("新增")
    }

    const save = async () => {
        setUserShow(false)
        const res = await addForm.validateFields()
        addRole({ roleName: res.roleName, roleComment: res.roleComment }).then(() => {
            message.success("新增角色成功！")
            search()
        })
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
            <Table rowKey={e => e.id} columns={columns} dataSource={tableData} pagination={{ onChange: changePage, total, pageSize }} />
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
                            <Button className={c("right")}>保存</Button>
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
