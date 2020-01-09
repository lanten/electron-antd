import { connect } from 'react-redux'

/**
 * 挂载 Redux Store
 * @param options
 * @param mapStates
 */
export function withStore(
  options: React.ComponentClass<any> | (StoreStateKeys | AliasStates)[] | AliasStates,
  mapStates?: (states: StoreStates) => any
): any {
  if (options instanceof Function) {
    return connect(mapStates ?? (states => states), dispatch => new Object({ dispatch }))(options)
  } else {
    return function(Component: React.ComponentClass<any>) {
      return connect(
        mapStates ??
          ((states: StoreStates) => {
            const resState = {}
            if (options instanceof Array) {
              options.forEach(val => {
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
          }),
        dispatch => new Object({ dispatch })
      )(Component)
    }
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
