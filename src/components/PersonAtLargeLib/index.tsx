import { FC, useState } from "react"
import Styles from "./index.module.less"
import { Button, Input, Select, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useAsync } from "../../utils/hooks"
import { searchPersonsAtLarge } from "../../api/personAtLargeLib"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : Styles[className])).join(" ")
}

const PersonAtLargeLib: FC = () => {
    const statusList: OptionType[] = [
        {
            value: "-1",
            label: "全部"
        },
        {
            value: "0",
            label: "待审批"
        },
        {
            value: "1",
            label: "审批不通过"
        },
        {
            value: "2",
            label: "审批通过"
        },
        {
            value: "3",
            label: "草稿"
        }
    ]

    const columns: ColumnsType<PLRecord> = [
        {
            key: "xm",
            dataIndex: "xm",
            title: "姓名",
            align: "center"
        },
        {
            key: "zjhm",
            dataIndex: "zjhm",
            title: "性别",
            align: "center",
            render: (_, e) => {
                return <>{Number(e.zjhm[16]) % 2 === 1 ? <div>男</div> : <div>女</div>}</>
            }
        },
        {
            key: "zjhm",
            dataIndex: "zjhm",
            title: "证件号码",
            align: "center"
        },
        {
            key: "gjdm",
            dataIndex: "gjdm",
            title: "国籍",
            align: "center"
        },
        {
            key: "jgdm",
            dataIndex: "jgdm",
            title: "籍贯",
            align: "center"
        },
        {
            key: "mzdm",
            dataIndex: "mzdm",
            title: "民族",
            align: "center"
        },
        {
            key: "hjdz_dzmc",
            dataIndex: "hjdz_dzmc",
            title: "户籍地址",
            align: "center"
        },
        {
            key: "xzz_dzmc",
            dataIndex: "xzz_dzmc",
            title: "现住址",
            align: "center"
        },
        {
            key: "zhrq",
            dataIndex: "zhrq",
            title: "抓获日期",
            align: "center"
        },
        {
            key: "zhdd_dzmc",
            dataIndex: "zhdd_dzmc",
            title: "抓获地点",
            align: "center"
        },
        {
            key: "zhdw_gajgmc",
            dataIndex: "zhdw_gajgmc",
            title: "抓获单位",
            align: "center"
        },
        {
            key: "djspdw_gajgmc",
            dataIndex: "djspdw_gajgmc",
            title: "登记审批单位",
            align: "center"
        },
        {
            key: "djspr_xm",
            dataIndex: "djspr_xm",
            title: "等级审批人",
            align: "center"
        },
        {
            key: "strksj",
            dataIndex: "strksj",
            title: "省厅入库时间",
            align: "center"
        }
    ]

    const [pageNum, setPageNum] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [tableData, setTableData] = useState<PLRecord[]>([])

    const search = async () => {
        const res = await searchPersonsAtLarge({})
    }

    // const query = () => {
    //     setPageNum(0)
    //     setPageSize(10)
    //     search()
    // }

    // const reset = () => {}

    const pageChange = (pageNum: number, pageSize: number) => {
        setPageNum(pageNum)
        setPageSize(pageSize)
    }

    useAsync(() => search(), [pageNum, pageSize])

    return (
        <>
            {/* <div className={c("header")}>
                <div className={Styles["query"]}>
                    <div className={c("inputs")}>
                        <div className={c("query-item")}>
                            <div className={c("label")}>姓名：</div>
                            <Input placeholder="请输入姓名" />
                        </div>
                        <div className={c("query-item")}>
                            <div className={c("label")}>证件号码：</div>
                            <Input placeholder="请输入证件号码" />
                        </div>
                        <div className={c("query-item")}>
                            <div className={c("label")}>状态：</div>
                            <Select options={statusList} defaultValue={statusList[0]}></Select>
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
            </div> */}
            <Table columns={columns} dataSource={tableData} pagination={{ onChange: pageChange, total, pageSize }}></Table>
        </>
    )
}

export default PersonAtLargeLib
