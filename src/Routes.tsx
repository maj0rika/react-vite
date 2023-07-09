import { useRoutes, Navigate, useLocation } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'

import { lazy } from 'react'

import Signup from './components/Signup'
import Gpt from './components/Gpt'
import Login from './components/Login'
import Main from './components/Main'
const Post = lazy(() => import('./components/Post/Index'))

const PrivateUser = (props: any) => {
  const myInfo = useSelector((state: any) => state.my.myInfo, shallowEqual)
  const location = useLocation()

  return myInfo?.email ? (
    props.children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/post',
      element: <Post />,
    },
    {
      path: '/gpt',
      element: (
        // <PrivateUser>
        <Gpt />
        // </PrivateUser>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ])
}
