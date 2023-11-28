import { useState } from "react"
import { Button } from "../../UI/Button"
import { InputDiv } from "../../UI/InputDiv"
import { RoundButton } from "../../UI/RoundButton"
type PostFormProps = {
  onFormSubmit: (val: enteredValuesType) => void
}

export type enteredValuesType = {
  question: string
  ans: Array<string>
}

export const PostForm = ({ onFormSubmit }: PostFormProps) => {
  const [enteredValues, setEnteredValues] = useState({
    question: "",
    ans: ["", ""],
  })
  const [answerArr, setAnswerArr] = useState(["", ""])

  // const [createPostResult, setCreatePostResult] = useState("")

  const inputChangeHandler = (
    identifier: string,
    value: string,
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

  const checkAnswerArry = () => {
    const ansArryLength = enteredValues.ans.length
    if (ansArryLength < 2) {
      return false
    }
    for (let i = 0; i < ansArryLength; i++) {
      for (let y = 1; y < ansArryLength; y++) {
        const ansA = enteredValues.ans[i]
        const ansB = enteredValues.ans[y]

        if (i == y) {
          break
        }
        if (ansA.toLowerCase() == ansB.toLowerCase()) {
          return false
        }
      }
    }
    return true
  }

  const formSubmitHandler = () => {
    event?.preventDefault()
    if (checkAnswerArry()) {
      onFormSubmit(enteredValues)
    }
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
            text="Create"
            type="submit"
            onClickFn={() => {
              console.log("Submit Button is clciked")
            }}
          />
        </div>
        <div>
          <Button
            text="Cancel"
            type="reset"
            onClickFn={() => {
              console.log("Cancel Button is clciked")
            }}
          />
        </div>
      </form>
    </div>
  )
}
