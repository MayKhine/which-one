import { ButtonProps } from "./Button"
import { persimmon } from "./Colors"

export const RoundButton = ({
  text,
  // type,
  onClickFn,
  fontColor,
  bgColor,
}: ButtonProps) => {
  return (
    <button
      style={{
        width: "1.5rem",
        height: "1.5rem",
        borderRadius: "50%",
        backgroundColor: bgColor ? bgColor : persimmon,
        color: fontColor ? fontColor : "white",
        border: "1px solid transparent",
        fontSize: "1rem",
        cursor: "pointer",
      }}
      onClick={onClickFn}
      // type={type}
    >
      {text}
    </button>
  )
}
