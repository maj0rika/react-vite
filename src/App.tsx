import tw from 'tailwind-styled-components'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { PersistGate } from 'redux-persist/integration/react'

import Header from './components/Header'
import Login from './components/Login'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const Post = lazy(() => import('./components/Post'))
import Signup from './components/Signup'
import { useEffect } from 'react'

import { checkUser, logout } from '@/auth'
import { persistor } from '@/store/index'

import AuthInit from './modules/initialization/AuthInit'

const StyledMain = tw.main`
flex
flex-wrap
justify-center
w-full
m-auto
gap-4 
items-center
py-15
min-h-screen
bg-gradient-to-tr
from-purple-400
from-0%
to-primary/95
to-60%


`

function App() {
  //쿠키 사용
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   const getToken = async () => {
  //     if (await checkUser()) {
  //       console.log('토큰이 있습니다.')
  //     } else {
  //       await logout()
  //     }
  //   }

  //   getToken()
  // }, [])

  return (
    <Provider store={store as any}>
      {' '}
      <PersistGate loading={<div>aaaaa ...</div>} persistor={persistor}>
        <BrowserRouter>
          <AuthInit>
            <Header />
            <StyledMain>
              {' '}
              <Suspense fallback={<div>ㅁㄴㅇㄴㅁㅇㄴㅁ ...</div>}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/post" element={<Post />} />

                  <Route path="/" element={<div>메인 페이지</div>} />
                </Routes>{' '}
              </Suspense>
            </StyledMain>
          </AuthInit>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
