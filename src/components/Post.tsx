import { Answer } from "./Answer"
export type PostProps = {
  id: number
  userName: number
  question: string
  answerType?: string
  answers?: Array<string>
  imgDesc?: Array<string>
}

export const Post = ({ question, userName, id, answers }: PostProps) => {
  return (
    <div style={{ backgroundColor: "pink" }}>
      <p>
        Question Id: {id} , Post by: {userName}
      </p>
      <p>{question}</p>
      {answers?.map((ans, index) => {
        return (
          <li>
            <Answer key={index} answer={ans} />{" "}
          </li>
        )
      })}
    </div>
  )
}
