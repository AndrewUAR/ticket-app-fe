import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import modalReducer from './modalReducer';
import ticketReducer from './ticketReducer';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  modal: modalReducer,
  tickets: ticketReducer
});

export default persistReducer(persistConfig, rootReducers);