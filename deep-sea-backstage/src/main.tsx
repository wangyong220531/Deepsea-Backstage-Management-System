import { ConfigProvider } from "antd"
import ReactDOM from "react-dom/client"
import App from "./App"
import "dayjs/locale/zh-cn"
import zh_CN from "antd/locale/zh_CN"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ConfigProvider locale={zh_CN}>
        <App />
    </ConfigProvider>
)
