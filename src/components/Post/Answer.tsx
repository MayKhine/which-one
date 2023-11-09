type AnswerProps = {
  answer: string
  index: number
  selectedFn: (index: number) => void
}

export const Answer = ({ answer, selectedFn, index }: AnswerProps) => {
  return (
    <label>
      <input
        type="radio"
        name="radio"
        onClick={() => {
          selectedFn(index)
        }}
      ></input>
      {answer}
    </label>
  )
}
