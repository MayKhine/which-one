import { ProfileImg } from "../../UI/ProfilePic"
export type PostProps = {
  postCreater: string
  postCreaterPic: string
  // postCreaterInfo: any
  question: string
  answerType?: string

  answers?: Array<string>
  voting?: Array<string>
  imgDesc?: Array<string>
}

export const Post = ({
  question,
  postCreater,
  answers,
  postCreaterPic,
}: PostProps) => {
  console.log("What is pic: ", postCreaterPic)
  return (
    <div style={{ backgroundColor: "gray", marginBottom: "10px" }}>
      <div>{question}</div>
      <ProfileImg image={postCreaterPic} size="30px" />
      <div>Post by {postCreater}</div>
      <div>
        {answers.map((ans, index) => {
          return <li key={index}>{ans}</li>
        })}
      </div>
    </div>
  )
}
