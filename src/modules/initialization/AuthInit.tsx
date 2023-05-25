import React, { FC, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  shallowEqual,
  useSelector,
  connect,
  useDispatch,
  ConnectedProps,
} from 'react-redux'
import { RootState } from '@/store/index'
import { actions } from '@/store/my'

import { checkUser, getUser } from '@/auth'

const mapState = (state: RootState) => ({ auth: state.my })
const connector = connect(mapState, actions)
type PropsFromRedux = ConnectedProps<typeof connector> & {
  children: React.ReactNode
}

//actions로 타입정의
const AuthInit: FC<PropsFromRedux> = (props: PropsFromRedux) => {
  const didRequest = useRef(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const location = useLocation()

  const userInfo = useSelector<RootState>(({ my }) => my.myInfo, shallowEqual)

  // We should request user by authToken before rendering the application
  // 1. accessToken 변경 여부를 감지하여 로그인 성공 시 sx페이지 이동
  // 2. 새로고침할 때 사용자 정보를 서버에 요청하여 반영

  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const user = await checkUser()

          dispatch(props.setMyInfo(user))
          navigate('/')
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          dispatch(props.logout())
        }
      }

      return () => (didRequest.current = true)
    }

    console.log('userInfo', userInfo)
    const isLogin = getUser()
    console.log('isLogin', isLogin)
    if (!isLogin && !userInfo) {
      requestUser()
    }
    // else {
    //   dispatch(props.logout());
    // }
  }, [])

  return <React.Fragment>{props.children}</React.Fragment>
}

export default connector(AuthInit)
