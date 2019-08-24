import * as actions from '../actions/actionTypes/siteNavigation';
  
  const INITIAL_STATE = {
    sideNavIndex: 0,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case actions.SET_SIDE_NAV:
        return {
            ...state, 
            sideNavIndex: action.payload
        };
      default:
        return state;
    }
  };