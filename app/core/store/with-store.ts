import {
  connect as originalConnect,
  MapStateToPropsParam,
  MapDispatchToPropsParam,
  MergeProps,
  Options,
} from 'react-redux'

export type MapStateList = (StoreStateKeys | AliasStates)[] | AliasStates

/**
 * 挂载 Redux Store
 * @param options
 * @param mapStates
 */
export function withStore(options: MapStateList): any {
  return connect(mapStates(options), (dispatch: any) => new Object({ dispatch }))
}

export function mapStates(options: MapStateList): MapStateToPropsParam<{}, {}, StoreStates> {
  return (states: StoreStates) => {
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

/**
 * react-redux connect 在 TS 中作为修饰器使用的问题 https://github.com/DefinitelyTyped/DefinitelyTyped/issues/9951
 * 暂时无法解决
 */

export type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = <
  TComponent extends React.ComponentType<TInjectedProps & TNeedsProps>
>(
  component: TComponent
) => TComponent

export interface TSConnect {
  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, StoreStates>,
    mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
  ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>

  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, StoreStates>,
    mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
    options?: Options<TStateProps, TOwnProps, TMergedProps>
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>
}

export const connect = originalConnect as TSConnect
