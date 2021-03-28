import { v4 as uuidv4 } from 'uuid'

class InterceptorManager<V> {
  private handlers: any[] = []

  public use(fulfilled?: (value: V) => V | Promise<V>, rejected?: (error: any) => any): number {
    this.handlers.push({
      fulfilled,
      rejected,
    })
    return this.handlers.length - 1
  }

  public eject(id: number) {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }
}

export interface IHttpTransformer {
  (data: any, headers?: any): any
}
export interface IHttpRequestConfig {
  url?: string
  method?: 'POST' | 'GET'
  baseURL?: string
  transformRequest?: IHttpTransformer[]
  transformResponse?: IHttpTransformer[]
  headers?: any
  params?: any
  data?: any
  timeout?: number
  responseType?: 'json'
}

export interface IHttpResponse<T = any> {
  config: IHttpRequestConfig
  request: Request
  response: Response
  data: T
}

const defaults: IHttpRequestConfig = {
  url: '',
  method: 'GET',
  baseURL: '',
  headers: {},
  responseType: 'json',
  transformRequest: [
    (data: any) => {
      return JSON.stringify(data)
    },
  ],
  transformResponse: [],
}

export class Http {
  public interceptors = {
    request: new InterceptorManager<IHttpRequestConfig>(),
    response: new InterceptorManager<IHttpResponse>(),
  }

  public defaults: IHttpRequestConfig

  public constructor(config: IHttpRequestConfig = {}) {
    this.defaults = this.mergeConfig(defaults, config)
  }

  public send<T = any>(config: IHttpRequestConfig = {}) {
    return new Promise<IHttpResponse<T>>((resolve, reject) => {
      config = this.mergeConfig(this.defaults, config)

      if (config.transformRequest) {
        config.data = config.transformRequest.reduce(
          (data, fn) => fn(data, config.headers),
          config.data
        )
      }

      fetch(this.buildURL(config.url, config.params), {
        method: config.method,
        headers: config.headers,
        body: config.data,
      }).then(
        (response) => {
          // if (this.config.responseType === 'json') {
          //   response.json().then((pack: IResponsePack) => {
          //     if (pack.resource === '') {
          //       return resolve({
          //         pack,
          //         response,
          //         resource: (pack.resource as unknown) as T,
          //       })
          //     } else {
          //       try {
          //         const resource = JSON.parse(pack.resource)
          //         return resolve({
          //           pack,
          //           response,
          //           resource,
          //         })
          //       } catch (error) {
          //         return reject('fetch: Resource is not JSON')
          //         // throw new Error('fetch: Resource is not JSON')
          //       }
          //     }
          //   })
          // }
        },
        (reason) => {}
      )
    })
  }

  public buildURL(url: string = '', params: any): string {
    if (!params) return url

    const parts = []
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key]
        parts.push(key + '=' + value)
      }
    }
    return url + '?' + parts.join('&')
  }

  private static config: IHttpRequestConfig

  public static setconfig(config: IHttpRequestConfig) {
    Http.config = config
  }

  public mergeConfig(o1: IHttpRequestConfig, o2: IHttpRequestConfig): IHttpRequestConfig {
    let o = { ...o1, ...o2 }
    if (o1.headers && o2.headers) {
      o.headers = { ...o1.headers, ...o2.headers }
    }
    return o
  }
}

Http.setconfig({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
})

export interface IRequestPack {
  passport: string
  session: string
  resource: string
  sign: string
  other: null
}

export interface IResponsePack {
  code: number
  message: string
  success: boolean
  session: string
  resource: string
  sign: string
  other: null
}

export const createRequestPack = (rawResource?: any): string => {
  return JSON.stringify({
    passport: localStorage.getItem('__PASSPORT'),
    session: uuidv4(),
    resource: rawResource === undefined ? '' : JSON.stringify(rawResource),
    sign: '',
    other: null,
  })
}
