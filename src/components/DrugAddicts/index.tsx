import { FC, useState } from "react"
import styles from "./index.module.less"
import type { ColumnsType } from "antd/es/table"
import Table from "antd/es/table"
import { SearchDrugAddictors } from "../../api/drugAddicts"
import { useAsync } from "../../utils/hooks"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

const DrugAddicts: FC = () => {
    const columns: ColumnsType<DrugAddict> = [
        {
            key: "XM",
            dataIndex: "XM",
            title: "姓名",
            align: "center"
        },
        {
            key: "GMSFHM",
            dataIndex: "GMSFHM",
            title: "身份证号",
            align: "center"
        },
        {
            key: "XDBH",
            dataIndex: "XDBH",
            title: "吸毒编号",
            align: "center"
        },
        {
            key: "XZDXZ",
            dataIndex: "XZDXZ",
            title: "现住地详址",
            align: "center"
        },
        {
            key: "BZ",
            dataIndex: "BZ",
            title: "备注",
            align: "center"
        },
        {
            key: "XGRXM",
            dataIndex: "XGRXM",
            title: "修改人姓名",
            align: "center"
        },
        {
            key: "XGRXM",
            dataIndex: "XGRXM",
            title: "修改人姓名",
            align: "center"
        },
        {
            key: "XGDWMC",
            dataIndex: "XGDWMC",
            title: "修改单位名称",
            align: "center"
        },
        {
            key: "XGSJ",
            dataIndex: "XGSJ",
            title: "人员修改时间",
            align: "center"
        },
        {
            key: "DJR",
            dataIndex: "DJR",
            title: "填报人",
            align: "center"
        },
        {
            key: "DJDWMC",
            dataIndex: "DJDWMC",
            title: "填报单位名称",
            align: "center"
        },
        {
            key: "DJSJ",
            dataIndex: "DJSJ",
            title: "填报日期",
            align: "center"
        }
    ]

    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [tableData, setTableData] = useState<DrugAddict[]>([])

    const search = async () => {
        const res = await SearchDrugAddictors({
            pageNum: 0,
            pageSize: 0
        })
        res && (setTableData(res.data.list), setTotal(res.data.size))
    }

    const pageChange = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    useAsync(() => search(), [pageNum, pageSize])

    return (
        <div className={c("drugAddicts")}>
            <Table columns={columns} dataSource={tableData} pagination={{ onChange: pageChange, total, pageSize }} />
        </div>
    )
}

export default DrugAddicts
