import { Store, AnyAction } from 'redux'

declare global {
  interface StoreStates {
    count: number
    count2: number
  }

  interface StoreActions {
    ACTION_ADD_COUNT: number
    ACTION_ADD_COUNT2: number
  }

  type StoreActionsKeys = keyof StoreActions
  type StoreStateKeys = keyof StoreStates

  type ActionFn = <StoreStates, T extends StoreActionsKeys>(
    state: StoreStates,
    action: StoreAction<T>
  ) => { [key: string]: any }

  interface StoreAction<K extends StoreActionsKeys> extends AnyAction {
    type: K
    data: StoreActions[K]
  }

  interface AppStore extends Store<StoreStates, StoreAction<any>> {}

  interface WithStoreOptions {
    test: keyof PageProps
    mapStates: StoreStateKeys[]
    mapDispatch: ActionFn
  }

  interface StoreProps extends StoreStates {
    dispatch: <T extends StoreActionsKeys>(options: StoreAction<T>) => void
  }
}
