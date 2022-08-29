import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { infoApi } from 'services/apiService/infoApi';

export const store = configureStore({
  reducer: {
    [infoApi.reducerPath]: infoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(infoApi.middleware),
});

setupListeners(store.dispatch);
