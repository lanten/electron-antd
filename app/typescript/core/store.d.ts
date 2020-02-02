import { Store, AnyAction } from 'redux';

declare global {
  type StoreActionsKeys = keyof StoreActions;
  type StoreStateKeys = keyof StoreStates;

  type ActionFn = <StoreStates, T extends StoreActionsKeys>(state: StoreStates, action: StoreAction<T>) => { [key: string]: any };

  interface AliasStates {
    [key: string]: StoreStateKeys;
  }

  interface StoreAction<K extends StoreActionsKeys> extends AnyAction {
    type: K;
    data: StoreActions[K];
  }

  interface AppStore extends Store<StoreStates, StoreAction<any>> {}

  // interface WithStoreOptions {
  //   test: keyof PageProps
  //   mapStates: (StoreStateKeys | AliasStates)[]
  //   mapDispatch: ActionFn
  // }

  interface StoreProps {
    dispatch: <T extends StoreActionsKeys>(options: StoreAction<T>) => void;
  }

  const $store: AppStore;

  namespace NodeJS {
    interface Global {
      __$store: AppStore;
    }
  }
}
