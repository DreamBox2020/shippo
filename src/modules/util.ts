type Action<S> = {
  type: string
  namespace: string
  action: (store: S) => Partial<S>
}

export const createAction = <S extends {}>(namespace: string) => {
  return <T extends (...args: any[]) => Partial<S> | ((store: S) => Partial<S>)>(handel: T) => {
    return (...args: Parameters<T>): Action<S> => {
      const r = handel(...args)
      const action: (store: S) => Partial<S> = typeof r === 'function' ? r : () => r

      return {
        type: '@@ACTION',
        namespace,
        action,
      }
    }
  }
}

export const reducer = <S extends {}>(namespace: string) => (_store: S) => {
  return (store: S = _store, action: Action<S>) => {
    console.log(_store, store, action)
    return action.namespace === namespace ? { ...store, ...action.action(store) } : store
  }
}

// type ct<M> = M extends {
//   [P in keyof M]: infer R
// }
//   ? { [key in keyof M]: (s: R, a: Action<M>) => R }
//   : string

type ct<T> = {
  [P in keyof T]: (s: T[P] | undefined, a: Action<T>) => T[P]
}

export const createReducer = <S extends {}>(a: S) => {
  const b: any = {}
  for (const key in a) {
    if (Object.prototype.hasOwnProperty.call(a, key)) {
      const element = a[key]
      b[key] = reducer<S[keyof S]>(key)(element)
    }
  }
  return b as ct<S>
}
