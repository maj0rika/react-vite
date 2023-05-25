import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { persistStore } from 'redux-persist'

import counterReducer from '@/store/counterSlice'
import mySlice from '@/store/my'

const rootReducer = combineReducers({
  counter: counterReducer,
  my: mySlice,
})

export const store = configureStore({
  reducer: rootReducer,

  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export default { store, persistor }
