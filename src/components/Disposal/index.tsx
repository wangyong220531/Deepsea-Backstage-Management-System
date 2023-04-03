import { useLocation } from "react-router-dom"
import Follow from "../Follow"
import Lib from "../Lib"
import Analysis from "../Analysis"

const Disposal: React.FC = () => {
    const location = useLocation()
    const item: string = location.pathname.split("/")[3]
    
    return <>{item === "follow" ? <Follow /> : item === "lib" ? <Lib /> : <Analysis />}</>
}
export default Disposal
