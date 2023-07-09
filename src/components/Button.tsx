// import tw from 'tailwind-styled-components'

const Button = ({
  onClick,
  className,
  children,
}: {
  onClick: () => void
  className?: string
  children: React.ReactNode
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        className,
        ' flex items-center justify-center break-keep rounded bg-white px-4 py-2 font-bold leading-none text-primary hover:bg-purple-900',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export default Button
