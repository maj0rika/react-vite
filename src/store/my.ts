import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export interface ActionWithPayload<T> extends Action {
  payload: T
}

export interface IMyInfo {
  // id: string
  // nickname: string
  // profileImage: string
  email: string
}

export interface IMyState {
  myInfo?: IMyInfo
}

const initialAuthState: IMyState = {
  myInfo: undefined,
}

export const actionTypes = {
  SET_MY_INFO: 'my/SET_MY_INFO',
  LOGIN: 'my/LOGIN',
  LOGOUT: 'my/LOGOUT',
}

export const actions = {
  setMyInfo: (myInfo: IMyInfo) => ({
    type: actionTypes.SET_MY_INFO,
    payload: myInfo,
  }),
  login: () => ({
    type: actionTypes.LOGIN,
  }),
  logout: () => ({
    type: actionTypes.LOGOUT,
  }),
}

const persistedReducer = persistReducer(
  {
    key: 'my',
    storage,
    whitelist: ['myInfo'],
  },
  (state: IMyState = initialAuthState, action: PayloadAction<any>) => {
    switch (action.type) {
      case actionTypes.SET_MY_INFO:
        const myInfo = action.payload
        return {
          ...state,
          myInfo,
        }
      case actionTypes.LOGIN:
        return {
          ...state,
        }
      case actionTypes.LOGOUT:
        return initialAuthState
      default:
        return state
    }
  },
)

export default persistedReducer
