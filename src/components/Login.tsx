import tw from 'tailwind-styled-components'
// import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '@/store/counterSlice'

const StyledMain = tw.main`
flex
flex-wrap
justify-center
w-full
m-auto
gap-4
items-center
`

const Login = () => {
  const count = useSelector((state: { counter: { count: number } }) => state.counter.count)
  const dispatch = useDispatch()

  return (
    <StyledMain>
      <div>
        <h1>Count: {count}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </StyledMain>
  )
}

export default Login
