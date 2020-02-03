import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer, initialState } from './reducers/auto-reducer'

export const store = createStore<StoreStates, StoreAction<StoreActionsKeys>, {}, {}>(
  reducer,
  initialState,
  applyMiddleware(thunk)
)

declare global {
  type AppStore = typeof store
}
