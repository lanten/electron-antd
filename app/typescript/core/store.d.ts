import store from '@/core/store';

declare global {
  const $store: typeof store;
  namespace NodeJS {
    interface Global {
      __$store: typeof $store;
    }
  }
}
