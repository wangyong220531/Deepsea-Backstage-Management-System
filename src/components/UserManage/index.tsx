import { FC, ReactNode, useState } from "react"
import Styles from "./index.module.less"
import { Button, Input, Modal, Switch, Table, Form, Popconfirm, Select } from "antd"
import type { ColumnsType } from "antd/es/table"
import { delUser, searchUser, updatePassword, updateUserInfo, userInfoExport } from "../../api/userManage"
import { getAllRoles } from "../../api/roleManage"
import { exportExcel } from "../../utils/index"
import { useAsync } from "../../utils/hooks"
import useOperates from "../../store/operates"
import { useSession } from "../../store"
import judgePermissionItem from "../../utils/judge"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface TableHead extends UserInfo {
    operate?: ReactNode
}

export interface ExcelHead {
    userName: string
    userNo: string
    account: string
    roleName: string
    phone: string
    identityCode: string
    unitName: string
}

const UserManage: FC = () => {
    const columns: ColumnsType<TableHead> = [
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
            title: "手机号",
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
                            {(sessionStore.userType === "superAdmin" || operateArr.includes("6-1-1")) && (
                                <div className={c("item")} onClick={() => edit(e)}>
                                    编辑
                                </div>
                            )}
                            {(sessionStore.userType === "superAdmin" || operateArr.includes("6-1-2")) && (
                                <Popconfirm title="确定要删除吗？" onConfirm={() => delConfirm(e)}>
                                    <div className={c("item")}>删除</div>
                                </Popconfirm>
                            )}
                        </div>
                    </>
                )
            }
        }
    ]

    const operates = useOperates()

    const statusSwitch = (e: TableHead) => {
        e.status === 1
            ? updateUserInfo({
                  id: e.id,
                  phone: e.phone,
                  status: 0
              }).then(() => {
                  search()
              })
            : updateUserInfo({
                  id: e.id,
                  phone: e.phone,
                  status: 1
              }).then(() => {
                  search()
              })
    }

    const delConfirm = (e: TableHead) => {
        delUser({ id: e.id }).then(() => {
            search()
        })
    }

    // const [unitList, setUnitList] = useState<OptionType[]>([])

    // const searchUnitList = () => {
    //     getUnitList({}).then(res => {
    //         res &&
    //             setUnitList(
    //                 res.data.unitInfos.map(e => {
    //                     return {
    //                         value: e.unitNo,
    //                         label: e.unitName
    //                     }
    //                 })
    //             )
    //     })
    // }

    const [total, setTotal] = useState(0)
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const sessionStore = useSession()
    const [operateArr, setOperateArr] = useState<string[]>([])
    const [isFirstIn, setIsFirstIn] = useState(true)
    const [roleList, setRoleList] = useState<OptionType[]>([])
    const [roleName, setRoleName] = useState("")

    const changePage = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
        setQueryAccount("")
        setQueryUnit("")
    }

    const search = async () => {
        const res = await searchUser({
            account: queryAccount,
            roleName,
            unitName: queryUnit,
            pageNum: pageNum,
            pageSize: pageSize
        })
        res &&
            (setTableData(
                res.data.rows.map(e => {
                    return {
                        id: e.id,
                        account: e.account,
                        userName: e.userName,
                        userNo: e.userNo,
                        unitName: e.unitName,
                        identityCode: e.identityCode,
                        role: e.role,
                        phone: e.phone,
                        status: e.status
                    }
                })
            ),
            setTotal(res.data.total))
        setOperateArr(judgePermissionItem(operates[0].item))
        isFirstIn
            ? getAllRoles({}).then(res => {
                  res &&
                      setRoleList(
                          res.rows.map(e => {
                              return {
                                  value: e.roleName,
                                  label: e.roleName
                              }
                          })
                      )
              })
            : setIsFirstIn(false)
    }

    // useEffect(() => {
    //     searchUnitList()
    // }, [])

    useAsync(() => search(), [pageNum, pageSize])

    const query = () => {
        setPageNum(1)
        setPageSize(10)
        search()
    }

    const reset = () => {
        setQueryAccount("")
        setQueryUnit("")
    }

    const [selectId, setSelectId] = useState("")

    const edit = (e: TableHead) => {
        setSelectId(e.id)
        setOperateShow(true)
        setModalContent("编辑")
        editForm.setFieldsValue({
            account: e.account,
            userName: e.userName,
            userNo: e.userNo,
            phone: e.phone,
            unitName: e.unitName,
            role: e.role.roleName
        })
    }

    const [tableData, setTableData] = useState<TableHead[]>([])
    const [modalContent, setModalContent] = useState<"编辑" | "密码修改">("编辑")
    const [operateShow, setOperateShow] = useState(false)
    const [editForm] = Form.useForm()
    const [pwdChangeForm] = Form.useForm()

    const save = async () => {
        setOperateShow(false)
        if (modalContent === "编辑") {
            const res = await editForm.validateFields()
            updateUserInfo({
                id: selectId,
                phone: res.phone,
                status: 0
            }).then(() => {
                search()
            })
            editForm.resetFields()
            return
        }
        const res = await pwdChangeForm.validateFields()
        updatePassword({
            newPass: res.confirmPwd,
            userId: selectId
        })
        pwdChangeForm.resetFields()
    }

    const exportUserInfo = async () => {
        const res = await userInfoExport({})
        if (res) {
            exportExcel(
                res.data.map((e: ExcelHead) => {
                    return {
                        账号: e.account,
                        姓名: e.userName,
                        身份证号: e.identityCode,
                        警号: e.userNo,
                        角色: e.roleName,
                        手机号: e.phone,
                        单位: e.unitName
                    }
                }),
                "用户导出信息"
            )
        }
    }

    const [queryAccount, setQueryAccount] = useState("")
    const [queryUnit, setQueryUnit] = useState("")

    return (
        <>
            <div className={c("header")}>
                <div className={Styles["query"]}>
                    <div className={c("inputs")}>
                        <div className={c("query-item")}>
                            <div className={c("label")}>账号：</div>
                            <Input placeholder="请输入账号" value={queryAccount} onChange={e => setQueryAccount(e.target.value)} />
                        </div>
                        <div className={c("query-item")}>
                            <div className={c("label")}>单位：</div>
                            <Input placeholder="请输入单位名称" value={queryUnit} onChange={e => setQueryUnit(e.target.value)} />
                        </div>
                        <div className={c("query-item")}>
                            <div className={c("label")}>角色：</div>
                            <Select options={roleList} onSelect={e => setRoleName(e.target.value)}></Select>
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
                <div className={c("btn-group")}>{(sessionStore.userType === "superAdmin" || operateArr.includes("6-1-0")) && <Button onClick={exportUserInfo}>导出</Button>}</div>
            </div>
            <Table rowKey={e => e.account} columns={columns} dataSource={tableData} pagination={{ onChange: changePage, total, pageSize }} />
            <Modal
                title={modalContent}
                open={operateShow}
                onOk={() => setOperateShow(false)}
                onCancel={() => setOperateShow(false)}
                footer={
                    <>
                        <Button className={c("cancel")} onClick={() => setOperateShow(false)}>
                            取消
                        </Button>
                        <Button className={c("save")} onClick={save}>
                            保存
                        </Button>
                    </>
                }
            >
                {modalContent === "编辑" && (
                    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} form={editForm}>
                        <Form.Item label="用户账号" name="account">
                            <Input className={c("form-item-input")} disabled addonAfter="同警号" />
                        </Form.Item>
                        <Form.Item label="用户姓名" name="userName">
                            <Input className={c("form-item-input")} disabled />
                        </Form.Item>
                        <Form.Item label="警号" name="userNo">
                            <Input className={c("form-item-input")} disabled />
                        </Form.Item>
                        <Form.Item label="手机号" name="phone">
                            <Input className={c("form-item-input")} />
                        </Form.Item>
                        <Form.Item label="单位" name="unitName">
                            <Input className={c("form-item-input")} disabled />
                        </Form.Item>
                        <Form.Item label="角色" name="role">
                            <Input className={c("form-item-input")} disabled />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    )
}

export default UserManage
