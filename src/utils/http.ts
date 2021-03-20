import { v4 as uuidv4 } from 'uuid'

export type body = FormData | string | null

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

  public send<T = any>(body?: body) {
    return new Promise<{ response: Response; result: T }>((resolve, reject) => {
      if (!this.options.url) {
        throw new Error('fetch: url is undefined')
      }
      fetch(this.options.url, {
        method: this.options.method,
        headers: this.options.headers,
        body: body === undefined ? this.options.body : body,
      }).then((response) => {
        if (this.options.responseType === 'json') {
          response.json().then((result: T) => {
            resolve({
              result,
              response,
            })
          })
        }
      })
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

export const createRequestPack = (rawResource: any): string => {
  return JSON.stringify({
    passport: localStorage.getItem('__PASSPORT'),
    session: uuidv4(),
    resource: JSON.stringify(rawResource),
    sign: '',
    other: null,
  })
}
