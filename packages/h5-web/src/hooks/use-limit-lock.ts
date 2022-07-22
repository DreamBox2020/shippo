import { useRef, useCallback } from 'react'

const nowTime = () => Math.floor(new Date().getTime() / 1000)

/**
 * 时限锁
 * @param fn1 主函数
 * @param fn2 当主函数在时限内，调用的副函数
 * @param limit 时限，单位秒
 * @returns
 */
export const useLimitLock = <P extends any[] = any[], V extends any = any>(
  fn1: (...args: P) => V,
  fn2: (...args: P) => V,
  limit: number
) => {
  const ref = useRef(0)

  return useCallback(
    async (...args: P) => {
      const now = nowTime()
      const timeout = ref.current
      if (now - timeout > limit) {
        ref.current = now
        return fn1(...args)
      } else {
        return fn2(...args)
      }
    },
    [fn1, fn2, limit]
  )
}
