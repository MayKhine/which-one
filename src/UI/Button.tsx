export type ButtonProps = {
  text: string
  onClickFn?: () => void
  bgColor?: string
}

export const Button = ({ text, onClickFn, bgColor }: ButtonProps) => {
  return (
    <button
      style={{
        borderRadius: "0.3rem",
        backgroundColor: bgColor || "white",
        border: "3px solid black",
        fontSize: "1.3rem",
        cursor: "pointer",
        padding: ".5rem",
        margin: "1rem",
        boxShadow:
          " 12px 8px 0 0px white, 14px 6px 0 0px black,14px 10px 0 0px black,10px 10px 0 0px black", //"8px 8px 0px rgba(0, 0, 0, 1)" /* Adjust values as needed */,
      }}
      onClick={onClickFn}
      type="submit"
    >
      {text}
    </button>
  )
}
