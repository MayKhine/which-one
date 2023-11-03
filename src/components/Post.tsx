export type PostProps = {
  id: number
  userId: number
  question: string
  answerType?: string
  answers?: Array<string>
  imgDesc?: Array<string>
}

export const Post = ({ question, userId, id }: PostProps) => {
  return (
    <div>
      {id}
      {question} {userId}
    </div>
  )
}
