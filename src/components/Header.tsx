import tw from 'tailwind-styled-components'
import { Link } from 'react-router-dom'

const StyleHeader = tw.header`
  flex
  justify-between
  items-center
  p-4
  bg-primary
  w-full
  text-white
  font-bold
  text-xl

`

const StyledMenu = tw.div`
flex
gap-2
font-normal
cursor-pointer
`

const header = () => {
  return (
    <StyleHeader>
      <Link to="/" className="cursor-pointer">
        마조리카 블로그
      </Link>
      <StyledMenu>
        <Link
          to="/login"
          className="hover:underline
"
        >
          로그인
        </Link>
        <Link
          to="/post"
          className="hover:underline
"
        >
          글쓰기
        </Link>
      </StyledMenu>
    </StyleHeader>
  )
}

export default header
