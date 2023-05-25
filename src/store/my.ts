import { createSlice, Action } from '@reduxjs/toolkit'
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
  accessToken?: string
}

const initialAuthState: IMyState = {
  myInfo: undefined,
  accessToken: undefined,
}

export const actionsTypes = {
  SET_MY_INFO: 'my/SET_MY_INFO',
  LOGIN: 'my/LOGIN',
  LOGOUT: 'my/LOGOUT',
}

export const actions = {
  setMyInfo: (myInfo: IMyInfo) => ({
    type: actionsTypes.SET_MY_INFO,
    payload: myInfo,
  }),
  login: (accessToken: string) => ({
    type: actionsTypes.LOGIN,
    payload: accessToken,
  }),
  logout: () => ({
    type: actionsTypes.LOGOUT,
  }),
}

const persistedReducer = persistReducer(
  {
    key: 'my',
    storage,
    whitelist: ['myInfo', 'accessToken'],
  },
  (state: IMyState = initialAuthState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionsTypes.SET_MY_INFO:
        const myInfo = action.payload?.myInfo
        return {
          ...state,
          myInfo,
        }
      case actionsTypes.LOGIN:
        const accessToken = action.payload

        return {
          accessToken,
          myInfo: undefined,
        }
      case actionsTypes.LOGOUT:
        return {
          initialAuthState,
        }
      default:
        return state
    }
  },
)

export default persistedReducer
