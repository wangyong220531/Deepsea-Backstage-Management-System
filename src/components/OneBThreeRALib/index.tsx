import { FC, useState } from "react"
import styles from "./index.module.less"
import { queryPopulationLib } from "../../api/oneBThreeRALib"
import { useAsync } from "../../utils/hooks"
import { Table } from "antd"
import { ColumnsType } from "antd/es/table"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

const OneBThreeRALib: FC = () => {
    const columns: ColumnsType<Address> = [
        {
            key: "dlbh",
            dataIndex: "dlbh",
            title: "幢楼编号",
            align: "center"
        },
        {
            key: "dylcbh",
            dataIndex: "dylcbh",
            title: "单元楼层编号",
            align: "center"
        },
        {
            key: "dz",
            dataIndex: "dz",
            title: "地址",
            align: "center"
        },
        {
            key: "dzlx",
            dataIndex: "dzlx",
            title: "地址类型",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        {e.dzlx === "0" && <div>未确定</div>}
                        {e.dzlx === "1" && <div>建筑地址</div>}
                    </>
                )
            }
        },
        {
            key: "dzmc",
            dataIndex: "dzmc",
            title: "地址全称",
            align: "center"
        },
        // {
        //     key: "dztzm",
        //     dataIndex: "dztzm",
        //     title: "地址特征码",
        //     align: "center"
        // },
        {
            key: "dzzt",
            dataIndex: "dzzt",
            title: "地址状态",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        {e.dzzt === "0" && <div>待建</div>}
                        {e.dzzt === "1" && <div>有效</div>}
                        {e.dzzt === "2" && <div>冻结</div>}
                        {e.dzzt === "3" && <div>待替换</div>}
                        {e.dzzt === "4" && <div>替换</div>}
                        {e.dzzt === "5" && <div>消亡</div>}
                        {e.dzzt === "6" && <div>无效</div>}
                    </>
                )
            }
        },
        // {
        //     key: "jzdzid",
        //     dataIndex: "jzdzid",
        //     title: "建筑的地址ID",
        //     align: "center"
        // },
        {
            key: "jzjgdy",
            dataIndex: "jzjgdy",
            title: "建筑的最大单元数",
            align: "center"
        },
        {
            key: "jzjglc",
            dataIndex: "jzjglc",
            title: "最大层数",
            align: "center"
        },
        {
            key: "plCommunity",
            dataIndex: "plCommunity",
            title: "所属社区",
            align: "center"
        },
        {
            key: "plType",
            dataIndex: "plType",
            title: "类型",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        {e.plType === "VILLA" && <div>独栋</div>}
                        {e.plType === "HOUSE" && <div>房间</div>}
                        {e.plType === "UNIT" && <div>单元</div>}
                        {e.plType === "BUILD" && <div>楼栋</div>}
                        {e.plType === "AREA" && <div> 区域</div>}
                    </>
                )
            }
        },
        {
            key: "sfbz",
            dataIndex: "sfbz",
            title: "是否标注",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        {e.sfbz === "0" && <div>未标注</div>}
                        {e.sfbz === "1" && <div>已标注</div>}
                    </>
                )
            }
        },
        {
            key: "sfconfirm",
            dataIndex: "sfconfirm",
            title: "是否确认",
            align: "center",
            render: (_, e) => {
                return (
                    <>
                        {e.sfconfirm === "0" && <div>未确认</div>}
                        {e.sfconfirm === "1" && <div>已确认</div>}
                    </>
                )
            }
        },
        {
            key: "xzqh",
            dataIndex: "xzqh",
            title: "行政区划",
            align: "center"
        }
    ]

    const [total, setTotal] = useState(0)
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [tableData, setTableData] = useState<Address[]>([])

    const search = async () => {
        const res = await queryPopulationLib({
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
        <div className={c("oneBThreeRALib")}>
            <Table rowKey={e => e.id} columns={columns} dataSource={tableData} pagination={{ onChange: changePage, total, pageSize }} />
        </div>
    )
}

export default OneBThreeRALib
