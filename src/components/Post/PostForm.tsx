import { useState } from "react"
import { Button } from "../../UI/Button"
import { InputDiv } from "../../UI/InputDiv"
import { RoundButton } from "../../UI/RoundButton"
import { colors } from "../../UI/Colors"
import { inputStyle, labelStyle } from "../../UI/Styles"

type PostFormProps = {
  onFormSubmit: (val: enteredValuesType) => boolean
}

export type enteredValuesType = {
  question: string
  answers: Array<string>
}

export const PostForm = ({ onFormSubmit }: PostFormProps) => {
  const [enteredValues, setEnteredValues] = useState({
    question: "",
    answers: ["", ""],
  })
  const [answerArr, setAnswerArr] = useState(["", ""])

  const [createPost, setCreatePost] = useState(false)

  const cancelPostHandler = () => {
    setCreatePost(!createPost)
    setEnteredValues({
      question: "",
      answers: ["", ""],
    })
  }

  const inputChangeHandler = (
    identifier: string,
    value: string,
    ansIndex: number
  ) => {
    if (identifier == "answers") {
      const curAnsArr = enteredValues.answers

      //if ans arrr ald exist and go to its index
      if (curAnsArr?.length > 0 && ansIndex) {
        const curAnsArrUpdated = [...curAnsArr]
        curAnsArrUpdated[ansIndex] = value

        setEnteredValues((preVal) => ({
          ...preVal,
          answers: [...curAnsArrUpdated],
        }))
      } else {
        setEnteredValues((prevVal) => ({
          ...prevVal,
          answers: [value],
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
    const ansArryLength = enteredValues.answers.length
    if (ansArryLength < 2) {
      return false
    }
    for (let i = 0; i < ansArryLength; i++) {
      for (let y = 1; y < ansArryLength; y++) {
        const ansA = enteredValues.answers[i]
        const ansB = enteredValues.answers[y]

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

  const formSubmitHandler = async (event: any) => {
    event.preventDefault()
    console.log("IN THE FORM SUBMIT HANDLER", enteredValues)

    if (checkAnswerArry()) {
      const postSuccess = await onFormSubmit(enteredValues)

      console.log("WAS SUBMIT SUCCESS: ", postSuccess)
      if (!postSuccess) {
        console.log("SHOW POST ERROR")
      } else {
        console.log("CLEAR THE FORM ")
        event?.target.reset()
        cancelPostHandler()
      }
    }
  }
  return (
    <form onSubmit={formSubmitHandler} style={{ padding: "1.5rem" }}>
      <div>
        <div style={labelStyle}>What's your question?</div>
        <input
          style={inputStyle}
          required
          type="text"
          value={enteredValues.question}
          onSelect={() => {
            if (!createPost) {
              setCreatePost(!createPost)
            }
          }}
          onChange={(event) => {
            inputChangeHandler("question", event?.target.value, 121)
          }}
        ></input>
      </div>

      {createPost && (
        <div>
          <div>
            {answerArr.map((answer, index) => {
              const label = "Option " + (index + 1).toString()
              return (
                <>
                  <div style={labelStyle}>{label}</div>
                  <InputDiv
                    style={inputStyle}
                    key={index}
                    index={index}
                    identifier="answers"
                    onChangeFn={inputChangeHandler}
                    type="text"
                  />
                </>
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
            <Button text="Cancel" type="reset" onClickFn={cancelPostHandler} />
            <Button
              text="Create"
              type="submit"
              onClickFn={() => {
                console.log("Submit Button is clciked")
                // formSubmitHandler()
              }}
            />
          </div>
        </div>
      )}
    </form>
  )
}
