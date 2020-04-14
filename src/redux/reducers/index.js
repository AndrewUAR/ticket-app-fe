import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import modalReducer from './modalReducer';
import ticketReducer from './ticketReducer';
import userReducer from './userReducer';

import { LOGOUT } from '../types';

const persistConfig = {
  key: 'root',
  storage
};

const appReducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  modal: modalReducer,
  tickets: ticketReducer,
  user: userReducer
});

const rootReducers = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
    localStorage.clear();
  }
  return appReducers(state, action);
}

export default persistReducer(persistConfig, rootReducers);