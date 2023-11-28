import { persimmon, ocean } from "./Colors"

export type ButtonProps = {
  text: string
  type?: string
  onClickFn?: () => void
  bgColor?: string
  fontColor?: string
}

export const Button = ({
  text,
  type,
  onClickFn,
  fontColor,
  bgColor,
}: ButtonProps) => {
  return (
    <button
      style={{
        borderRadius: "0.25rem",
        backgroundColor: bgColor ? bgColor : persimmon,
        color: fontColor ? fontColor : "white",
        border: "1px solid transparent",
        fontSize: "1rem",
        cursor: "pointer",
        padding: ".3rem",
        marginLeft: "0.3rem",
        marginRight: "0.3rem",
      }}
      onClick={onClickFn}
      type={type}
    >
      {text}
    </button>
  )
}
