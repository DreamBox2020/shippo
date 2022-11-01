import axios, {
  AxiosStatic,
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
  AxiosResponse,
} from 'axios'
import { v4 as uuidv4 } from 'uuid'

export type HttpStatic = AxiosStatic
export type HttpInstance = AxiosInstance
export type HttpRequestConfig<D = any> = AxiosRequestConfig<D>
export type CreateHttpDefaults<D = any> = CreateAxiosDefaults<D>
export type HttpResponse<T = any, D = any> = AxiosResponse<T, D>

export interface RequestPacket<T = string> {
  passport: string
  session: string
  resource: T
  sign: string
  other: null
}

export interface ResponsePacket<T = string> {
  code: number
  message: string
  success: boolean
  session: string
  resource: T
  sign: string
  other: null
}

export const http: HttpStatic = axios

export class Request {
  public instance: HttpInstance

  public constructor(config?: CreateHttpDefaults) {
    this.instance = this.create(config)
  }

  public create(config?: CreateHttpDefaults) {
    const instance = http.create(config)
    this.init(instance)
    return instance
  }

  public init(http: HttpInstance) {
    http.interceptors.request.use(
      (request) => {
        if (request.data === undefined) {
          request.data = {}
        }
        if (
          request.data &&
          Object.prototype.toString.call(request.data) === '[object Object]'
        ) {
          request.data = {
            passport: localStorage.getItem('__PASSPORT'),
            session: uuidv4(),
            resource: JSON.stringify(request.data),
            sign: '',
            other: null,
          }
        }
        return request
      },
      (error) => {
        console.error(error)
        return Promise.reject(error)
      }
    )

    http.interceptors.response.use(
      (response: HttpResponse<ResponsePacket>) => {
        if (
          response.data &&
          Object.prototype.toString.call(response.data) === '[object Object]'
        ) {
          if (!response.data.success) {
            console.error(response.data)
            return Promise.reject(response)
          }
          try {
            response.data.resource = JSON.parse(response.data.resource)
          } catch (error) {
            console.error(error)
            console.error(response.data)
            return Promise.reject(response)
          }
        }
        return response
      },
      (error) => {
        console.error(error)
        return Promise.reject(error)
      }
    )
  }

  public request<
    Req = any,
    Resp = any,
    ReqPacket = RequestPacket,
    RespPacket = ResponsePacket<Resp>
  >(config: HttpRequestConfig<Req>) {
    return this.instance.request<
      RespPacket,
      HttpResponse<RespPacket, ReqPacket>,
      Req
    >(config)
  }
}
