import { combineReducers } from 'redux'

import siteNavigation from '../reducers/siteNavigation';

export default combineReducers({
    navigation: siteNavigation,
});