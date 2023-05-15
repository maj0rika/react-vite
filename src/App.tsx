import tw from 'tailwind-styled-components'
import { Provider } from 'react-redux'
import { store } from '@/store'
import Header from './components/Header'
import Login from './components/Login'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const Post = lazy(() => import('./components/Post'))

const StyledMain = tw.main`
flex
flex-wrap
justify-center
w-full
m-auto
gap-4 
items-center

`

function App() {
  return (
    <Provider store={store as any}>
      <BrowserRouter>
        <Header />
        <StyledMain>
          {' '}
          <Suspense fallback={<div>ㅁㄴㅇㄴㅁㅇㄴㅁ ...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/signup">
            <div>회원가입 페이지</div>
          </Route> */}
              <Route path="/post" element={<Post />} />

              <Route path="/" element={<div>메인 페이지</div>} />
            </Routes>{' '}
          </Suspense>
        </StyledMain>
      </BrowserRouter>
    </Provider>
  )
}

export default App
