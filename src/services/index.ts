import axios from 'axios'
import { BASE_API } from '~/settings'
import { v4 as uuidv4 } from 'uuid'

import * as passport from './passport'
import * as sms from './sms'
import * as user from './user'

export const services = { passport, sms, user }

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

export const request = axios.create({
  baseURL: BASE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use((request) => {
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
})

request.interceptors.response.use((response) => {
  if (response.data && Object.prototype.toString.call(response.data) === '[object Object]') {
    try {
      response.data.resource = JSON.parse(response.data.resource)
    } catch (error) {
      console.error(error)
    }
  }
  return response
})
