import * as actions from '../actionTypes/siteNavigation';

export const siteNavigation = (index) => {    
    return (dispatch) => {
        dispatch({
            type: actions.SET_SIDE_NAV,
            payload: index
        })
    }
}