import { useState } from "react"
import { Navigate } from "react-router-dom"
import img from "../../img/profilePic.png"
import { ProfileImg } from "../../UI/ProfilePic"

type postCreaterInfoType = {
  _id: string
  name: string
  email: string
  picture: string
}

export type PostProps = {
  key: number
  postCreater: string
  postCreaterInfo: Array<postCreaterInfoType>
  question: string
  answers: Array<string>

  // answerType?: string
  // voting?: Array<string>
  // imgDesc?: Array<string>
}

export const Post = ({
  question,
  postCreater,
  answers,
  postCreaterInfo,
}: // postCreaterPic,
PostProps) => {
  const [navigate, setNavigate] = useState("")
  const postCreaterPic = postCreaterInfo[0].picture || img
  return (
    <div style={{ backgroundColor: "gray", marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ProfileImg image={postCreaterPic} size="30px" />
        <div
          onClick={() => {
            const urlStr = `/users/${postCreater}`
            setNavigate(urlStr)
          }}
          style={{ cursor: "pointer" }}
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
