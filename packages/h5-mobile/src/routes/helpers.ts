import React from 'react'
import { RouteObject } from 'react-router-dom'

import { withPermission } from '~/components/permission'
import { factory, loadable } from '~/components/loading-hoc'

export class Route {
  private path: string
  private element: React.ReactElement
  private children: Route[]

  public constructor(path: string, element: React.ReactElement) {
    this.path = path
    this.element = element
    this.children = []
  }

  public withPermission(accessRule: string) {
    this.element = withPermission(accessRule, this.element)
    return this
  }

  public childrenRoute(route: Route) {
    this.children.push(route)
    return this
  }

  public toRouteObject(): RouteObject {
    return {
      path: this.path,
      element: this.element,
      children: this.children.map((_) => _.toRouteObject()),
    }
  }
}

export class LazyRoute extends Route {
  public constructor(
    path: string,
    factory: factory,
    fallback?: React.ReactNode
  ) {
    super(path, loadable(factory, fallback))
  }
}
