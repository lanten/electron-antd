import { ModelConfig, RematchDispatcher, RematchDispatcherAsync } from '@rematch/core';

export interface CountAction {
  increment: RematchDispatcher;
  decrement: RematchDispatcher;

  incrementAsync: RematchDispatcherAsync;
}

export interface CountState {
  count: number;
}

const defaultState: CountState = {
  count: 0,
};

const count: ModelConfig<CountState> = {
  state: defaultState,
  reducers: {
    increment(state: CountState, payload: number) {
      return {
        ...state,
        count: state.count + payload,
      };
    },

    decrement(state: CountState, payload: number) {
      return {
        ...state,
        count: state.count - payload,
      };
    },
  },
  effects: {
    async incrementAsync(payload: number, rootState: number) {
      // 模拟延时
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.increment(payload);
      console.log(rootState);
    },
  },
};

export default count;
