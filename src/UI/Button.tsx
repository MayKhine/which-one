type ButtonProps = {
  text: string
  onClickFn: () => void
}

export const Button = ({ text, onClickFn }: ButtonProps) => {
  return <button onClick={onClickFn}> {text}</button>
}
