import tw from 'tailwind-styled-components'
import InputText from '@/components/Input/Text'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import { useState } from 'react'
import Button from './Button'
import { emailvalidate, passwordvalidate } from '@/validate'
import { useNavigate } from 'react-router-dom'

const StyledMain = tw.main`
card-container
`

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordcheck, setPasswordcheck] = useState('')

  const navigate = useNavigate()

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

    await register(email, password)
      .then(() => {
        alert('회원가입이 완료되었습니다.')
        navigate('/login')
      })
      .catch(() => {
        alert('회원가입에 실패하였습니다.')
      })
  }

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      const user = userCredential.user
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
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
          placeholder="이메일을 입력해주세요."
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
          placeholder="6~12자리"
          onChange={e => {
            setPassword(e.target.value)
          }}
          type="password"
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
          placeholder="비밀번호를 다시 입력해주세요."
          onChange={e => {
            setPasswordcheck(e.target.value)
          }}
          type="password"
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
