import * as types from "./types";

export const initialState = {
  user: {},
  loggedIn: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        user: action.payload,
        loggedIn: true
      };
    case types.LOGOUT:
      return {
        ...state,
        user: {},
        loggedIn: false
      };
    default:
      return state;
  }
};
