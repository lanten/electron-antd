import { createStore } from 'redux'
import { reducer, initState } from './reducers/auto-reducer'

export const store: AppStore = createStore(reducer, initState)
