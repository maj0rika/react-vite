import tw from 'tailwind-styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/auth'
import { actions } from '@/store/my'
import logo from '@/assets/images/logo.png'

const StyledHeader = tw.header`
  flex
  justify-between
  flex-wrap
  items-center
  px-5
  py-7
  w-full
  text-white
  font-bold
  text-xl
  break-keep
  mobile:px-5
  mobile:text-base
`

const StyledMenu = tw.div`
  flex
  gap-2
  font-normal
  items-center
`

const StyledLink = tw(Link)`
  hover:underline
  underline-offset-4
`

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const myInfo = useSelector((state: any) => state.my.myInfo)

  const isLinkActive = (path: string) => location.pathname === path
  const getLinkClassName = (path: string) =>
    isLinkActive(path) ? 'underline' : ''

  const handleLogout = () => {
    logout()
    dispatch(actions.logout())
  }

  return (
    <StyledHeader>
      <Link to="/" className="flex cursor-pointer items-center gap-2">
        <img src={logo} alt="logo" className="h-10 w-auto mobile:h-5" />
        마조리카 블로그
      </Link>

      <StyledMenu>
        {myInfo?.email ? (
          <>
            <StyledLink
              to="/"
              onClick={handleLogout}
              className={getLinkClassName('/logout')}
            >
              로그아웃
            </StyledLink>

            <StyledLink to="/post" className={getLinkClassName('/post')}>
              게시판
            </StyledLink>

            <StyledLink to="/gpt" className={getLinkClassName('/gpt')}>
              Gpt글쓰기
            </StyledLink>
          </>
        ) : (
          <>
            <Link to="/login" className={getLinkClassName('/login')}>
              로그인
            </Link>

            <Link to="/signup" className={getLinkClassName('/signup')}>
              회원가입
            </Link>
          </>
        )}
      </StyledMenu>
    </StyledHeader>
  )
}

export default Header
