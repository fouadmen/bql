import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import reducers from './reducers';

const store = configureStore({
  reducer : reducers,
  middleware: [ ...getDefaultMiddleware({serializableCheck: false})],
  enhancers: [],
})

export default store;
