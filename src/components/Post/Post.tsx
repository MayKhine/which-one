import { useState } from "react"
import { Navigate } from "react-router-dom"

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
  const [navigate, setNavigate] = useState("")

  return (
    <div style={{ backgroundColor: "gray", marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ProfileImg image={postCreaterPic} size="30px" />
        <div
          onClick={() => {
            const urlStr = `/users/${postCreater}`
            setNavigate(urlStr)
          }}
        >
          {postCreater}
        </div>
      </div>
      <div>{question}</div>

      <div>
        {answers.map((ans, index) => {
          return <li key={index}>{ans}</li>
        })}
      </div>
      <div>
        {navigate && <Navigate to={navigate} replace={true}></Navigate>}
      </div>
    </div>
  )
}
