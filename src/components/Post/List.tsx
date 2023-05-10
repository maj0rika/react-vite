import styled, { ThemeProvider } from 'styled-components'
import PostCreate from './Create'

import theme from '@/theme'

const StyledPostList = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 16px;
`

interface PostListProps {
  children: React.ReactNode
}

function PostList({ children }: PostListProps) {
  return (
    <ThemeProvider theme={theme}>
      <StyledPostList>
        <PostCreate />
        {children}
      </StyledPostList>
    </ThemeProvider>
  )
}

export default PostList
