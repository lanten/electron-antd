export const initState = {
  count2: -1,
};

export function ACTION_ADD_COUNT2(state: StoreStates, action: StoreAction<'ACTION_ADD_COUNT2'>): { count2: number } {
  console.log({ state, action });
  return { count2: state.count2 - 1 };
}
