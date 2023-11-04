// import { PostProps } from "./Post"
import { Button } from "../UI/Button"
import { useState } from "react"
import { MenuBar } from "../UI/MenuBar"
import { InputDiv } from "../UI/InputDiv"
import { PostProps } from "./Post"

export const CreatePost = () => {
  const [enteredValues, setEnteredValues] = useState({})
  const [answerArr, setAnswerArr] = useState(["", "", ""])

  const validateUser = async (userName: string) => {
    const user = await fetch(`http://localhost:3300/users/${userName}`, {
      method: "Get",
    })
    const response = await user.json()

    if (response.result?.name == userName) {
      return true
    } else {
      return false
    }
  }

  const inputChangeHandler = (
    identifier: string | number,
    value: string | number,
    ansIndex?: number
  ) => {
    if (identifier == "ans") {
      const curAnsArr = enteredValues.ans

      if (curAnsArr && ansIndex) {
        const curAnsArrUpdated = [...curAnsArr]
        curAnsArrUpdated[ansIndex] = value
        console.log("curAnsArrUpdated: ", curAnsArrUpdated)

        setEnteredValues((preVal) => ({
          ...preVal,

          ans: [...curAnsArrUpdated],
        }))
      } else {
        setEnteredValues((prevVal) => ({
          ...prevVal,
          ans: [value],
        }))
      }
    } else {
      setEnteredValues((preVal) => ({
        ...preVal,
        [identifier]: value,
      }))
    }
  }

  const submitButtonHandler = async () => {
    event?.preventDefault()
    console.log("Submit is clicked: ", enteredValues)
    const validateUserResult = await validateUser(enteredValues.userName)
    console.log("Validate user: ", validateUserResult)

    const newPost = {
      id: Math.random(),
      userName: enteredValues.userName,
      question: enteredValues.question,
      answers: enteredValues.ans,
      answerType: "text",
      imgDesc: [],
    }
    console.log("new post : ", newPost)
  }

  return (
    <div>
      <MenuBar />
      <form onSubmit={submitButtonHandler}>
        <div>
          <label>UserName</label>
          <input
            required
            type="text"
            onChange={(event) => {
              inputChangeHandler("userName", event?.target.value)
            }}
          ></input>
        </div>
        <div>
          <label>Question</label>
          <input
            required
            type="text"
            onChange={(event) => {
              inputChangeHandler("question", event?.target.value)
            }}
          ></input>
        </div>
        {answerArr.map((ans, index) => {
          const label = "answer " + index.toString()
          return (
            <InputDiv
              key={index}
              index={index}
              identifier="ans"
              label={label}
              onChangeFn={inputChangeHandler}
              type="text"
            />
          )
        })}

        <Button
          type="add"
          text="Add more answer option"
          onClickFn={() => {
            setAnswerArr((prevVal) => [...prevVal, ""])
          }}
        />

        <Button type="submit" text="Create" />
        <Button type="reset" text="Cancel" />
      </form>
    </div>
  )
}
