import { connect, MapStateToPropsParam } from 'react-redux'

export type MapStateList = (StoreStateKeys | AliasStates)[] | AliasStates

/**
 * 挂载 Redux Store
 * @param options
 * @param mapStates
 */
export function withStore(options: MapStateList): any {
  return connect(mapStates(options), (dispatch: any) => new Object({ dispatch }), undefined, {
    forwardRef: true,
  })
}

export function mapStates(options: MapStateList): MapStateToPropsParam<unknown, unknown, StoreStates> {
  return (states: StoreStates) => {
    const resState = {}
    if (options instanceof Array) {
      options.forEach((val) => {
        if (typeof val === 'string') {
          resState[val] = states[val]
        } else {
          Object.assign(resState, mapAliasStates(val, states))
        }
      })
    } else {
      Object.assign(resState, mapAliasStates(options, states))
    }
    return resState
  }
}

function mapAliasStates(alias: AliasStates, states: StoreStates) {
  const resState = {}

  for (const key in alias) {
    const statesKey = alias[key]
    resState[key] = states[statesKey]
  }

  return resState
}
