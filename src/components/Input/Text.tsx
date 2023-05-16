import { ChangeEvent } from 'react'
import tw from 'tailwind-styled-components'

export type InputValue = string | number | readonly string[] | undefined
export type InputChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>
export type InputClassName = string
export type Id = string
export type validation = boolean

interface InputProps {
  value: InputValue
  onChange: (e: InputChangeEvent) => void
  className?: InputClassName
  id?: Id
  validation?: validation
}

const StyleInput = tw.input`
  border-2
  rounded-md
  border-primary
  p-2

  ${(props: InputProps) =>
    props.value ? (props.validation ? '' : 'border-red-500') : ''}
`

const InputText = ({
  value,
  onChange,
  className,
  id,
  validation,
}: InputProps) => {
  return (
    <StyleInput
      type="text"
      value={value}
      onChange={onChange}
      className={className}
      id={id}
    />
  )
}

export default InputText
