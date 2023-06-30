import tw from 'tailwind-styled-components'

type InputValue = string | number | readonly string[] | undefined

interface TextareaProps {
  value: InputValue
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
}

const StyleTextarea = tw.textarea`
  border-2
  rounded-md
  border-primary
  p-2
  text-black

`

const InputTextarea = ({ value, onChange, className }: TextareaProps) => {
  return (
    <StyleTextarea
      value={value}
      onChange={onChange}
      className={[className, 'h-fit resize-none'].join(' ')}
    />
  )
}

export default InputTextarea
