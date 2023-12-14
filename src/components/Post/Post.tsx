import { useState } from "react"
import { Navigate } from "react-router-dom"
import img from "../../img/profilePic.png"
import { ProfileImg } from "../../UI/ProfilePic"
import { ImageCard } from "../../UI/ImageCard"
import * as stylex from "@stylexjs/stylex"
import { colors } from "../../styleX/tokens.stylex"
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
  images: Array<string>

  // answerType?: string
  // voting?: Array<string>
  // imgDesc?: Array<string>
}

export const Post = ({
  question,
  postCreater,
  answers,
  images,
  postCreaterInfo,
}: PostProps) => {
  const [navigate, setNavigate] = useState("")
  const postCreaterPic = postCreaterInfo[0].picture || img

  return (
    <div {...stylex.props(postStyles.base)}>
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
      <div {...stylex.props(postStyles.question)}>{question}</div>

      {images.length == 0 && (
        <div>
          {answers.map((ans, index) => {
            return <li key={index}>{ans}</li>
          })}
        </div>
      )}

      {images.length != 0 && (
        <div {...stylex.props(postStyles.imagesDiv)}>
          {images.map((img, index) => {
            const imgSrc = `http://localhost:3300/${img}`
            return (
              <ImageCard
                imgSrc={imgSrc}
                key={index}
                index={index}
                text={answers[index]}
              />
            )
          })}
        </div>
      )}
      <div>
        {navigate && <Navigate to={navigate} replace={true}></Navigate>}
      </div>
    </div>
  )
}

const postStyles = stylex.create({
  base: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // asignItems: "baseline",
    // alignContent: "center",
    // alignSelf: "center",
    backgroundColor: colors.orange,
    margin: "3rem",
  },
  question: { fontSize: "2rem" },

  imagesDiv: {
    display: "flex",
    flexDirection: "row",
    gap: "4rem",
    backgroundColor: colors.red,
  },
})
