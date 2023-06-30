import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import tw from 'tailwind-styled-components'

const StyledModal = tw.div`
  pointer-events-none
  invisible
  fixed
  top-0
  right-0
  bottom-0
  left-0
  flex
  justify-center
  opacity-0
  z-50
  bg-black/40
  transition-all
  duration-200
  ease-in-out
  transform
  overflow-y-hidden
  overscroll-contain
  items-center
`

const StyledModalContent = tw.div`
  max-h-[calc(100vh-5em)]
  bg-white
  p-6
  transition-all
  duration-200
  ease-in-out
  transform
  border-radius-[1rem]
  box-shadow-[0 25px 50px -12px rgba(0, 0, 0, 0.25)]
  overflow-y-auto
  overscroll-contain
  w-[91.666667%]
`

const Modal = ({
  isOpen,
  children,
  closeModal,
}: {
  isOpen: boolean
  children: React.ReactNode
  closeModal: () => void
}) => {
  const el = useRef(document.createElement('div'))

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root')
    if (!modalRoot) return

    modalRoot.appendChild(el.current)

    return () => {
      modalRoot.removeChild(el.current)
    }
  }, [])

  const renderModal = () => {
    return (
      <StyledModal
        className={isOpen ? 'pointer-events-auto visible opacity-100' : ''}
        onClick={e => {
          if (e.target === e.currentTarget) {
            e.stopPropagation()
            closeModal()
          }
        }}
      >
        <StyledModalContent>{children}</StyledModalContent>
      </StyledModal>
    )
  }

  return isOpen ? ReactDOM.createPortal(renderModal(), el.current) : null
}

export default Modal
