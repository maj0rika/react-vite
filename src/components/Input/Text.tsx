import { ChangeEvent } from 'react'
import tw from 'tailwind-styled-components'

export type InputValue = string | number | readonly string[] | undefined
export type InputChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>
export type InputClassName = string
export type Id = string
export type validation = boolean
export type type = 'text' | 'password'
export type placeholder = string

interface InputProps {
  value: InputValue
  onChange: (e: InputChangeEvent) => void
  className?: InputClassName
  id?: Id
  validation?: validation
  type?: type
  placeholder?: placeholder
}

const StyleInput = tw.input`
  border-2
  rounded-md
  p-2
  text-black
`

const InputText = ({
  value,
  onChange,
  className,
  id,
  validation,
  type = 'text',
  placeholder,
}: InputProps) => {
  return (
    <StyleInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={[
        className,
        value ? (validation ? 'border-purple-400' : 'border-red-500') : '',
      ].join(' ')}
      id={id}
    />
  )
}

export default InputText
