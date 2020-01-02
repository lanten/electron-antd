import { connect } from 'react-redux'

/**
 * 挂载 Redux Store
 * @param options
 */
export function withStore(options: React.ComponentClass<any> | WithStoreOptions | StoreStateKeys[]): any {
  if (options instanceof Function) {
    return connect(
      states => states,
      dispatch => new Object({ dispatch })
    )(options)
  } else {
    return function(Component: React.ComponentClass<any>) {
      let mapStates = (states: StoreStates): any => states

      if (Array.isArray(options) || Array.isArray(options.mapStates)) {
        const arr = Array.isArray(options) ? options : options.mapStates
        mapStates = (states: StoreStates) => {
          const resState = {}
          arr.forEach((key: string) => {
            resState[key] = states[key]
          })
          return resState
        }
      }

      return connect(mapStates, dispatch => new Object({ dispatch }))(Component)
    }
  }
}
