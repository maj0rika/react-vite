import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import counterReducer from '@/store/counterSlice'
import mySlice from '@/store/my'

const rootReducer = combineReducers({
  counter: counterReducer,
  my: mySlice,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['my'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export default { store, persistor }
