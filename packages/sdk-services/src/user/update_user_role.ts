import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: number
  role: number
}

interface IResponseResource {}

export const update_user_role = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/user/updateUserRole',
    method: 'POST',
    data,
  })
