import { useLocation } from "react-router-dom"
import DutyManage from "../DutyManage"
import DutyAnanlysis from "../DutyAnanlysis"

const Tekken: React.FC = () => {
    const location = useLocation()
    const item: string = location.pathname.split("/")[3]
    return <>{item === "dutyManage" ? <DutyManage /> : <DutyAnanlysis />}</>
}

export default Tekken
