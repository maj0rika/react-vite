import tw from 'tailwind-styled-components'
import InputText from '@/components/Input/Text'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import { useState } from 'react'
import Button from './Button'
import { emailvalidate, passwordvalidate } from '@/validate'

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

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordcheck, setPasswordcheck] = useState('')

  const signup = async () => {
    if (!emailvalidate(email)) {
      alert('이메일 형식이 올바르지 않습니다.')
      return
    }

    if (!passwordvalidate(password)) {
      alert('비밀번호 형식이 올바르지 않습니다.')
      return
    }

    if (password !== passwordcheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user

        console.log(user)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
  }

  return (
    <StyledMain>
      <h1 className="text-xl ">회원가입</h1>
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
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
          id="password"
          validation={passwordvalidate(password)}
        />
      </div>
      <div className="flex w-full items-center gap-4">
        <label htmlFor="password" className="w-[80px]">
          비밀번호 확인
        </label>
        <InputText
          className="w-full"
          value={passwordcheck}
          onChange={e => {
            setPasswordcheck(e.target.value)
          }}
          id="password"
          validation={passwordvalidate(passwordcheck)}
        />
      </div>
      <div className="flex w-full items-center gap-4">
        <label htmlFor="password" className="w-[80px]"></label>
        <p className="text-sm text-red-500">
          {password !== passwordcheck ? '비밀번호가 일치하지 않습니다.' : ''}
        </p>
      </div>

      <Button onClick={signup}>회원가입</Button>
    </StyledMain>
  )
}

export default Signup
