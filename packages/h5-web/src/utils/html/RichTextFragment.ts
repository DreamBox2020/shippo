import * as parse5 from 'parse5'

export interface Attribute {
  name: string
  value: string
}

export interface Element {
  tagName: string
  attrs: Attribute[]
  childNodes: ChildNode[]
}

export interface CommentNode {
  nodeName: '#comment'
  data: string
}

export interface TextNode {
  nodeName: '#text'
  value: string
}

export type ChildNode = TextNode | Element | CommentNode

export interface DocumentFragment {
  nodeName: '#document-fragment'
  childNodes: ChildNode[]
}

const toElement = (element: parse5.Element): Element => {
  return {
    tagName: element.tagName,
    attrs: element.attrs.map((attr) => ({
      name: attr.name,
      value: attr.value,
    })),
    childNodes: element.childNodes.map(toChildNode),
  }
}

const toCommentNode = (comment: parse5.CommentNode): CommentNode => {
  return {
    nodeName: '#comment',
    data: comment.data,
  }
}

const toTextNode = (text: parse5.TextNode): TextNode => {
  return {
    nodeName: '#text',
    value: text.value,
  }
}

const toChildNode = (node: parse5.ChildNode): ChildNode => {
  if ('data' in node) return toCommentNode(node)
  if ('value' in node) return toTextNode(node)
  return toElement(node)
}

const toDocumentFragment = (
  fragment: parse5.DocumentFragment
): DocumentFragment => {
  return {
    nodeName: '#document-fragment',
    childNodes: fragment.childNodes.map(toChildNode),
  }
}

export const parseFragment = (html: string): DocumentFragment => {
  return toDocumentFragment(parse5.parseFragment(html))
}

const toParse5Element = (
  element: Element,
  parent: parse5.ParentNode
): parse5.Element => {
  const ele: parse5.Element = {
    nodeName: element.tagName,
    tagName: element.tagName,
    namespaceURI: 'http://www.w3.org/1999/xhtml',
    attrs: element.attrs,
    childNodes: [],
    parentNode: parent,
  }
  ele.childNodes = element.childNodes.map((node) =>
    toParse5ChildNode(node, ele)
  )
  return ele
}

const toParse5CommentNode = (
  comment: CommentNode,
  parent: parse5.ParentNode
): parse5.CommentNode => {
  return {
    nodeName: '#comment',
    data: comment.data,
    parentNode: parent,
  }
}

const toParse5TextNode = (
  text: TextNode,
  parent: parse5.ParentNode
): parse5.TextNode => {
  return {
    nodeName: '#text',
    value: text.value,
    parentNode: parent,
  }
}

const toParse5ChildNode = (
  node: ChildNode,
  parent: parse5.ParentNode
): parse5.ChildNode => {
  if ('nodeName' in node) {
    if (node.nodeName === '#comment') {
      return toParse5CommentNode(node, parent)
    }
    if (node.nodeName === '#text') {
      return toParse5TextNode(node, parent)
    }
  }
  return toParse5Element(node, parent)
}

const toParse5DocumentFragment = (
  fragment: DocumentFragment
): parse5.DocumentFragment => {
  const doc: parse5.DocumentFragment = {
    nodeName: '#document-fragment',
    childNodes: [],
  }
  doc.childNodes = fragment.childNodes.map((node) =>
    toParse5ChildNode(node, doc)
  )
  return doc
}

export const serialize = (fragment: DocumentFragment): string => {
  return parse5.serialize(toParse5DocumentFragment(fragment))
}

const childNodesToString = (childNodes: Array<ChildNode>): string => {
  const str = childNodes.reduce((text: string, node: ChildNode) => {
    if ('nodeName' in node) {
      if (node.nodeName === '#text') {
        return text + ' ' + node.value
      }
      return text
    }
    return childNodesToString(node.childNodes)
  }, '')

  return str.replace(/\s+/g, ' ').trim()
}

export const serializeToText = (fragment: DocumentFragment): string => {
  return childNodesToString(fragment.childNodes)
}

export type EntityParse = (data: any) => string

export interface RawEntity<T = { [key: string]: any }> {
  type: string
  data: T
}

export class RichTextFragment {
  private entityParseMap: { [key: string]: EntityParse } = {}
  private entityMap: { [key: string]: RawEntity } = {}

  public constructor(
    entityParseMap: { [key: string]: EntityParse },
    entityMap: { [key: string]: RawEntity }
  ) {
    this.entityParseMap = entityParseMap
    this.entityMap = entityMap
  }

  public addEntity(type: string, data: any): string {
    const maxKey = Math.max(
      ...Object.keys(this.entityMap).map((key) => parseInt(key))
    )
    const key = (maxKey + 1).toString()
    this.entityMap[key] = { type, data }
    return ''
  }

  /**
   * 注册实体解析函数
   * @param type
   * @param parse
   */
  public registerEntityParse(type: string, parse: EntityParse) {
    this.entityParseMap[type] = parse
  }

  private entityParse(type: string, data: any): string {
    if (this.entityParseMap[type]) {
      return this.entityParseMap[type](data)
    }
    return ''
  }

  private entitySerialize(key: string): Element {
    return {
      tagName: 'entity',
      attrs: [{ name: 'key', value: key }],
      childNodes: [],
    }
  }

  private childNodesParse(childNodes: Array<ChildNode>): Array<ChildNode> {
    return childNodes
      .map<ChildNode>((node) => {
        if ('tagName' in node) {
          if (node.tagName === 'entity') {
            const key = node.attrs.find((attr) => attr.name === 'key')
            if (key) {
              const entity = this.entityMap[key.value]
              if (entity) {
                const html = this.entityParse(entity.type, entity.data)
                if (html) {
                  const tree = parseFragment(html)
                  return tree.childNodes[0]
                }
              }
            }
            return null as any
          }
        }
        return node
      })
      .filter(Boolean)
  }

  private childNodesSerialize(childNodes: Array<ChildNode>): Array<ChildNode> {
    return childNodes
      .map((node) => {
        if ('tagName' in node) {
          const key = node.attrs.find((attr) => attr.name === 'data-entity-key')
          if (key) {
            const entity = this.entityMap[key.value]
            if (entity) {
              if (key) return this.entitySerialize(key.value)
            }
          }
          return null as any
        }
        return node
      })
      .filter(Boolean)
  }

  /**
   * 将储存用的html转换为展示用的html的结构树
   * @param html
   * @returns
   */
  public parseToTree(html: string): DocumentFragment {
    let tree = parseFragment(html)
    tree.childNodes = this.childNodesParse(tree.childNodes)
    return tree
  }

  /**
   * 将储存用的html转换为展示用的html
   * @param html
   * @returns
   */
  public parseToHtml(html: string): string {
    let tree = parseFragment(html)
    tree.childNodes = this.childNodesParse(tree.childNodes)
    return serialize(tree)
  }

  /**
   * 将展示用的html的结构树转换为储存用html
   * @param fragment
   * @returns
   */
  public serialize(fragment: DocumentFragment): string {
    fragment.childNodes = this.childNodesSerialize(fragment.childNodes)
    return serialize(fragment)
  }
}

// <entity key="0" />
// <img src="图片地址" data-entity-key="0" />
const a: RawEntity = {
  type: 'Image',
  data: {
    id: '图片序号',
    src: '图片地址',
  },
}

// <entity key="1" />
// <a href="链接地址" data-entity-key="1" >@xxx</a>
const b: RawEntity = {
  type: 'Mentions',
  data: {
    uid: '用户序号',
    href: '链接地址',
  },
}

const c: RawEntity = {
  type: 'Emoji',
  data: {
    id: '用户序号',
  },
}

const richTextFragment = new RichTextFragment(
  {
    Emoji: (data: any) => {
      return `<img src="" />`
    },
  },
  {}
)

const win = window as any

win.parseFragment = parseFragment
win.serialize = serialize
win.RichTextFragment = RichTextFragment
win.richTextFragment = richTextFragment
