import mainImg from '@/assets/images/main.png'
import { useEffect } from 'react'
import useScrollFadeIn from '../hooks/useScrollFadeIn'
import Modal from './Modal'
import { useModal } from '@/hooks/useModal'

const Main = () => {
  const animatedItem = {
    0: useScrollFadeIn('up', 2),
    1: useScrollFadeIn('down', 2),
    2: useScrollFadeIn('left', 2),
    3: useScrollFadeIn('right', 2),
  }

  const { isOpen, openModal, closeModal } = useModal()

  return (
    <div className="flex w-full flex-col justify-center gap-5  overflow-hidden">
      <div>
        <button onClick={openModal}>모달 열기</button>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <h2>포탈 기능을 이용한 모달</h2>
          <button onClick={closeModal}>모달 닫기</button>
        </Modal>
      </div>
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
