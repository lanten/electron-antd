import { AnyAction } from 'redux'

declare global {
  type StoreActionsKeys = keyof StoreActions
  type StoreStateKeys = keyof StoreStates

  type ActionFn = <StoreStates, T extends StoreActionsKeys>(
    state: StoreStates,
    action: StoreAction<T>
  ) => { [key: string]: any }

  interface AliasStates {
    [key: string]: StoreStateKeys
  }

  interface StoreAction<K extends StoreActionsKeys> extends AnyAction {
    type: K
    data: StoreActions[K]
  }

  type AsyncDispatch = (dispatch: StoreProps['dispatch']) => Promise<any>

  type Dispatch = <T extends StoreActionsKeys>(options: StoreAction<T> | AsyncDispatch) => Promise<void> | void
  interface StoreProps {
    readonly dispatch: Dispatch
  }

  const $store: AppStore

  namespace NodeJS {
    interface Global {
      __$store: AppStore
    }
  }
}
