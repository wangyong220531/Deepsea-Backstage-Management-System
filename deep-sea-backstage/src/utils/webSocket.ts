import { message } from "antd"

export const websocket = (props: string) => {
    if ("WebSocket" in window) {
        const ws = new WebSocket("ws://32.118.0.6:8989/ws-alarm")
        ws.onopen = () => {
            ws.send(props)
            console.log("websocket连接成功！")
        }
        ws.onmessage = e => {
            if (e.data === "您的账户已在别处登录") {
                message.warning("您的账户已在别处登录!")
                sessionStorage.setItem("isDeferIP", "yes")
            }
        }
        ws.onclose = () => {
            console.log("websocket连接已断开！")
        }
        ws.onerror = () => {
            console.log("websocket连接出错！")
        }
    } else {
        console.log("您的浏览器不支持websocket")
    }
}
