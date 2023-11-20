export type PostProps = {
  postCreater: string
  question: string
  answerType?: string
  answers?: Array<string>
  imgDesc?: Array<string>
}

export const Post = ({ question, postCreater, answers }: PostProps) => {
  return (
    <div style={{ backgroundColor: "gray", marginBottom: "10px" }}>
      <div>{question}</div>
      <div>Post by {postCreater}</div>
      <div>
        {answers.map((ans, index) => {
          return <li key={index}>{ans}</li>
        })}
      </div>
    </div>
  )
}
