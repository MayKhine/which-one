import * as stylex from "@stylexjs/stylex"
import deleteImg from "../images/delete.svg"
type PostDeleteButtonProps = {
  text: string
  onClickFn: () => void
}
export const PostDeleteButton = ({
  text,
  onClickFn,
}: PostDeleteButtonProps) => {
  return (
    // <div {...stylex.props(postDeleteButtonStyles.base)} onClick={onClickFn}>
    //   {text}
    // </div>
    <img
      src={deleteImg}
      {...stylex.props(postDeleteButtonStyles.base)}
      onClick={onClickFn}
    ></img>
  )
}

const postDeleteButtonStyles = stylex.create({
  base: {
    position: "absolute",
    // background: "red",
    // top: "0",
    right: "1rem",
    // padding: "3px",
    width: "1rem",
  },
})
