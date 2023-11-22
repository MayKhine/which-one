import { useState } from "react"
import { Button } from "../../UI/Button"
import { InputDiv } from "../../UI/InputDiv"
import { RoundButton } from "../../UI/RoundButton"
type PostFormProps = {
  formSubmitHandler: () => void
}

export const PostForm = () => {
  const [enteredValues, setEnteredValues] = useState({})
  const [answerArr, setAnswerArr] = useState(["", ""])

  // const [createPostResult, setCreatePostResult] = useState("")

  const inputChangeHandler = (
    identifier: string | number,
    value: string | number,
    ansIndex?: number
  ) => {
    // setCreatePostResult("")

    if (identifier == "ans") {
      const curAnsArr = enteredValues.ans

      //if ans arrr ald exist and go to its index
      if (curAnsArr?.length > 0 && ansIndex) {
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

  const formSubmitHandler = () => {
    event?.preventDefault()

    console.log("Form Submit Handler is clicked: ", enteredValues)
  }
  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div>
          <InputDiv
            key={"question"}
            index={342}
            identifier="question"
            label={"Questions"}
            onChangeFn={inputChangeHandler}
            type="text"
          />
        </div>
        <div style={{ backgroundColor: "green" }}>
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
          <RoundButton
            type="add"
            text="+"
            onClickFn={() => {
              setAnswerArr((prevVal) => [...prevVal, ""])
            }}
          />
        </div>
        <div>
          <Button
            type="reset"
            text="Reset"
            onClickFn={() => {
              setAnswerArr(["", ""])
            }}
          />
          <Button
            type="submit"
            text="Create"
            onClickFn={() => {
              console.log("Submit Button is clciked")
            }}
          />
        </div>
        <div>
          <Button
            type="reset"
            text="Cancel"
            onClickFn={() => {
              console.log("Cancel Button is clciked")
            }}
          />
        </div>
      </form>
    </div>
  )
}
