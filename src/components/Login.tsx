import tw from 'tailwind-styled-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@/store/my'
import InputText from '@/components/Input/Text'
import { auth as authConfig } from '@/firebaseConfig'
import { emailvalidate, passwordvalidate } from '@/validate'
import {
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import '@/index.css'

const StyledMain = tw.main`
  card-container
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const myInfo = useSelector((state: any) => state.my.myInfo)

  const Loign = async () => {
    if (!emailvalidate(email)) {
      alert('이메일 형식이 올바르지 않습니다.')
      return
    }

    if (!passwordvalidate(password)) {
      alert('비밀번호 형식이 올바르지 않습니다.')
      return
    }

    setPersistence(authConfig, browserSessionPersistence).then(async () => {
      await signInWithEmailAndPassword(authConfig, email, password)
        .then(async (userCredential: { user: any }) => {
          // Signed in
          const user = userCredential.user
          console.log(user)
          dispatch(
            actions.setMyInfo({
              email: user.email,
            }),
          )
          console.log('user', user)

          console.log('myInfo', myInfo)

          onAuthStateChanged(authConfig, user => {
            if (user) {
              const uid = user.uid
              console.log(uid)
              // ...
            } else {
              // User is signed out
              // ...
            }
          })

          navigate('/')

          // dispatch(actions.login())

          // useCallback(() => {
          //   dispatch(
          //     actions.setMyInfo({
          //       email: user.email,
          //       uid: user.uid,
          //       displayName: user.displayName,
          //       photoURL: user.photoURL,
          //     }),
          //   )
          // }, [dispatch, user])
        })
        .finally(() => {})
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
