import { message } from "antd"
import axios from "axios"

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

type GetAxiosConfig<T extends UrlList> = {
    url: T
    baseURL: string
    method: "GET" | "POST" | "DELETE" | "PUT"
    responseType?: string
} & (T extends keyof RequestQuery ? { query: RequestQuery[T] } : {}) &
    (T extends keyof RequestData ? { data: RequestData[T] } : {}) &
    (IsParams<T> extends true ? { params: Record<GetParamsList<T>, string> } : {})

export async function request<T extends UrlList>(config: GetAxiosConfig<T>): Promise<ResponseResult[T] | null> {
    try {
        const { method, baseURL } = config
        const data = config["data" as keyof GetAxiosConfig<T>] as T extends keyof RequestData ? RequestData[T] : undefined
        const params = config["query" as keyof GetAxiosConfig<T>] as T extends keyof RequestQuery ? RequestQuery[T] : undefined
        const param = config["params" as keyof GetAxiosConfig<T>] as IsParams<T> extends true ? Record<GetParamsList<T>, string> : undefined
        let url: string = config.url
        if (url.includes(":") && param) {
            Object.keys(param).forEach(key => {
                url = url.replace(`:${key}`, param[key as GetParamsList<T>])
            })
        }
        const response = await axios({ url, method, baseURL, params, data }) 
        if (!response.data.success) {
            message.warning(response.data.message)
            return null
        }
        return response.data
    } catch (error) {
        console.log(error)
    }
    return null
}

export const baseURL = "http://32.118.0.6:8989"
