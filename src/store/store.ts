import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { infoApi } from 'services/apiService/infoApi';
import categoriesReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    category: categoriesReducer,
    [infoApi.reducerPath]: infoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(infoApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
