import { FC, ReactNode, useState } from "react"
import styles from "./index.module.less"
import StabilityHeader from "../StabilityHeader"
import { useNavigate } from "react-router-dom"
import Back from "../../assets/Stability/back.png"
import { Button, Input, Select, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { nanoid } from "nanoid"
import { useAsync } from "../../utils/hooks"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

export interface StabilityTableProps {}

interface TableHeader {
    id: string
    name: string
    sex: "男" | "女"
    age: number
    idNumber: string
    domicile: string
    currentAddress: string
    controlLevel: "一级" | "二级" | "三级"
    controlPolice: string
    policeStation: string
    operate?: ReactNode
}

const StabilityTable: FC<StabilityTableProps> = props => {
    const {} = props

    const columns: ColumnsType<TableHeader> = [
        {
            key: "name",
            dataIndex: "name",
            title: "姓名",
            align: "center"
        },
        {
            key: "sex",
            dataIndex: "sex",
            title: "性别",
            align: "center"
        },
        {
            key: "age",
            dataIndex: "age",
            title: "年龄",
            align: "center"
        },
        {
            key: "idNumber",
            dataIndex: "idNumber",
            title: "身份证号",
            align: "center"
        },
        {
            key: "domicile",
            dataIndex: "domicile",
            title: "户籍地",
            align: "center"
        },
        {
            key: "currentAddress",
            dataIndex: "currentAddress",
            title: "现住址",
            align: "center"
        },
        {
            key: "controlLevel",
            dataIndex: "controlLevel",
            title: "管控等级",
            align: "center"
        },
        {
            key: "controlPolice",
            dataIndex: "controlPolice",
            title: "管控民警",
            align: "center"
        },
        {
            key: "policeStation",
            dataIndex: "policeStation",
            title: "派出所",
            align: "center"
        },
        {
            key: "operate",
            dataIndex: "operate",
            title: "操作",
            align: "center",
            width: "400px",
            render: () => {
                return (
                    <div className={c("opertate-btns")}>
                        <div className={c("edit", "item")}>编辑</div>
                        <div className={c("delete", "item")}>删除</div>
                        <div className={c("to-top", "item")}>置顶</div>
                    </div>
                )
            }
        }
    ]

    const chargeLevelList: OptionType[] = [
        {
            label: "一级",
            value: "一级"
        },
        {
            label: "二级",
            value: "二级"
        },
        {
            label: "三级",
            value: "三级"
        }
    ]

    const [total, setTotal] = useState(0)
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const navigate = useNavigate()
    const [tableData, setTableData] = useState<TableHeader[]>([])

    const search = async () => {
        setTableData([
            {
                id: nanoid(),
                name: "菜徐腾",
                sex: "男",
                age: 22,
                idNumber: "3208122000011072516",
                domicile: "镇江",
                currentAddress: "淮安",
                controlLevel: "二级",
                controlPolice: "卜方浩",
                policeStation: "北京路派出所"
            }
        ])
    }

    const back = () => {
        navigate("/stability", { replace: true })
    }

    const pgChange = (pageNum: number, pageSize: number) => {}

    useAsync(() => search(), [pageNum, pageSize])

    return (
        <div className={c("stabilityTable")}>
            <StabilityHeader />
            <img src={Back} alt="" className={c("back")} onClick={back} />
            <div className={c("table-container")}>
                <div className={c("search")}>
                    <div className={c("inputs")}>
                        <div className={c("item")}>
                            <div className={c("prefix")}>姓名：</div>
                            <Input placeholder="请输入姓名" />
                        </div>
                        <div className={c("item")}>
                            <div className={c("prefix")}>身份证号：</div>
                            <Input placeholder="请输入身份证号" />
                        </div>
                        {/* <div className={c("item")}>
                            <div className={c("prefix")}>管控等级：</div>
                            <Select placeholder="请选择管控等级" options={chargeLevelList}/>
                        </div>
                        <div className={c("item")}>
                            <div className={c("prefix")}>派出所：</div>
                            <Select placeholder="请选择派出所" options={chargeLevelList}/>
                        </div> */}
                    </div>
                    <div className={c("btns")}>
                        <Button type="primary">查询</Button>
                        <Button type="primary">新增</Button>
                        <Button>导入</Button>
                    </div>
                </div>
                <Table dataSource={tableData} columns={columns} pagination={{ onChange: pgChange, total, pageSize }} />
            </div>
        </div>
    )
}

export default StabilityTable
