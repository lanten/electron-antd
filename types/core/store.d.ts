import { AnyAction } from 'redux'

declare global {
  type StoreDatasKeys = keyof StoreDatas
  type StoreStateKeys = keyof StoreStates

  type ActionFn = <StoreStates, T extends StoreDatasKeys>(
    data: StoreAction<T>['data'],
    state: StoreStates,
    action: StoreAction<T>
  ) => { [key: string]: any }

  interface AliasStates {
    [key: string]: StoreStateKeys
  }

  interface StoreAction<K extends StoreDatasKeys> extends AnyAction {
    type: K
    data: StoreDatas[K]
  }

  type AsyncDispatch = (dispatch: StoreProps['dispatch']) => Promise<any>

  type Dispatch = <T extends StoreDatasKeys>(options: StoreAction<T> | AsyncDispatch) => Promise<void> | void
  interface StoreProps {
    readonly dispatch: Dispatch
  }

  /**
   * Redux Store
   *
   * @source app/core/store
   * @define build/webpack.config.base.ts#L39
   */
  const $store: AppStore
}
