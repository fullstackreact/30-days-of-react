import * as types from '../types';

export const initialState = {
  isLoggedIn: false,
  userData: null,
  pending: false,
  errors: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRY_LOGIN:
      return { ...state, pending: true }
    case types.LOGIN_SUCCESS:
      return { 
        ...state, 
        pending: false, 
        isLoggedIn: true,
        userData: action.payload,
        errors: null,
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        isLoggedIn: false,
        userData: null,
        errors: action.payload,
      }
    case types.LOGOUT:
      return { 
        ...state, pending: false, isLoggedIn: false, userData: null 
      }
    default:
      return state;
  }
}