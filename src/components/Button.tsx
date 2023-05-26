// import tw from 'tailwind-styled-components'

const Button = ({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) => {
  return (
    <button
      onClick={onClick}
      className="rounded bg-white px-4 py-2 font-bold text-primary hover:bg-purple-900"
    >
      {children}
    </button>
  )
}

export default Button
