import { combineReducers } from 'redux';

import * as auth from './auth';

export const initialState = {
    auth: auth.initialState,
}

export const rootReducer = combineReducers({
    auth: auth.reducer
})