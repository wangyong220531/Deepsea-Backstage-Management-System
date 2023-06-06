import { FC, ReactNode, useState } from "react"
import styles from "./index.module.less"
import StabilityHeader from "../StabilityHeader"
import { useNavigate } from "react-router-dom"
import Back from "../../assets/Stability/back.png"
import { Button, Form, Input, Modal, Select, Table, Upload, message } from "antd"
import type { ColumnsType } from "antd/es/table"
import { nanoid } from "nanoid"
import { useAsync } from "../../utils/hooks"
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import ImgTest from "../../assets/Stability/TestImgs/DownLoadFile166.jpg"

function c(...classNameList: (string | undefined | null | boolean)[]) {
    return (classNameList.filter(item => typeof item === "string") as string[]).map(className => (className.startsWith("_") ? className.slice(1) : styles[className])).join(" ")
}

export interface StabilityTableProps {}

interface TableHeader {
    id: string
    img: string
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
            key: "img",
            dataIndex: "img",
            title: "照片",
            align: "center",
            render: (_, e) => {
                return <img src={e.img} className={c("avatar")} />
            }
        },
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
            title: "管控派出所",
            align: "center"
        },
        {
            key: "operate",
            dataIndex: "operate",
            title: "操作",
            align: "center",
            width: "400px",
            render: (_, e) => {
                return (
                    <div className={c("opertate-btns")}>
                        <div className={c("edit", "item")} onClick={() => edit(e)}>
                            编辑
                        </div>
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

    const chargePcsList: OptionType[] = []

    const [total, setTotal] = useState(0)
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const navigate = useNavigate()
    const [tableData, setTableData] = useState<TableHeader[]>([])
    const [modalTitle, setModalTitle] = useState<"新增" | "编辑">("新增")
    const [modalOpen, setModalOpen] = useState(false)
    const [formData] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string>()

    const search = async () => {
        setTableData([
            {
                id: nanoid(),
                img: ImgTest,
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

    const add = () => {
        modalTitle !== "新增" ? setModalTitle("新增") : null
        formData.resetFields()
        setModalOpen(true)
    }

    const edit = (e: TableHeader) => {
        modalTitle !== "编辑" ? setModalTitle("编辑") : null
        formData.setFieldsValue({
            portrait: e.img,
            name: e.name,
            identityId: e.idNumber,
            hjd: e.domicile,
            xzz: e.currentAddress,
            controlLevel: e.controlLevel,
            controlPcs: e.policeStation,
            controlMP: e.controlPolice
        })
        setModalOpen(true)
    }

    const modalConfirm = () => {
        setModalOpen(false)
    }

    const modalCancel = () => {
        setModalOpen(false)
    }

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader()
        reader.addEventListener("load", () => callback(reader.result as string))
        reader.readAsDataURL(img)
    }

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!")
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!")
        }
        return isJpgOrPng && isLt2M
    }

    const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === "uploading") {
            setLoading(true)
            return
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false)
                setImageUrl(url)
            })
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传</div>
        </div>
    )

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
                        <div className={c("item")}>
                            <div className={c("prefix")}>管控等级：</div>
                            <Select placeholder="请选择管控等级" options={chargeLevelList} />
                        </div>
                        <div className={c("item")}>
                            <div className={c("prefix")}>派出所：</div>
                            <Select placeholder="请选择派出所" options={chargeLevelList} />
                        </div>
                        <div className={c("item")}>
                            <div className={c("prefix")}>管控民警：</div>
                            <Input placeholder="请输入姓名" />
                        </div>
                    </div>
                    <div className={c("btns")}>
                        <Button type="primary">查询</Button>
                        <Button type="primary" onClick={add}>
                            新增
                        </Button>
                        <Button>导入</Button>
                    </div>
                </div>
                <Table dataSource={tableData} columns={columns} pagination={{ onChange: pgChange, total, pageSize }} />
            </div>
            <Modal title={modalTitle} open={modalOpen} onOk={modalConfirm} onCancel={modalCancel}>
                <Form labelCol={{ span: 4 }} form={formData}>
                    <Form.Item label="照片" name="portrait">
                        <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" beforeUpload={beforeUpload} onChange={handleChange}>
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="姓名" name="name">
                        <Input placeholder="请输入姓名" />
                    </Form.Item>
                    <Form.Item label="身份证号" name="identityId">
                        <Input placeholder="请输入身份证号" />
                    </Form.Item>
                    <Form.Item label="户籍地" name="hjd">
                        <Input placeholder="请输入户籍所在地" />
                    </Form.Item>
                    <Form.Item label="现住址" name="xzz">
                        <Input placeholder="请输入现住址" />
                    </Form.Item>
                    <Form.Item label="管控等级" name="controlLevel">
                        <Select placeholder="请选择管控等级" options={chargeLevelList} />
                    </Form.Item>
                    <Form.Item label="管控派出所" name="controlPcs">
                        <Select placeholder="请选择管控派出所" options={chargePcsList} />
                    </Form.Item>
                    <Form.Item label="管控民警" name="controlMP">
                        <Input placeholder="请输入管控民警" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default StabilityTable
