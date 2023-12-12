import * as stylex from "@stylexjs/stylex"
import { buttonStyles } from "../styleX/buttonStyles"
export type ButtonProps = {
  text: string
  onClickFn?: () => void
  bgColor?: string
}

export const Button = ({ text, onClickFn, bgColor }: ButtonProps) => {
  return (
    <button
      {...stylex.props(buttonStyles.base)}
      onClick={onClickFn}
      type="submit"
    >
      {text}
    </button>
  )
}
