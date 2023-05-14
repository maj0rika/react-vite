import { InputValue, InputChangeEvent } from './Text'
import tw from 'tailwind-styled-components'

interface TextareaProps {
  value: InputValue
  onChange: (e: InputChangeEvent) => void
}

const StyleTextarea = tw.textarea`
  border-2
  rounded-md
  border-primary
  p-2
`

const Textarea = ({ value, onChange }: TextareaProps) => {
  return <StyleTextarea className="w-full" value={value} onChange={onChange} />
}

export default Textarea
