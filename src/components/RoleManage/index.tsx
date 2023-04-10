import { Button, Input, Modal, Switch, Table, Drawer, Tree, Form, message } from "antd"
import Styles from "./index.module.less"
import type { ColumnsType } from "antd/es/table"
import { ReactNode, useEffect, useState } from "react"
import type { DataNode } from "antd/es/tree"
import { CloseOutlined } from "@ant-design/icons"
import { addRole, AssignMultiUsers, AssignPermission, searchRole } from "../../api/roleManage"
import { searchUser } from "../../api/userManage"
import { getPermissionTree } from "../../api/permisssion"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface TableHead extends Role {
    operate?: ReactNode
}

const RoleManage: React.FC = () => {
    const [treeData, setTreeData] = useState<DataNode[]>([])

    const search = () => {
        getPermissionTree({
            parentId: "0"
        }).then(res => {
            res &&
                setTreeData(
                    res.data.map(e => {
                        if (e.childList && e.childList.length > 0) {
                            return {
                                key: e.id,
                                title: e.permissionName,
                                children: e.childList.map(a => {
                                    if (a.childList && a.childList.length > 0) {
                                        return {
                                            key: a.id,
                                            title: a.permissionName,
                                            children: a.childList.map(b => {
                                                if (b.childList && b.childList.length > 0) {
                                                    return {
                                                        key: b.id,
                                                        title: b.permissionName,
                                                        children: b.childList.map(c => {
                                                            if (c.childList && c.childList.length > 0) {
                                                                return {
                                                                    key: c.id,
                                                                    title: c.permissionName,
                                                                    children: c.childList.map(d => {
                                                                        return {
                                                                            key: d.id,
                                                                            title: d.permissionName
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            return {
                                                                key: c.id,
                                                                title: c.permissionName
                                                            }
                                                        })
                                                    }
                                                }
                                                return {
                                                    key: b.id,
                                                    title: b.permissionName
                                                }
                                            })
                                        }
                                    }
                                    return {
                                        key: a.id,
                                        title: a.permissionName
                                    }
                                })
                            }
                        }
                        return {
                            key: e.id,
                            title: e.permissionName
                        }
                    })
                )
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
                            <div className={c("item")} onClick={() => userClick(e)}>
                                用户
                            </div>
                            <div className={c("item")} onClick={() => authorize(e)}>
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

    const [roleselect, setRoleselect] = useState("")

    const userClick = (e: TableHead) => {
        setRoleselect(e.id)
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

    const authorize = (e: TableHead) => {
        setRoleselect(e.id)
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
        // console.log(`switch to ${checked}`)
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

    const addNew = () => {
        setModalWidth(600)
        setUserShow(true)
        setmodalContent("新增")
    }

    const save = async () => {
        setUserShow(false)
        if (modalContent === "新增") {
            const res = await addForm.validateFields()
            addRole({ roleName: res.roleName, roleComment: res.roleComment }).then(() => {
                message.success("新增角色成功！")
                search()
            })
            return
        }
        if (modalContent === "用户授权") {
            AssignMultiUsers({
                roleId: roleselect,
                userIds: selectedRowKeys
            }).then(() => {
                message.success("赋予角色成功！")
            })
            return
        }
    }

    const [pselcted, setPselcted] = useState<string[]>([])

    const test = (e: any) => {
        setPselcted(e)
    }

    const treeSave = () => {
        AssignPermission({
            roleId: roleselect,
            permissionIds: pselcted
        }).then(() => {
            message.success("授权成功！")
        })
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
                            <Button className={c("right")} onClick={treeSave}>
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
