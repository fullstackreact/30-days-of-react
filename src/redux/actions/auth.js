import * as types from '../types';

export const tryLogin = ({ username, password }) => {
  if (username === 'admin' && password === 'secret') {
    return {
      type: types.LOGIN_SUCCESS,
      payload: { username, password }
    }
  } else {
    return {
      type: types.LOGIN_FAILURE,
      payload: 'Invalid username or password'
    }
  }
}

export const tryLogout = () => ({
  type: types.LOGOUT
})