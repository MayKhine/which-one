// import { PostProps } from "./Post"
import { Button } from "../UI/Button"
import { useState } from "react"
import { MenuBar } from "../UI/MenuBar"

export const CreatePost = () => {
  const [enteredValues, setEnteredValues] = useState({})
  const inputChangeHandler = (
    identifier: string | number,
    value: string | number
  ) => {
    console.log("Inputchange hangdler is triggered: ", value)

    setEnteredValues((preVal) => ({
      ...preVal,
      [identifier]: value,
    }))
  }

  const submitButtonHandler = () => {
    event?.preventDefault()
    console.log("Submit is clicked: ", enteredValues)
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

        <div>
          <label>Answer 1</label>
          <input
            required
            type="text"
            onChange={(event) => {
              inputChangeHandler(0, event?.target.value)
            }}
          ></input>
        </div>
        <div>
          <label>Answer 2</label>
          <input
            required
            type="text"
            onChange={(event) => {
              inputChangeHandler(1, event?.target.value)
            }}
          ></input>
        </div>
        <div>
          <label>Answer 3</label>
          <input
            required
            type="text"
            onChange={(event) => {
              inputChangeHandler(2, event?.target.value)
            }}
          ></input>
        </div>

        <Button type="submit" text="Create" />
        <Button type="reset" text="Cancel" />
      </form>
    </div>
  )
}
