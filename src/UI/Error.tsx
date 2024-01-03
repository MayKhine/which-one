import * as stylex from "@stylexjs/stylex"

type ErrorProps = {
  error: string
  text?: string
}

export const Error = ({ error, text }: ErrorProps) => {
  return (
    <div {...stylex.props(errorStyles.base)}>
      {error} {text}
    </div>
  )
}

const errorStyles = stylex.create({
  base: {
    backgroundCOlor: "red",
    color: "white",
    marginTop: "1rem",
    padding: ".5rem",
    borderRadius: "10px",
  },
})
