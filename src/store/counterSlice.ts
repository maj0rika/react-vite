import { createSlice } from '@reduxjs/toolkit'

// 초기 상태 정의
const initialState = {
  count: 0,
}

// 리듀서 생성
const counterSlice = createSlice({
  name: 'counter',
  initialState, // 초기 상태
  reducers: {
    increment(state) {
      // count를 1 증가
      state.count += 1
    },
    decrement(state) {
      // count를 1 감소
      state.count -= 1
    },
  },
})

// 액션 생성 함수 추출
export const { increment, decrement } = counterSlice.actions

// 리듀서 내보내기
export default counterSlice.reducer
