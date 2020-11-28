import apis from "../../../Apis";
import * as actionTypes from '../actionTypes'
import storage from "../../../lib/storage";

// export const LOGIN_USER = 'LOGIN_USER'
export const loginUser = loginParams => {
  return dispatch => {
    return apis.account.login(loginParams).then(res => {
        dispatch({
          type: actionTypes.LOGIN_USER,
          user: res.data,
        })
      }
    )
  };
};