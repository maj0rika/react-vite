import styled from 'styled-components'
import PostCreate from './PostCreate'

const StyledPostList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  gap: 16px;
  align-items: center;
  padding: 16px;
`

interface PostListProps {
  children: React.ReactNode
}

function PostList({ children }: PostListProps) {
  return (
    <StyledPostList>
      <PostCreate />
      {children}
    </StyledPostList>
  )
}

export default PostList
