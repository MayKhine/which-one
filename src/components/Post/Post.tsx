import { useState } from "react"
import { Button } from "../../UI/Button"
import { Answer } from "./Answer"
import { useUserApi } from "../../hooks/useUserApi"
export type PostProps = {
  id: number
  userName: number
  question: string
  answerType?: string
  answers?: Array<string>
  imgDesc?: Array<string>
}

export const Post = ({ question, userName, id, answers }: PostProps) => {
  const { user } = useUserApi("user1")
  const votingUserName = user?.name
  const [ans, setAns] = useState<number>()

  const submitVoteHandler = () => {
    console.log("Work on submit vote handler ")

    const votingData = {
      votingUser: votingUserName,
      answerIndex: ans,
    }

    const postID = id

    console.log("post : ", votingData, postID)
    const sendData = async () => {
      const result = await fetch(`http://localhost:3300/posts/${postID}/vote`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(votingData),
      })
      const response = await result.json()
      console.log("RESPONSE: ", response)
      return response
    }

    sendData()
  }

  return (
    <div style={{ backgroundColor: "pink" }}>
      <p>
        Question Id: {id} , Post by: {userName}
      </p>
      <p>{question}</p>
      {answers?.map((ans, index) => {
        return (
          <li>
            <Answer
              key={index}
              index={index}
              answer={ans}
              selectedFn={setAns}
            />
          </li>
        )
      })}
      <Button type="select" onClickFn={submitVoteHandler} text="Submit" />
    </div>
  )
}
