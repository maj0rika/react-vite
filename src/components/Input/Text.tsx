import { ChangeEvent } from 'react'
import tw from 'tailwind-styled-components'

export type InputValue = string | number | readonly string[] | undefined
export type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface InputProps {
  value: InputValue
  onChange: (e: InputChangeEvent) => void
}

const StyleInput = tw.input`
  border-2
  rounded-md
  border-primary
  p-2
`

const Text = ({ value, onChange }: InputProps) => {
  return <StyleInput type="text" value={value} onChange={onChange} />
}

export default Text
