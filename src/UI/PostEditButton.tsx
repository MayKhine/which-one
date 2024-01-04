import * as stylex from "@stylexjs/stylex"
import editImg from "../images/edit.svg"

type PostEditButtonProps = {
  onClickFn: () => void
}
export const PostEditButton = ({ onClickFn }: PostEditButtonProps) => {
  return (
    <img
      {...stylex.props(postEditButtonStyles.base)}
      src={editImg}
      onClick={onClickFn}
    ></img>
  )
}

const postEditButtonStyles = stylex.create({
  base: {
    position: "absolute",
    right: "3rem",
    width: "1.1rem",
  },
})
