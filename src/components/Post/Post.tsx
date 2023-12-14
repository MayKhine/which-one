import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import img from "../../img/profilePic.png"
import { ProfileImg } from "../../UI/ProfilePic"
import axios from "axios"

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

  const getImgFromBE = async (imgFileName: string) => {
    const result = await fetch(
      `http://localhost:3300/getimage?img=${imgFileName}`
    )
    const response = await result.json()
    console.log("what responst: ", response)
    // return response.imageBuffer
  }

  // useEffect(() => {
  //   for (let i = 0; i < images.length; i++) {
  //     console.log("call getimgfrom BD : ", images[i])
  //     // const img = getImgFromBE(images[i])
  //     // imgArr.push(img)

  //     axios
  //       .get(`http://localhost:3300/getimage?img=${images[i]}`)
  //       .then((res) => {
  //         setBeimg(res.data.image)
  //         console.log(res.data.image)
  //       })
  //       .catch((err) => console.log(err))
  //   }
  // }, [])

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
          const imgSrc = `http://localhost:3300/${img}`
          return <img key={index} src={imgSrc} alt={`Image ${index}`} /> //<img key={index} src={img} alt={`Image ${index}`} />
        })}
      </div>
      <div>
        {navigate && <Navigate to={navigate} replace={true}></Navigate>}
      </div>
    </div>
  )
}
