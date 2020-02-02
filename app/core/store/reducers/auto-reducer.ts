const actions = require.context('../actions', true, /^((?!\.d\.ts).)*(\.ts)$/);
const actionsH: { [key: string]: ActionFn } = {};

export const initState = {};

actions.keys().forEach(item => {
  const actionItem = actions(item);

  if (actionItem.initState) {
    Object.assign(initState, actionItem.initState);
    // delete actionItem.initState;
  }

  for (const key in actionItem) {
    actionsH[key] = actionItem[key];
  }
});

export function reducer<StoreStates, T extends StoreActionsKeys>(state: StoreStates, action: StoreAction<T>) {
  const { type } = action;
  const actionFn: ActionFn = actionsH[type as string];
  const resState = (actionFn && actionFn(state, action)) || {};
  return Object.assign({}, state, resState);
}
