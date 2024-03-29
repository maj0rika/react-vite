import PostCreate from './Create'
import tw from 'tailwind-styled-components'

const StyledPostList = tw.ul`
  flex
  w-full
  flex-wrap
  gap-4
  items-center
  justify-center

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
    // TODO: 무한스크롤 적용
  )
}

export default PostList
