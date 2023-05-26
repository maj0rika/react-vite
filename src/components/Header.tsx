import tw from 'tailwind-styled-components'
import { Link, useLocation } from 'react-router-dom'
import my, { actions } from '@/store/my'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/auth'

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
  const dispatch = useDispatch()
  console.log(my)
  const myInfo = useSelector((state: any) => state.my.myInfo)

  console.log(myInfo)

  return (
    <StyleHeader>
      <Link to="/" className="cursor-pointer">
        마조리카 블로그
      </Link>

      {myInfo?.email ? (
        <StyledMenu>
          <Link
            to="/"
            onClick={() => {
              logout()
              dispatch(actions.logout())
            }}
            className={`hover:underline
          ${location.pathname === '/logout' ? 'underline' : ''}
          `}
          >
            로그아웃
          </Link>

          <Link
            to="/post"
            className={`hover:underline
        ${location.pathname === '/post' ? 'underline' : ''}
        `}
          >
            게시판
          </Link>
          <Link
            to="/gpt"
            className={`hover:underline
        ${location.pathname === '/gpt' ? 'underline' : ''}
        `}
          >
            Gpt글쓰기
          </Link>
        </StyledMenu>
      ) : (
        <StyledMenu>
          {' '}
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
        </StyledMenu>
      )}
    </StyleHeader>
  )
}

export default header
