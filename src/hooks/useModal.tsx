import { useState } from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const children = (children: React.ReactNode) => {
    return children
  }

  return { isOpen, openModal, closeModal, children }
}
