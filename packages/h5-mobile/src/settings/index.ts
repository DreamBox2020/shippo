export const BASE_API = import.meta.env.VITE_BASE_API || ''

export const IS_DEV = import.meta.env.MODE === 'development'

export const IS_MINIPROGRAM = window.navigator.userAgent.includes('miniProgram')

export const OFFIACCOUNT_APP_ID = import.meta.env.VITE_OFFIACCOUNT_APP_ID || ''

console.log(import.meta)
