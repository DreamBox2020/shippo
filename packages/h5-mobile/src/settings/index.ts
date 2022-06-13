export const BASE_API = import.meta.env.VITE_BASE_API || ''

export const IS_DEV = import.meta.env.MODE === 'development'

export const IS_MINIPROGRAM = window.navigator.userAgent.includes('miniProgram')

console.log(import.meta)
