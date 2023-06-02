import mainImg from '@/assets/images/main.png'
import { useEffect } from 'react'
import useScrollFadeIn from '../hooks/useScrollFadeIn'

const Main = () => {
  const animatedItem = {
    0: useScrollFadeIn('up', 2),
    1: useScrollFadeIn('down', 2),
    2: useScrollFadeIn('left', 2),
    3: useScrollFadeIn('right', 2),
  }

  useEffect(() => {
    console.log('Main')
  }, [])

  return (
    <div className="w-full  overflow-hidden">
      <img className="h-screen w-full" src={mainImg} alt="main" />
      <div
        ref={animatedItem[0].ref}
        style={animatedItem[0].style}
        className="h-[500px]"
      >
        <img className="h-[500px] w-auto" src={mainImg} alt="main" />
      </div>
      <div
        ref={animatedItem[1].ref}
        style={animatedItem[1].style}
        className="h-[500px]"
      >
        <img className="h-[500px] w-auto" src={mainImg} alt="main" />
      </div>
      <div
        ref={animatedItem[2].ref}
        style={animatedItem[2].style}
        className="h-[500px]"
      >
        <img className="h-[500px] w-auto" src={mainImg} alt="main" />
      </div>
      <div
        ref={animatedItem[3].ref}
        style={animatedItem[3].style}
        className="h-[500px]"
      >
        <img className="h-[500px] w-auto" src={mainImg} alt="main" />
      </div>
    </div>
  )
}

export default Main
