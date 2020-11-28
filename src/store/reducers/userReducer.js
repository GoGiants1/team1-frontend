import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentUser: {},
  isLoggedIn: undefined
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        isLoggedIn: true
      };
  }
  return state;
};

export default reducer;
