import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { redirect } from './middlewares/redirect';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redirect),
});

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

