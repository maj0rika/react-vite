import tw from 'tailwind-styled-components'
import { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { increment, decrement } from '@/store/counterSlice'
import InputText from '@/components/Input/Text'
import { auth } from '@/firebaseConfig'
import { emailvalidate, passwordvalidate } from '@/validate'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Button from './Button'

const StyledMain = tw.main`
flex
flex-col
flex-wrap
justify-center
w-full
max-w-[500px]
bg-purple-700
rounded-md
p-8
m-auto
gap-4
items-center
shadow-2xl
text-purple-200
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const Loign = async () => {
    if (!emailvalidate(email)) {
      alert('이메일 형식이 올바르지 않습니다.')
      return
    }

    if (!passwordvalidate(password)) {
      alert('비밀번호 형식이 올바르지 않습니다.')
      return
    }

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: { user: any }) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  // const count = useSelector(
  //   (state: { counter: { count: number } }) => state.counter.count,
  // )
  // const dispatch = useDispatch()

  return (
    <StyledMain>
      {/* <div>
        <h1>Count: {count}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div> */}

      <h1 className="text-xl">로그인</h1>
      <div className="flex w-full items-center gap-4">
        <label htmlFor="email" className="w-[80px]">
          이메일
        </label>
        <InputText
          className="w-full"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
          placeholder="이메일"
          id="email"
          validation={emailvalidate(email)}
        />
      </div>
      <div className="flex w-full items-center gap-4">
        <label htmlFor="password" className="w-[80px]">
          비밀번호
        </label>
        <InputText
          className="w-full"
          type="password"
          value={password}
          placeholder="6~12자리"
          onChange={e => {
            setPassword(e.target.value)
          }}
          id="password"
          validation={passwordvalidate(password)}
        />
      </div>
      <Button onClick={Loign}>로그인</Button>
    </StyledMain>
  )
}

export default Login