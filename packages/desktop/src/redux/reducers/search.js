import * as actions from '../actions/actionTypes/search';
  
  const INITIAL_STATE = {
    currentSearch: `https://www.google.com`,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case actions.SEARCH_BY_URL:
        return {
            ...state, 
            currentSearch: action.payload
        };
      default:
        return state;
    }
  };