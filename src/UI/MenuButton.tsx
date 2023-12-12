import * as stylex from "@stylexjs/stylex"
import { buttonStyles } from "../styleX/buttonStyles"
type MenuButtonProps = {
  text: string
  onClickFn: () => void
}
export const MenuButton = ({ text, onClickFn }: MenuButtonProps) => {
  return (
    <button
      {...stylex.props(buttonStyles.base, buttonStyles.plain)}
      onClick={onClickFn}
    >
      {text}
    </button>
  )
}
