import { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'

type InputValue = string | number | readonly string[] | undefined
type InputType = 'text' | 'password'
type ValidationType = boolean

interface InputProps {
  value: InputValue
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  id?: string
  validation?: ValidationType
  type?: InputType
  placeholder?: string
  autocomplete?: string
}

const StyledInput = tw.input`
  border-2
  rounded-md
  p-2
  text-black
`

const InputText: React.FC<InputProps> = ({
  onChange,
  className,
  id,
  validation = true,
  type = 'text',
  placeholder,
  autocomplete,
}) => {
  const [localValue, setLocalValue] = useState<string>('')

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onChange({
        target: { value: localValue },
      } as React.ChangeEvent<HTMLInputElement>)
    }, 500)

    return () => {
      clearTimeout(debounceTimeout)
    }
  }, [localValue, onChange])

  return (
    <StyledInput
      type={type}
      value={localValue}
      onChange={e => setLocalValue(e.target.value)}
      placeholder={placeholder}
      className={[
        className,
        localValue ? (validation ? 'border-purple-400' : 'border-red-500') : '',
      ].join(' ')}
      id={id}
      autoComplete={autocomplete}
    />
  )
}

export default InputText
