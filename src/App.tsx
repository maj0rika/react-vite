import tw from 'tailwind-styled-components'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { persistor } from '@/store/index'
import AuthInit from './modules/initialization/AuthInit'
import Header from './components/Header'
import Routes from './Routes'

const StyledMain = tw.main`
  flex
  flex-col
  flex-wrap
  justify-start
  w-full
  m-auto
  gap-4 
  items-center
  pb-[50px]
  min-h-screen
  bg-gradient-to-tr
  from-purple-400
  from-0%
  to-primary/95
  to-60%
  px-4
`

function App() {
  return (
    <Provider store={store as any}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/react">
          <AuthInit>
            <StyledMain>
              <Header />
              <Suspense fallback={<div>로딩중 ...</div>}>
                <Routes />
              </Suspense>
            </StyledMain>
          </AuthInit>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
