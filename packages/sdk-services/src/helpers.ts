import {
  Request,
  HttpRequestConfig,
  HttpResponse,
  RequestPacket,
  ResponsePacket,
} from '@shippo/sdk-utils'

export { RequestPacket, ResponsePacket } from '@shippo/sdk-utils'

export const request = new Request({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface RequestOptions<D> extends HttpRequestConfig<D> {
  url: string
  method: 'GET' | 'POST'
}

export const createAPI =
  <Req, Resp, ReqPacket = RequestPacket, RespPacket = ResponsePacket<Resp>>(
    config: RequestOptions<Req>
  ) =>
  (data: Req): Promise<HttpResponse<RespPacket, ReqPacket>> => {
    config.data = data
    return request.request<Req, Resp, ReqPacket, RespPacket>(config)
  }
