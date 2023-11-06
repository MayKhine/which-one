type AnswerProps = {
  answer: string
}

export const Answer = ({ answer }: AnswerProps) => {
  // return <div> {answer}</div>
  return (
    <label>
      <input type="radio" name="radio"></input>
      {answer}
    </label>
  )
}
