import { v4 as uuidv4 } from 'uuid'

export type body = FormData | string | null

export interface HttpResult<T> {
  response: Response
  pack: IResponsePack
  resource: T
}

export interface IHttpOptions {
  url?: string
  method?: 'POST' | 'GET'
  headers?: { [key: string]: string }
  body?: body
  responseType?: 'json'
}

export class Http {
  private options: IHttpOptions

  public constructor(options: IHttpOptions = {}) {
    this.options = Http.mergeOptions(Http.globalOptions, options)
  }

  public send<T = ''>(body?: body) {
    return new Promise<HttpResult<T>>((resolve, reject) => {
      if (!this.options.url) {
        reject('fetch: URL is not defined')
        // throw new Error('fetch: URL is not defined')
      } else {
        fetch(this.options.url, {
          method: this.options.method,
          headers: this.options.headers,
          body: body === undefined ? this.options.body : body,
        }).then((response) => {
          if (this.options.responseType === 'json') {
            response.json().then((pack: IResponsePack) => {
              if (pack.resource === '') {
                resolve({
                  pack,
                  response,
                  resource: (pack.resource as unknown) as T,
                })
              } else {
                try {
                  const resource = JSON.parse(pack.resource)
                  resolve({
                    pack,
                    response,
                    resource,
                  })
                } catch (error) {
                  reject('fetch: Resource is not JSON')
                  // throw new Error('fetch: Resource is not JSON')
                }
              }
            })
          }
        })
      }
    })
  }

  private static globalOptions: IHttpOptions

  public static setGlobalOptions(globalOptions: IHttpOptions) {
    Http.globalOptions = globalOptions
  }

  public static mergeOptions(o1: IHttpOptions, o2: IHttpOptions): IHttpOptions {
    let o = { ...o1, ...o2 }
    if (o1.headers && o2.headers) {
      o.headers = { ...o1.headers, ...o2.headers }
    }
    return o
  }
}

Http.setGlobalOptions({
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

// const res = {
//   code: 0,
//   message: 'OK',
//   success: true,
//   session: '7ac11034-bc80-4859-882e-5ffe274a67e2',
//   resource: '{"passport":"c4ca754ac1e74069a7d5f5c7d081cd2a","uid":0}',
//   sign: '',
//   other: null,
// }
