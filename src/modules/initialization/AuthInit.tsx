import React, { FC, useRef, useEffect } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/index'
import { setMyInfo, logout, IMyInfo } from '@/store/my'
import { auth } from '@/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

type Props = {
  children: React.ReactNode
}

const getUser = () => {
  console.log('getUser')
  return auth.currentUser
}

const checkUser = async () => {
  console.log('checkUser')
  const user = getUser()
  if (user) {
    const myInfo: IMyInfo = {
      email: user.email || '',
    }
    return myInfo
  } else {
    return new Promise<IMyInfo | undefined>((resolve, reject) => {
      onAuthStateChanged(
        auth,
        user => {
          if (user) {
            const myInfo: IMyInfo = {
              email: user.email || '',
            }
            resolve(myInfo)
          } else {
            resolve(undefined)
          }
        },
        reject,
      )
    })
  }
}

const AuthInit: FC<Props> = ({ children }) => {
  const didRequest = useRef(false)
  const dispatch = useDispatch()

  const userInfo = useSelector<RootState, IMyInfo | undefined>(
    state => state.my.myInfo,
    shallowEqual,
  )

  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const user = await checkUser()

          dispatch(setMyInfo(user as IMyInfo))
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          dispatch(logout())
        }
      }

      return () => {
        didRequest.current = true
      }
    }

    const isLogin = getUser()

    if (!isLogin && !userInfo) {
      requestUser()
    }
  }, [])

  return <React.Fragment>{children}</React.Fragment>
}

export default AuthInit
