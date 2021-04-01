const actions = require.context('../actions', true, /^((?!\.d\.ts).)*(\.ts)$/)
const actionsH: { [key: string]: ActionFn } = {}

export const initialState: any = {}

actions.keys().forEach((item) => {
  const actionItem = Object.assign({}, actions(item))

  if (actionItem.initialState) {
    Object.assign(initialState, actionItem.initialState)
  }

  delete actionItem.initialState

  for (const key in actionItem) {
    actionsH[key] = actionItem[key]
  }
})

export function reducer<StoreStates, T extends StoreDatasKeys>(
  state: StoreStates,
  action: StoreAction<T>
): StoreStates & AnyObj {
  const actionFn: ActionFn = actionsH[action.type]
  const resState = (actionFn && actionFn(action.data, state, action)) || {}

  return Object.assign({}, state, resState)
}
