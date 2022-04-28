/**
 * 判断是否拥有权限
 * @param to 要访问的地址
 * @returns
 */
export const hasAccess = (to: string): boolean => {
  if (!to) return false

  // 前端页面
  if (to[0] === ':') {
  }

  return true
}

function keyMatch2(key1: string, key2: string): boolean {
  key2 = key2.replace(/\/\*/g, '/.*')

  const regexp = new RegExp(/(.*):[^/]+(.*)/g)
  for (;;) {
    if (!key2.includes('/:')) {
      break
    }
    key2 = key2.replace(regexp, '$1[^/]+$2')
  }

  if (key2 === '*') {
    key2 = '(.*)'
  }
  return regexMatch(key1, '^' + key2 + '$')
}

function regexMatch(key1: string, key2: string): boolean {
  return new RegExp(key2).test(key1)
}
