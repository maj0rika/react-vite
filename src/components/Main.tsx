import mainImg from '@/assets/images/main.png'
import { useEffect, useState } from 'react'
import useScrollFadeIn from '../hooks/useScrollFadeIn'

const Main = () => {
  const animatedItem = {
    0: useScrollFadeIn('up', 2),
    1: useScrollFadeIn('down', 2),
    2: useScrollFadeIn('left', 2),
    3: useScrollFadeIn('right', 2),
  }

  const [test, setTest] = useState(0)

  console.log(test)

  useEffect(() => {}, [])

  return (
    <div className="flex w-full flex-col justify-center gap-5  overflow-hidden">
      {' '}
      <button
        onClick={() => setTest(test + 1)}
        className="flex h-screen w-full items-center justify-center"
      >
        {test}
        버튼
      </button>
      {/* <img className="h-screen w-full" src={mainImg} alt="main" />
       */}
      {/* <p className="flex h-[calc(100vh-100px)] w-full items-center justify-center font-bold text-white">
        스크롤 에니메이션 테스트 중! 아래로 스크롤 해보세요!
      </p> */}
      <div
        ref={animatedItem[0].ref}
        style={animatedItem[0].style}
        className="flex h-screen w-full items-center justify-center"
      >
        <img
          className="!aspect-square w-full max-w-[800px]"
          src={mainImg}
          alt="main"
        />
      </div>
      {/* <div
        ref={animatedItem[1].ref}
        style={animatedItem[1].style}
        className="flex h-screen"
      >
        <img className="h-screen w-auto" src={mainImg} alt="main" />
      </div>
      <div
        ref={animatedItem[2].ref}
        style={animatedItem[2].style}
        className="flex h-screen"
      >
        <img className="h-screen w-auto" src={mainImg} alt="main" />
      </div>
      <div
        ref={animatedItem[3].ref}
        style={animatedItem[3].style}
        className="flex h-screen"
      >
        <img className="h-screen w-auto" src={mainImg} alt="main" />
      </div> */}
    </div>
  )
}

export default Main
