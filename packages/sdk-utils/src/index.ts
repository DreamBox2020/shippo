import moment from 'moment'

export * from './request'
export * from './checks'

export const formatTimeStr = (t: string) => {
  return moment(t).format('YYYY-MM-DD HH:mm:ss')
}
