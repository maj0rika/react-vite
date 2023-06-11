import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IMyInfo {
  email: string
}

export interface IMyState {
  myInfo?: IMyInfo
  isLogin?: boolean
}

const initialAuthState: IMyState = {
  myInfo: undefined,
}

const mySlice = createSlice({
  name: 'my',
  initialState: initialAuthState,
  reducers: {
    setMyInfo: (state, action: PayloadAction<IMyInfo>) => {
      state.myInfo = action.payload
    },
    login: state => {
      state.isLogin = true
    },
    logout: state => {
      state.myInfo = undefined
      state.isLogin = false
    },
  },
})

export const { setMyInfo, login, logout } = mySlice.actions

const persistedReducer = persistReducer(
  {
    key: 'my',
    storage,
    whitelist: ['myInfo'],
  },
  mySlice.reducer,
)

export default persistedReducer
