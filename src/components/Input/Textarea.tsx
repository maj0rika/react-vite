import { InputValue, InputChangeEvent } from './Text'
import tw from 'tailwind-styled-components'

interface TextareaProps {
  value: InputValue
  onChange: (e: InputChangeEvent) => void
  className?: string
}

const StyleTextarea = tw.textarea`
  border-2
  rounded-md
  border-primary
  p-2
`

const InputTextarea = ({ value, onChange, className }: TextareaProps) => {
  return (
    <StyleTextarea value={value} onChange={onChange} className={className} />
  )
}

export default InputTextarea
