/**
 * 检查手机号是否合规
 * @param phone
 * @returns
 */
export const checkPhone = (phone: string) => {
  const list = [
    // 移动
    // '134', // 0～8
    '135',
    '136',
    '137',
    '138',
    '139',
    '147', // 数据卡
    // '148', // 数据卡
    '150',
    '151',
    '152',
    '157', // 固话卡
    '158',
    '159',
    // '172', // 数据卡
    '178',
    '182',
    '183',
    '184',
    '187',
    '188',
    '195',
    '197',
    '198',
    // 联通
    '130',
    '131',
    '132',
    // '145', // 数据卡
    // '146', // 数据卡
    '155',
    '156',
    '166',
    // '171', // 副号卡
    '175',
    '176',
    '185',
    '186',
    '196',
    //电信
    '133',
    // '149', // 数据卡
    '153',
    '173',
    '177',
    '180',
    '181',
    '189',
    '190',
    '191',
    '193',
    '199',
  ]

  // 如果不是1～9开头，且不是11位数字
  if (!/^[1-9][0-9]{10}$/.test(phone)) {
    return false
  }

  // 如果是134开头，且第四位在0～8之间
  if (/^134[0-8]/.test(phone)) {
    return true
  }

  // 循环判断开头
  for (const val of list) {
    if (phone.startsWith(val)) return true
  }

  return false
}

/**
 * 检查短信验证码是否合规
 * @param code
 * @returns
 */
export const checkSmsCode = (code: string) => {
  return /^[1-9][0-9]{5}$/.test(code)
}

/**
 * 检查QQ号是否合规
 * @param code
 * @returns
 */
export const checkQQ = (qq: string) => {
  return /^[1-9][0-9]{4,9}$/.test(qq)
}

/**
 * 检查QQ邮箱是否合规
 * @param code
 * @returns
 */
export const checkQQEmail = (email: string) => {
  return /^[1-9][0-9]{4,9}@qq\.com$/.test(email)
}
