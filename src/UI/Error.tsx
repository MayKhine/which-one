type ErrorProps = {
  error: string
  text: string
}

export const Error = ({ error, text }: ErrorProps) => {
  return (
    <div>
      {error} {text}
    </div>
  )
}
