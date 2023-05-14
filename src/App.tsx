import tw from 'tailwind-styled-components'
import Post from './components/Post'

const StyledMain = tw.main`
flex
flex-wrap
justify-center
w-full
m-auto
gap-4 
items-center
p-4
`

function App() {
  return (
    <StyledMain>
      <Post />
    </StyledMain>
  )
}

export default App
