import { Button, Input, Modal, Switch, Table, Drawer, Tree, Form, Popconfirm } from "antd"
import Styles from "./index.module.less"
import type { ColumnsType } from "antd/es/table"
import { ReactNode, useEffect, useRef, useState } from "react"
import type { DataNode } from "antd/es/tree"
import { CloseOutlined } from "@ant-design/icons"
import { addRole, AssignMultiUsers, AssignPermission, delRole, getRolePermission, searchRole, updateRole } from "../../api/roleManage"
import { searchUser } from "../../api/userManage"
import { getPermissionTree } from "../../api/permisssion"
import { useSession } from "../../store"
import { useAsync } from "../../utils/hooks"
import useRole from "../../store/role"
import useOperates from "../../utils/operates"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface TableHead extends Role {
    operate?: ReactNode
}

interface TreeNode {
    key: string
    title: string
    children?: TreeNode[]
}

const RoleManage: React.FC = () => {
    const [treeData, setTreeData] = useState<DataNode[]>([])
    const [inputRolename, setInputRolename] = useState("")
    const sessionStore = useSession()
    const roles = useRole()
    const operates = useOperates()
    const [operateId, setOperateId] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)

    const searchPermissionTree = () => {
        getPermissionTree({
            parentId: "0"
        }).then(res => {
            res &&
                setTreeData([
                    {
                        key: "shenhai",
                        title: "深海后台管理系统",
                        children: res.data.map(e => {
                            if (e.childList && e.childList.length > 0) {
                                return {
                                    key: e.id,
                                    title: e.permissionName + e.id,
                                    children: e.childList.map(a => {
                                        if (a.childList && a.childList.length > 0) {
                                            return {
                                                key: a.id,
                                                title: a.permissionName + a.id,
                                                children: a.childList.map(b => {
                                                    if (b.childList && b.childList.length > 0) {
                                                        return {
                                                            key: b.id,
                                                            title: b.permissionName + b.id,
                                                            children: b.childList.map(c => {
                                                                if (c.childList && c.childList.length > 0) {
                                                                    return {
                                                                        key: c.id,
                                                                        title: c.permissionName + c.id,
                                                                        children: c.childList.map(d => {
                                                                            return {
                                                                                key: d.id,
                                                                                title: d.permissionName + d.id
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                return {
                                                                    key: c.id,
                                                                    title: c.permissionName + c.id
                                                                }
                                                            })
                                                        }
                                                    }
                                                    return {
                                                        key: b.id,
                                                        title: b.permissionName + b.id
                                                    }
                                                })
                                            }
                                        }
                                        return {
                                            key: a.id,
                                            title: a.permissionName + a.id
                                        }
                                    })
                                }
                            }
                            return {
                                key: e.id,
                                title: e.permissionName + e.id
                            }
                        })
                    }
                ])
        })
    }

    const search = async () => {
        const res = await searchRole({
            pageNum: pageNum,
            pageSize: pageSize,
            roleName: inputRolename
        })
        if (res) {
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
            setTotal(res.data.total)
        }

        if (sessionStore.userType === "superAdmin") {
            setOperateId(5)
        }
        if (
            operates[0].item
                .find(e => e.permissionName === "系统管理")
                ?.children?.find(e => e.permissionName === "角色管理")
                ?.children?.find(e => e.permissionName === "新增")
        ) {
            setOperateId(1)
        }
        if (
            operates[0].item
                .find(e => e.permissionName === "系统管理")
                ?.children?.find(e => e.permissionName === "角色管理")
                ?.children?.find(e => e.permissionName === "编辑")
        ) {
            setOperateId(2)
        }
        if (
            operates[0].item
                .find(e => e.permissionName === "系统管理")
                ?.children?.find(e => e.permissionName === "角色管理")
                ?.children?.find(e => e.permissionName === "授权")
        ) {
            setOperateId(3)
        }
        if (
            operates[0].item
                .find(e => e.permissionName === "系统管理")
                ?.children?.find(e => e.permissionName === "角色管理")
                ?.children?.find(e => e.permissionName === "删除")
        ) {
            setOperateId(4)
        }
    }

    useEffect(() => {
        searchPermissionTree()
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
                        <Switch defaultChecked={e.status === 0 ? false : true} checkedChildren="启用" unCheckedChildren="禁用" onChange={() => statusSwitch(e)} />
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
                            {(operateId === 2 || operateId === 5) && (
                                <>
                                    <div className={c("item")} onClick={() => edit(e)}>
                                        编辑
                                    </div>
                                    <div className={c("item")} onClick={() => userClick(e)}>
                                        用户
                                    </div>
                                </>
                            )}
                            {(operateId === 3 || operateId === 5) && (
                                <div className={c("item")} onClick={() => authorize(e)}>
                                    授权
                                </div>
                            )}
                            {operateId === 4 && (
                                <Popconfirm title="确定要删除吗？" onConfirm={() => delRoleConfirm(e)}>
                                    <div className={c("item")}>删除</div>
                                </Popconfirm>
                            )}
                        </div>
                    </>
                )
            }
        }
    ]

    const [roleselect, setRoleselect] = useState("")
    const [modalTotal, setModalTotal] = useState(100)
    const [modalPagenum, setModalPagenum] = useState(1)
    const [modalPagesize, setModalPagesize] = useState(5)

    const userSearch = async () => {
        const res = await searchUser({
            account: modalQueryAccount,
            unitName: "",
            pageNum: modalPagenum,
            pageSize: modalPagesize
        })
        if (res) {
            setModalTableData(
                res.data.rows.map(e => {
                    return {
                        id: e.id,
                        account: e.account,
                        userName: e.userName,
                        identityCode: e.identityCode,
                        userNo: e.userNo,
                        phone: e.phone,
                        role: e.role,
                        unitName: e.unitName
                    }
                })
            )
            setModalTotal(res.data.total)
        }
    }

    const userClick = (e: TableHead) => {
        setSelectedRowKeys([])
        setRoleselect(e.id)
        setModalWidth(800)
        setmodalContent("用户授权")
        setUserShow(true)
        userSearch()
    }

    const authorize = async (e: TableHead) => {
        const res = await getRolePermission({ roleId: e.id })
        if (res?.data) {
            setTreeChecked(res.data.map(e => e.id))
        } else {
            setTreeChecked([])
        }
        setRoleselect(e.id)
        setModalWidth(800)
        setDrawShow(true)
    }

    const edit = (e: TableHead) => {
        setmodalContent("角色编辑")
        setEditRole({
            id: e.id,
            roleName: e.roleName,
            status: e.status
        })
        editForm.setFieldsValue({
            roleName: e.roleName
        })
        setUserShow(true)
    }

    const delRoleConfirm = (e: TableHead) => {
        delRole({ id: e.id }).then(() => {
            search()
        })
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
            key: "userNo",
            dataIndex: "userNo",
            title: "警号",
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

    const statusSwitch = (e: TableHead) => {
        e.status === 0
            ? updateRole({ id: e.id, roleName: e.roleName, status: 1 }).then(() => {
                  search()
              })
            : updateRole({ id: e.id, roleName: e.roleName, status: 0 }).then(() => {
                  search()
              })
    }

    const changePage = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    const [userShow, setUserShow] = useState(false)

    const [modalContent, setmodalContent] = useState<"新增" | "用户授权" | "角色编辑">("用户授权")

    const [modalWidth, setModalWidth] = useState(600)

    const [addForm] = Form.useForm()
    const [editForm] = Form.useForm()

    const [modalTableData, setModalTableData] = useState<UserInfo[]>([])

    const [editRole, setEditRole] = useState<UpdateRoleData>(Object)

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        roles[0].selected = newSelectedRowKeys.toString().split(",")
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }

    const inputModalAccount = useRef("")

    const assignUserQuery = () => {
        userSearch()
    }

    const assignUserReset = () => {
        setModalQueryAccount("")
    }

    useAsync(() => userSearch(), [modalPagenum, modalPagesize])

    const modalChangePage = (pageNum: number, pageSize: number) => {
        setModalPagenum(pageNum)
        setModalPagesize(pageSize)
        setModalQueryAccount("")
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
                search()
                addForm.resetFields()
            })
            return
        }
        if (modalContent === "用户授权") {
            AssignMultiUsers({
                roleId: roleselect,
                userIds: roles[0].selected
            })
            return
        }
        if (modalContent === "角色编辑") {
            const res = await editForm.validateFields()
            updateRole({ id: editRole.id, roleName: res.roleName, status: editRole.status })
            search()
            return
        }
    }

    const [pselcted, setPselcted] = useState<string[]>([])

    const treeChecksClick = (a: any, e: any) => {
        setPselcted(e.checkedNodes.filter((e: TreeNode) => !e.children).map((e: TreeNode) => e.key))
    }

    const treeSave = () => {
        AssignPermission({
            roleId: roleselect,
            permissionIds: pselcted.length > 0 ? pselcted : treeChecked
        }).then(() => {
            setDrawShow(false)
        })
    }

    const query = () => {
        search()
    }

    const reset = () => {
        setInputRolename("")
    }

    const [treeChecked, setTreeChecked] = useState<string[]>([])

    const [total, setTotal] = useState(100)
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    useAsync(() => search(), [pageNum, pageSize])

    const [modalQueryAccount, setModalQueryAccount] = useState("")

    return (
        <>
            <div className={c("header")}>
                <div className={c("query")}>
                    <div className={c("inputs")}>
                        <div className={c("query-item")}>
                            <div className={c("label")}>角色名称：</div>
                            <Input placeholder="请输入角色名称" value={inputRolename} onChange={e => setInputRolename(e.target.value)} />
                        </div>
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
                    {(operateId === 1 || operateId === 5) && (
                        <Button className={c("add")} onClick={() => addNew()}>
                            新增
                        </Button>
                    )}
                </div>
            </div>
            <Table rowKey={e => e.id} columns={columns} dataSource={tableData} pagination={{ onChange: changePage, total, pageSize }} />
            {drawShow && (
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
                                <Button onClick={() => setDrawShow(false)}>取消</Button>
                                <Button className={c("right")} onClick={treeSave}>
                                    保存
                                </Button>
                            </div>
                        </>
                    }
                >
                    <Tree treeData={treeData} checkable defaultExpandAll defaultCheckedKeys={treeChecked} onCheck={treeChecksClick} />
                </Drawer>
            )}
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
                            <Form.Item label="角色备注" name="roleComment">
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
                                    <Input placeholder="请输入账号" value={modalQueryAccount} onChange={e => setModalQueryAccount(e.target.value)} />
                                </div>
                            </div>
                            <div className={c("query-reset")}>
                                <Button className={c("query-btn")} onClick={assignUserQuery}>
                                    查询
                                </Button>
                                <Button className={c("reset-btn")} onClick={assignUserReset}>
                                    重置
                                </Button>
                            </div>
                        </div>
                        <Table
                            rowKey={e => e.id}
                            rowSelection={{
                                ...rowSelection
                            }}
                            columns={modalColumns}
                            dataSource={modalTableData}
                            pagination={{ onChange: modalChangePage, total: modalTotal, pageSize: modalPagesize, size: "small" }}
                        />
                    </>
                )}
                {modalContent === "角色编辑" && (
                    <>
                        <Form form={editForm}>
                            <Form.Item label="角色名称" name="roleName">
                                <Input placeholder="请输入角色名称" className={c("form-item-input")} />
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Modal>
        </>
    )
}

export default RoleManage
