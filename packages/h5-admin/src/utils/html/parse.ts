export interface Attr {
  name: string
  value: string
}

export interface Node {
  nodeName: string
  nodeValue: string
  childNodes: Node[]
  parentElement: Element
  parentNode: Node
}

export interface Element extends Node {
  tagName: string
  attributes: Attr[]
  children: Element[]
}

// 兼容性函数集,为了方便迁移到golang而抽离出来的。
function slice(str: string, start: number, end: number): string {
  return str.slice(start, end)
}

function charAt(str: string, pos: number): string {
  return str.charAt(pos)
}

function indexOf(str: string, searchValue: string, fromIndex: number): number {
  return str.indexOf(searchValue, fromIndex)
}

function split(str: string, separator: string): string[] {
  return str.split(separator)
}

function trim(str: string): string {
  return str.trim()
}

function isTagName(str: string): boolean {
  return /^[a-zA-Z]/.test(str)
}

function isClosing(html: string): boolean {
  return slice(html, 0, 2) === '</'
}

function isWhiteSpace(str: string): boolean {
  const charList = split(str, '')
  for (let index = 0; index < charList.length; index++) {
    const char = charList[index]
    if (trim(char) !== '') {
      return false
    }
  }
  return true
}

export const parseFragment = (html: string): Element => {
  html = '<root>' + html + '</root>'
  const charList = split(html, '')

  let tagStart = -1
  let tagEnd = -1
  let quoteStart = -1
  let quoteType = ''
  let attrStart = -1
  let attrName = ''
  let tagName = ''
  let closing = false

  for (let currentPos = 0; currentPos < charList.length; currentPos++) {
    const char = trim(charList[currentPos])

    console.log(`==========>pos:${currentPos}, chat:|${char}|, attrStart:${attrStart}, `)

    switch (char) {
      case '<':
        // 如果在引号内，那么无视
        if (quoteStart !== -1) {
          continue
        }

        // 如果在标签内，出现了<,就忽略 （不能使用该判断，因为tagEnd默认等于-1，会造成第一次判断出错。）
        // if (tagEnd === -1) {
        //   continue
        // }

        // 如果在标签内，出现了<,就忽略
        if (tagStart !== -1) {
          continue
        }

        // 获取 左尖括号后面 的第一个字符
        let nextChar = charAt(html, currentPos + 1)
        // 如果，字符为斜杠，则获取 左尖括号后面 的第二个字符
        if (nextChar === '/') {
          nextChar = charAt(html, currentPos + 2)
        }
        // 如果字符，不符合作为标签名的规则，就跳过
        if (!isTagName(nextChar)) {
          continue
        }

        // 记录标签开始位置
        tagStart = currentPos

        // 如果存在上次标签结束的位置，那么截取text内容
        if (tagEnd !== -1) {
          const currentText = slice(html, tagEnd + 1, tagStart)
          console.log({ currentText, tagEnd, tagStart })
        }

        // 删除标签结束位置
        tagEnd = -1

        break

      case '>':
        // 如果在引号内，那么无视
        if (quoteStart !== -1) {
          continue
        }

        // 如果不在标签内，那么无视
        if (tagStart === -1) {
          continue
        }

        // 记录标签结束位置
        tagEnd = currentPos
        // 如果存在上次标签开始的位置，那么截取tag内容
        if (tagStart !== -1) {
          const currentTag = slice(html, tagStart, tagEnd + 1)
          // 是否为标签的尾部
          closing = isClosing(currentTag)
          console.log({ currentTag, tagStart, tagEnd, closing })
        }

        // 删除标签开始位置
        tagStart = -1

        // // 截取attrValue
        // const attrValue = slice(html, attrStart + 1, currentPos + 1)
        // console.log({ attrName, attrValue })
        // // 记录attr位置
        // attrStart = currentPos
        // // 清除attrName
        // attrName = ''

        // // 删除attr位置
        // attrStart = -1

        break

      case '=':
        // 如果在引号内，那么无视
        if (quoteStart !== -1) {
          continue
        }

        // 如果在标签内
        if (tagStart !== -1) {
          // 如果已经进入attr，那么开始获取attrName
          if (attrStart !== -1) {
            attrName = slice(html, attrStart + 1, currentPos)
            console.log({ attrName })
            // 记录attr位置
            attrStart = currentPos
          } else {
          }
        }
        break

      case '"':
      case "'":
        // 如果不在attr内，便无视
        if (attrStart === -1) {
          continue
        }

        // 如果在引号内
        if (quoteStart !== -1) {
          // 且 当前字符 与 开头的引号 一致
          if (char === quoteType) {
            // 删除引号位置
            quoteStart = -1

            // 截取attrValue
            const attrValue = slice(html, attrStart + 1, currentPos + 1)
            console.log({ attrName, attrValue })
            // 记录attr位置
            attrStart = currentPos
            // 清除attrName
            attrName = ''
          }
        } else {
          quoteStart = currentPos
          quoteType = char
        }

        break

      case '':
        // 如果在引号内，那么无视
        if (quoteStart !== -1) {
          continue
        }

        // 如果在标签内
        if (tagStart !== -1) {
          // 如果没有进入attr，那么开始获取tagName
          if (attrStart === -1) {
            // tagName一定会有，不然<会被无视
            tagName = slice(html, tagStart + 1, currentPos)
            console.log({ tagName })
            // 记录attr位置
            attrStart = currentPos
          } else {
            // 截取attrValue
            const attrValue = slice(html, attrStart + 1, currentPos + 1)
            console.log({ attrName, attrValue })
            // 记录attr位置
            attrStart = currentPos
            // 清除attrName
            attrName = ''
          }
        }
        break

      default:
    }
  }
  return {} as any
}
