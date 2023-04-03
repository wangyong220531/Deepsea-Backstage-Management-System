import { FC, ReactNode, useEffect, useState } from "react"
import Styles from "./index.module.less"
import { Button, Input, Table } from "antd"
import type { ColumnsType } from "antd/es/table"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

interface TableHead {
    account: string
    name: string
    IDnumber: string
    policeNo: string
    phoneNumber: string
    unit: string
    role: string
    status: string
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
            key: "name",
            dataIndex: "name",
            title: "用户姓名",
            align: "center"
        },
        {
            key: "IDnumber",
            dataIndex: "IDnumber",
            title: "身份证号",
            align: "center"
        },
        {
            key: "policeNo",
            dataIndex: "policeNo",
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
        },
        {
            key: "status",
            dataIndex: "status",
            title: "状态",
            align: "center"
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
                            <Button>编辑</Button>
                            <Button>密码修改</Button>
                            <Button>删除</Button>
                        </div>
                    </>
                )
            }
        }
    ]

    const [tableData, setTableData] = useState<TableHead[]>([])

    useEffect(() => {
        query()
    }, [])

    const query = () => {
        setTableData([
            {
                account: "19945372694",
                name: "徐腾",
                IDnumber: "320812456987234654",
                policeNo: "0815246",
                phoneNumber: "18145623564",
                unit: "反恐大队",
                role: "超级管理员",
                status: "禁用"
            }
        ])
    }

    return (
        <div className={c("userManage")}>
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
                    <Button className={c("add")}>新增</Button>
                    <Button>下载模板</Button>
                    <Button>导入</Button>
                    <Button>导出</Button>
                </div>
            </div>
            <Table columns={columns} dataSource={tableData} />
        </div>
    )
}

export default UserManage
