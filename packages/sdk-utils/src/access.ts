/**
 * 判断是否含有该权限
 * @param rule 权限规则
 * @param access 权限列表
 * @returns
 */
export const hasAccess = (rule: string, access: string[]): boolean => {
  const key1 = rule.toLowerCase()
  console.log('hasAccess->key1:', key1)
  return access.some((acc) => {
    const key2 = acc.toLowerCase()
    console.log('hasAccess->key2:', key2)
    const tag = keyMatch2(key1, key2)
    console.log('hasAccess->tag:', tag)
    return tag
  })
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
