import tw from 'tailwind-styled-components'
// import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '@/store/counterSlice'
import InputText from '@/components/Input/Text'

const StyledMain = tw.main`
flex
flex-col
flex-wrap
justify-center
w-full
m-auto
gap-4
items-center
`

const StyledContainer = tw.article`
flex
flex-col
justify-center
items-center
gap-4
`

const Login = () => {
  const count = useSelector(
    (state: { counter: { count: number } }) => state.counter.count,
  )
  const dispatch = useDispatch()

  const email = ''
  const password = ''

  return (
    <StyledMain>
      <div>
        <h1>Count: {count}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
      <StyledContainer>
        <h1>로그인</h1>
        <div>
          <label htmlFor="email">이메일</label>
          <InputText value={email} onChange={() => {}} id="email" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <InputText value={password} onChange={() => {}} id="password" />
        </div>
        <button>로그인</button>
      </StyledContainer>
    </StyledMain>
  )
}

export default Login
