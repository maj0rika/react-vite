import styled, { ThemeProvider } from 'styled-components'
import Post from './components/Post'
import theme from './theme'

const StyledMain = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  gap: 16px;
  align-items: center;
  padding: 16px;
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledMain>
        <Post />
      </StyledMain>
    </ThemeProvider>
  )
}

export default App
