import { FC, ReactNode, useEffect, useState } from "react"
import Styles from "./index.module.less"
import { Button, Input, Modal, Switch, Table, Form, Popconfirm, Select, message } from "antd"
import type { ColumnsType } from "antd/es/table"
import { delUser, getUnitList, searchUser, updatePassword, updateUserInfo, userInfoExport } from "../../api/userManage"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface TableHead extends UserInfo {
    operate?: ReactNode
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
            key: "phoneNumber",
            dataIndex: "phoneNumber",
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
                        <Switch defaultChecked={e.status === 0 ? false : true} checkedChildren="启用" unCheckedChildren="禁用" onChange={(checked, e) => statusSwitch(checked, event)} />
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
                            <div className={c("item")} onClick={() => edit(e)}>
                                编辑
                            </div>
                            <div className={c("item")} onClick={() => pwdChange(e)}>
                                密码修改
                            </div>
                            <Popconfirm title="确定要删除吗？" onConfirm={() => delConfirm(e)}>
                                <div className={c("item")}>删除</div>
                            </Popconfirm>
                        </div>
                    </>
                )
            }
        }
    ]

    const statusSwitch = (checked: Boolean, event: any) => {
        console.log(checked, event)
    }

    const delConfirm = (e: TableHead) => {
        delUser({ id: e.id }).then(() => {
            message.success("删除用户成功！")
            search()
        })
    }

    const [unitList, setUnitList] = useState<OptionType[]>([])

    const search = () => {
        searchUser({
            account: "",
            userUnitNo: "",
            pageNum: 1,
            pageSize: 10
        }).then(res => {
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
        })
        getUnitList({}).then(res => {
            res &&
                setUnitList(
                    res.data.map(e => {
                        return {
                            value: e.unitNo,
                            label: e.unitName
                        }
                    })
                )
        })
    }

    useEffect(() => {
        search()
    }, [])

    const [selectId, setSelectId] = useState("")

    const edit = (e: TableHead) => {
        setSelectId(e.id)
        e.role.roleName === "超级管理员" ? setIsGeneral(false) : setIsGeneral(true)
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

    const pwdChange = (e: TableHead) => {
        setSelectId(e.id)
        setModalContent("密码修改")
        seteditAccount(e.account)
        setOperateShow(true)
    }

    // const onChange = (checked: boolean) => {
    //     console.log(`switch to ${checked}`)
    // }

    const [tableData, setTableData] = useState<TableHead[]>([])

    const [total, setTotal] = useState(100)
    const [pageSize, setPageSize] = useState(10)

    const changePage = () => {}

    const [modalContent, setModalContent] = useState<"新增" | "编辑" | "密码修改">("编辑")
    const [operateShow, setOperateShow] = useState(false)

    const [editAccount, seteditAccount] = useState("")

    const [editForm] = Form.useForm()

    const [pwdChangeForm] = Form.useForm()

    const [isGeneral, setIsGeneral] = useState(true)

    const Operate: FC = () => {
        return (
            <>
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
                    {modalContent === "新增" || modalContent === "编辑" ? (
                        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={editForm}>
                            <Form.Item label="用户账号" name="account">
                                <Input className={c("form-item-input")} disabled={isGeneral} addonAfter="同警号" />
                            </Form.Item>
                            <Form.Item label="用户姓名" name="userName">
                                <Input className={c("form-item-input")} disabled={isGeneral} />
                            </Form.Item>
                            <Form.Item label="警号" name="userNo">
                                <Input className={c("form-item-input")} disabled={isGeneral} />
                            </Form.Item>
                            <Form.Item label="手机号" name="phoneNumber">
                                <Input className={c("form-item-input")} />
                            </Form.Item>
                            <Form.Item label="单位" name="unitName">
                                <Select placeholder="请选择单位" options={unitList} className={c("form-item-input")} />
                            </Form.Item>
                            <Form.Item label="角色" name="role">
                                <Input className={c("form-item-input")} disabled={isGeneral} />
                            </Form.Item>
                        </Form>
                    ) : (
                        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={pwdChangeForm}>
                            <Form.Item label="账号">
                                <Input value={editAccount} disabled className={c("form-item-input")} />
                            </Form.Item>
                            <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码!" }]}>
                                <Input className={c("form-item-input")} />
                            </Form.Item>
                            <Form.Item label="再次输入" name="confirmPwd" rules={[{ required: true, message: "请再次确认!" }]}>
                                <Input className={c("form-item-input")} />
                            </Form.Item>
                        </Form>
                    )}
                </Modal>
            </>
        )
    }

    const save = async () => {
        setOperateShow(false)
        if (modalContent === "新增" || modalContent === "编辑") {
            const res = await editForm.validateFields()
            updateUserInfo({
                id: selectId,
                account: res.account,
                userName: res.userName,
                userNo: res.userNo,
                roleId: res.role,
                status: 0
            }).then(() => {
                message.success("更改用户信息成功！")
            })
            editForm.resetFields()
            return
        }
        const res = await pwdChangeForm.validateFields()
        updatePassword({
            newPass: res.confirmPwd,
            userId: selectId
        }).then(() => {
            message.success("修改密码成功！")
        })
        pwdChangeForm.resetFields()
    }

    const addNew = () => {
        setModalContent("新增")
        setIsGeneral(false)
        editForm.resetFields()
        setOperateShow(true)
    }

    const exportUserInfo = async () => {
        const res = await userInfoExport({})
        if (res) {
            const blob: Blob = new Blob([res.data], { type: "application/vnd.ms-excel" })
            const downloadElement = document.createElement("a")
            const href = window.URL.createObjectURL(blob)
            downloadElement.href = href
            downloadElement.download = "用户信息导出"
            document.body.appendChild(downloadElement)
            downloadElement.click()
            document.body.removeChild(downloadElement)
            window.URL.revokeObjectURL(href)
            message.success("导出成功")
        }
    }

    return (
        <>
            <div className={c("header")}>
                <div className={Styles["query"]}>
                    <div className={c("inputs")}>
                        <div className={c("query-item")}>
                            <div className={c("label")}>账号：</div>
                            <Input placeholder="亲输入账号" />
                        </div>
                        <div className={c("query-item")}>
                            <div className={c("label")}>单位：</div>
                            <Input placeholder="亲输入单位名称" />
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
                    <Button>下载模板</Button>
                    <Button>上传</Button>
                    <Button onClick={exportUserInfo}>导出</Button>
                </div>
            </div>
            <Table rowKey={e => e.account} columns={columns} dataSource={tableData} pagination={{ onChange: changePage, total, pageSize }} />
            <Operate />
        </>
    )
}

export default UserManage
