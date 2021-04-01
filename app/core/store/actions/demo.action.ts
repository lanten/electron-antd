export const initialState = {
  count: 1,
}

export function ACTION_ADD_COUNT(
  data: StoreDatas['ACTION_ADD_COUNT'],
  state: StoreStates,
  action: StoreAction<'ACTION_ADD_COUNT'>
): { count: StoreStates['count'] } {
  console.log({ data, state, action })
  return { count: data }
}

declare global {
  interface StoreStates {
    count: number
  }

  interface StoreDatas {
    ACTION_ADD_COUNT: StoreStates['count']
  }
}
