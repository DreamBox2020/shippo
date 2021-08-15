import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { v4 as uuidv4 } from 'uuid'

export type Http = AxiosInstance
export type HttpRequestConfig = AxiosRequestConfig
export type HttpResponse<T = any> = AxiosResponse<T>

export interface RequestPack<T = string> {
  passport: string
  session: string
  resource: T
  sign: string
  other: null
}

export interface ResponsePack<T = string> {
  code: number
  message: string
  success: boolean
  session: string
  resource: T
  sign: string
  other: null
}

export class Request {
  public http: Http
  public constructor(config?: HttpRequestConfig) {
    this.http = this.create(config)
  }
  public create(config?: HttpRequestConfig) {
    const http = axios.create(config)
    this.init(http)
    return http
  }
  public init(http: Http) {
    http.interceptors.request.use(
      (request) => {
        if (request.data && Object.prototype.toString.call(request.data) === '[object Object]') {
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
        return Promise.reject(error)
      }
    )

    http.interceptors.response.use(
      (response: HttpResponse<ResponsePack>) => {
        if (response.data && Object.prototype.toString.call(response.data) === '[object Object]') {
          if (!response.data.success) {
            console.error(response.data)
            return Promise.reject(response)
          }
          try {
            response.data.resource = JSON.parse(response.data.resource)
          } catch (error) {
            console.error(response.data)
            console.error(error)
            return Promise.reject(response)
          }
        }
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
  public request<T = any>(config: HttpRequestConfig) {
    return this.http.request<T, HttpResponse<T>>(config)
  }
}
