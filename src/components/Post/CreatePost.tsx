import { Button } from "../../UI/Button"
import { useState } from "react"
import { InputDiv } from "../../UI/InputDiv"
import { DateTime } from "luxon"

export const CreatePost = () => {
  const [enteredValues, setEnteredValues] = useState({})
  const [answerArr, setAnswerArr] = useState(["", ""])
  const [createPostResult, setCreatePostResult] = useState("")

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

  const validateText = (text: string) => {
    return text?.trim().length == 0 ? false : true
  }

  const inputChangeHandler = (
    identifier: string | number,
    value: string | number,
    ansIndex: number
  ) => {
    setCreatePostResult("")

    if (identifier == "ans") {
      const curAnsArr = enteredValues.ans

      //if ans arrr ald exist and go to its index
      if (curAnsArr?.length > 0) {
        const curAnsArrUpdated = [...curAnsArr]
        curAnsArrUpdated[ansIndex] = value

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

  const submitButtonHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault()
    console.log("Submit is clicked: ", enteredValues)

    if (!validateText(enteredValues.userName)) {
      setCreatePostResult("Error: username cannot be empty.")
      return
    }

    const validateUserResult = await validateUser(enteredValues.userName)
    if (!validateUserResult) {
      setCreatePostResult("Error: username does not exists.")
      return
    }

    if (!validateText(enteredValues.question)) {
      setCreatePostResult("Error: question cannot be empty.")
      return
    }

    const answerArr = enteredValues?.ans
    if (!answerArr) {
      setCreatePostResult("Error: answer cannot be empty.")
      return
    }
    for (let i = 0; i <= answerArr.length; i++) {
      if (!validateText(answerArr[i])) {
        setCreatePostResult("Error: answer cannot be empty.")
        return
      }
    }

    if (answerArr.length <= 1) {
      setCreatePostResult("Error: answer options have to be more than one.")
      return
    }

    const ansOptionLength = enteredValues.ans.length
    const votingArr = new Array(ansOptionLength).fill([])

    const newPost = {
      id: Math.random().toString(),
      userName: enteredValues.userName,
      question: enteredValues.question.trim(),
      answers: enteredValues.ans,
      answerType: "text",
      imgDesc: [],
      voting: votingArr,
      createTime: DateTime.now(),
    }

    const result = await fetch("http://localhost:3300/createpost", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })

    const response = await result.json()

    console.log("RESPONE: ", response.success)
    if (response.success) {
      setCreatePostResult("Question is posted!")
      event?.target.reset()
    } else {
      setCreatePostResult("Had an error posting the question!")
    }
  }

  return (
    <div>
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

        <div>
          <Button
            type="reset"
            text="Clear"
            onClickFn={() => {
              setAnswerArr(["", ""])
            }}
          />
          <Button type="submit" text="Create" />
        </div>
      </form>
      {createPostResult}
    </div>
  )
}
