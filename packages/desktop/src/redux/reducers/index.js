import { combineReducers } from 'redux'

import siteNavigation from '../reducers/siteNavigation';
import search from '../reducers/search';

export default combineReducers({
    navigation: siteNavigation,
    search: search
});