import { FC, useState } from "react"
import styles from "./index.module.less"
import { Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useAsync } from "../../utils/hooks"
import { queryAddressLib } from "../../api/oneBidThreeRPLib"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

const OneBThreeRPLib: FC = () => {
    const columns: ColumnsType<Person> = [
        {
            key: "XM",
            dataIndex: "XM",
            title: "姓名",
            align: "center"
        },
        {
            key: "XB",
            dataIndex: "XB",
            title: "性别",
            align: "center"
        },
        {
            key: "MZ",
            dataIndex: "MZ",
            title: "民族",
            align: "center"
        },
        {
            key: "GJ",
            dataIndex: "GJ",
            title: "国籍",
            align: "center"
        },
        {
            key: "ZJLX",
            dataIndex: "ZJLX",
            title: "证件类型",
            align: "center"
        },
        {
            key: "GMSFHM",
            dataIndex: "GMSFHM",
            title: "身份证号码",
            align: "center"
        },
        {
            key: "ZJXY",
            dataIndex: "ZJXY",
            title: "宗教信仰",
            align: "center"
        },
        {
            key: "CSRQ",
            dataIndex: "CSRQ",
            title: "出生日期",
            align: "center"
        },
        {
            key: "CSDGJ",
            dataIndex: "CSDGJ",
            title: "出生地籍贯",
            align: "center"
        },
        {
            key: "CSDSSX",
            dataIndex: "CSDSSX",
            title: "出生地市县",
            align: "center"
        },
        {
            key: "GMSFHM",
            dataIndex: "GMSFHM",
            title: "户籍地址详址",
            align: "center"
        },
        {
            key: "LXFS",
            dataIndex: "LXFS",
            title: "联系方式",
            align: "center"
        },
        {
            key: "WHCD",
            dataIndex: "WHCD",
            title: "文化程度",
            align: "center"
        },
        {
            key: "XZZXZ",
            dataIndex: "XZZXZ",
            title: "现住址详址",
            align: "center"
        },
        {
            key: "SYRKHSJG",
            dataIndex: "SYRKHSJG",
            title: "实有人口核实结果",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        {e.SYRKHSJG === "1" && <div>新登记</div>}
                        {e.SYRKHSJG === "2" && <div>已离开</div>}
                        {e.SYRKHSJG === "3" && <div>死亡</div>}
                        {e.SYRKHSJG === "4" && <div>无变化</div>}
                    </>
                )
            }
        }
    ]

    const [total, setTotal] = useState(0)
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [tableData, setTableData] = useState<Person[]>([])

    const search = async () => {
        const res = await queryAddressLib({
            pageNum,
            pageSize
        })
        res && (setTableData(res.data.rows), setTotal(res.data.total))
    }

    const changePage = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    useAsync(() => search(), [pageNum, pageSize])

    return (
        <div className={c("oneBThreeRPLib")}>
            <Table rowKey={e => e.GMSFHM} columns={columns} dataSource={tableData} pagination={{ onChange: changePage, total, pageSize }} />
        </div>
    )
}

export default OneBThreeRPLib
