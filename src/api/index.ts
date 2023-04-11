import { message } from "antd"
import axios, { AxiosHeaders, AxiosRequestConfig, Method, RawAxiosRequestHeaders } from "axios"

type MethodsHeaders = Partial<{
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & {common: AxiosHeaders}>;

type GetAxiosConfig<T extends UrlList> = {
    url: T
    baseURL: string
    method: "GET" | "POST" | "DELETE" | "PUT"
    responseType?: string
    headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
} & (T extends keyof RequestQuery ? { query: RequestQuery[T] } : {}) &
    (T extends keyof RequestData ? { data: RequestData[T] } : {}) &
    (IsParams<T> extends true ? { params: Record<GetParamsList<T>, string> } : {})

export async function request<T extends UrlList>(config: GetAxiosConfig<T> ): Promise<ResponseResult[T] | null> {
    try {
        const Token = sessionStorage.getItem("token")
        if (config.headers && Token) {
            config.headers.Authorization = Token
            console.log(config);
        }
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
