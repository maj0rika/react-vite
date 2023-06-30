import tw from 'tailwind-styled-components'
import { useState, useEffect } from 'react'
import { useDispatch /* useSelector*/ } from 'react-redux'
import { setMyInfo } from '@/store/my'
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

const StyledMain = tw.form`
  card-container
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // TODO:debounce 적용 lodash

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
        .then(
          async (userCredential: {
            user: {
              email: string | null | undefined
            }
          }) => {
            const user = userCredential.user

            if (!user) {
              alert('로그인에 실패하였습니다.')
              return
            }

            dispatch(
              setMyInfo({
                email: user.email as string,
              }),
            )

            onAuthStateChanged(authConfig, () => {
              // if (user) {
              //   const uid = user.uid
              //   // ...
              // } else {
              //   // User is signed out
              //   // ...
              // }
            })

            navigate('/')
          },
        )
        .finally(() => {})
    })
  }

  return (
    <StyledMain>
      <h1 className="text-xl">로그인</h1>
      <div className="flex w-full items-center gap-4">
        <label htmlFor="email" className="w-[80px]">
          이메일
        </label>
        <InputText
          className="w-full"
          value={email}
          onChange={(e: { target: { value: string } }) => {
            setEmail(e.target.value)
          }}
          placeholder="이메일"
          id="email"
          validation={emailvalidate(email)}
          autocomplete="email" // 이 부분 추가
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
          onChange={(e: { target: { value: string } }) => {
            setPassword(e.target.value)
          }}
          id="password"
          validation={passwordvalidate(password)}
          autocomplete="new-password" // 이 부분 추가
        />
      </div>

      <Button onClick={Loign}>로그인</Button>
    </StyledMain>
  )
}

export default Login
