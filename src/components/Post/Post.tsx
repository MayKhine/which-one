import { useEffect, useState } from "react"
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
}: // postCreaterPic,
PostProps) => {
  const [navigate, setNavigate] = useState("")
  const postCreaterPic = postCreaterInfo[0].picture || img
  // const [imgArr, setImgArr] = useState([])
  const imgArr = []

  const getImgFromBE = async (imgFileName: string) => {
    const result = await fetch(
      `http://localhost:3300/getimage?img=${imgFileName}`
    )
    const response = await result.json()
    // setImgArr((preImg) => [...preImg, response.image])

    return response.image
  }

  useEffect(() => {
    for (let i = 0; i < images.length; i++) {
      console.log("call getimgfrom BD : ", images[i])
      const img = getImgFromBE(images[i])

      imgArr.push(img)
    }
  }, [])

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
        {images.map((img, index) => {
          return (
            <img
              key={index}
              src={`http://localhost:3300/getimage?img=${img}`}
              alt={`Image ${index}`}
            />
          ) //<img key={index} src={img} alt={`Image ${index}`} />
        })}
      </div>
      <div>
        {navigate && <Navigate to={navigate} replace={true}></Navigate>}
      </div>
    </div>
  )
}
