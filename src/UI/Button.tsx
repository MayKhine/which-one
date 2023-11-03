type ButtonProps = {
  text: string
  type: string
  onClickFn?: () => void
}

export const Button = ({ text, onClickFn, type }: ButtonProps) => {
  return (
    <button onClick={onClickFn} type={type}>
      {text}
    </button>
  )
}
