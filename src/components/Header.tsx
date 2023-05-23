import tw from 'tailwind-styled-components'
import { Link, useLocation } from 'react-router-dom'

const StyleHeader = tw.header`
  fixed
  top-0
  flex
  justify-between
  items-center
  px-[80px]
  py-10
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
  const location = useLocation()

  return (
    <StyleHeader>
      <Link to="/" className="cursor-pointer">
        마조리카 블로그
      </Link>
      <StyledMenu>
        <Link
          to="/login"
          //location.pathname === '/login' ? 'underline' : ''
          className={`hover:underline
          ${location.pathname === '/login' ? 'underline' : ''}
          `}
        >
          로그인
        </Link>
        <Link
          to="/signup"
          className={`hover:underline
          ${location.pathname === '/signup' ? 'underline' : ''}
          `}
        >
          회원가입
        </Link>
        <Link
          to="/post"
          className={`hover:underline
          ${location.pathname === '/post' ? 'underline' : ''}
          `}
        >
          글쓰기
        </Link>
      </StyledMenu>
    </StyleHeader>
  )
}

export default header