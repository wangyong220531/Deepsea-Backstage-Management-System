import { FC, useState } from "react"
import styles from "./index.module.less"
import type { ColumnsType } from "antd/es/table"
import Table from "antd/es/table"
import { SearchDrugAddictors } from "../../api/drugAddicts"
import { useAsync } from "../../utils/hooks"
import { nanoid } from "nanoid"
import { Tooltip } from "antd"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

const DrugAddicts: FC = () => {
    const columns: ColumnsType<DrugAddict> = [
        {
            key: "xm",
            dataIndex: "xm",
            title: "姓名",
            align: "center",
            width: 130,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 130,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        textAlign: "center"
                    }
                }
            },
            render: (_, e) => {
                return (
                    <>
                        <Tooltip title={e.xm}>
                            <div>{e.xm}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            key: "gmsfhm",
            dataIndex: "gmsfhm",
            title: "身份证号",
            align: "center"
        },
        {
            key: "xdbh",
            dataIndex: "xdbh",
            title: "吸毒编号",
            align: "center"
        },
        {
            key: "xzdxz",
            dataIndex: "XZDXZ",
            title: "现住地详址",
            align: "center",
            width: 160,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 160,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        textAlign: "center"
                    }
                }
            },
            render: (_, e) => {
                return (
                    <>
                        <Tooltip title={e.xzdxz}>
                            <div>{e.xzdxz}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            key: "bz",
            dataIndex: "bz",
            title: "备注",
            align: "center",
            width: 200,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 200,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        textAlign: "center"
                    }
                }
            },
            render: (_, e) => {
                return (
                    <>
                        <Tooltip title={e.bz}>
                            <div>{e.bz}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            key: "xgrxm",
            dataIndex: "xgrxm",
            title: "修改人姓名",
            align: "center"
        },
        {
            key: "xgdwmc",
            dataIndex: "xgdwmc",
            title: "修改单位名称",
            align: "center",
            width: 180,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 180,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        textAlign: "center"
                    }
                }
            },
            render: (_, e) => {
                return (
                    <>
                        <Tooltip title={e.xgdwmc}>
                            <div>{e.xgdwmc}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            key: "xgsj",
            dataIndex: "xgsj",
            title: "人员修改时间",
            align: "center",
            width: 120,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 120,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        textAlign: "center"
                    }
                }
            },
            render: (_, e) => {
                return (
                    <>
                        <Tooltip title={e.xgsj}>
                            <div>{e.xgsj}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            key: "djrxm",
            dataIndex: "djrxm",
            title: "填报人",
            align: "center"
        },
        {
            key: "djdwmc",
            dataIndex: "djdwmc",
            title: "填报单位名称",
            align: "center",
            width: 160,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 160,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        textAlign: "center"
                    }
                }
            },
            render: (_, e) => {
                return (
                    <>
                        <Tooltip title={e.djdwmc}>
                            <div>{e.djdwmc}</div>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            key: "djsj",
            dataIndex: "djsj",
            title: "填报日期",
            align: "center",
            width: 120,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 120,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        textAlign: "center"
                    }
                }
            },
            render: (_, e) => {
                return (
                    <>
                        <Tooltip title={e.djsj}>
                            <div>{e.djsj}</div>
                        </Tooltip>
                    </>
                )
            }
        }
    ]

    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [tableData, setTableData] = useState<DrugAddict[]>([])

    const search = async () => {
        const res = await SearchDrugAddictors({
            pageNum,
            pageSize
        })
        res && (setTableData(res.data.drugPerVos), setTotal(res.data.size))
    }

    const pageChange = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    useAsync(() => search(), [pageNum, pageSize])

    return (
        <div className={c("drugAddicts")}>
            <Table rowKey={e => e.gmsfhm} columns={columns} dataSource={tableData} pagination={{ onChange: pageChange, total, pageSize }} />
        </div>
    )
}

export default DrugAddicts
